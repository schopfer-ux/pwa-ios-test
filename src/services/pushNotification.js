import { CONFIG } from '../utils/config';

export async function registerSW() {
  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    console.log('Service Worker registered:', registration);
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    throw new Error('Failed to register service worker: ' + error.message);
  }
}

export async function subscribeToPushNotifications(swRegistration) {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Notification permission denied');
    }

    const subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: CONFIG.PUBLIC_VAPID_KEY
    });

    // Store subscription in backend
    const response = await fetch(`${CONFIG.API_URL}/api/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });

    if (!response.ok) {
      throw new Error('Failed to store subscription on server');
    }

    const data = await response.json();
    console.log('Subscription stored:', data);

    return subscription;
  } catch (error) {
    console.error('Error in subscribeToPushNotifications:', error);
    throw new Error(error.message || 'Failed to subscribe to push notifications');
  }
}