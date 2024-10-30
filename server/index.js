// server/index.js
const express = require('express');
const webPush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');

const app = express();

// VAPID keys should be generated only once
const vapidKeys = {
  publicKey: process.env.PUBLIC_VAPID_KEY,
  privateKey: process.env.PRIVATE_VAPID_KEY
};

webPush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));


// Store subscriptions (in a real app, use a database)
const subscriptions = new Set();

// Handle API routes
app.use('/api', apiRouter);

// Always serve index.html for any unknown routes (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


// Routes
app.post('/api/subscriptions', (req, res) => {
  const subscription = req.body;
  console.log('Received subscription:', subscription);
  
  subscriptions.add(subscription);
  res.status(201).json({ message: 'Subscription added successfully' });
});

// Test endpoint to send push notification
app.post('/api/send-notification', async (req, res) => {
  const { title, body } = req.body;
  const payload = JSON.stringify({ title, body });
  
  try {
    const notifications = Array.from(subscriptions).map(subscription => 
      webPush.sendNotification(subscription, payload)
    );
    
    await Promise.all(notifications);
    res.status(200).json({ message: 'Notifications sent successfully' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ error: 'Failed to send notifications' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});