import { useState } from 'react';
import { CONFIG } from '../utils/config';

export function TestNotification() {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const sendNotification = async () => {
    try {
      setSending(true);
      setError(null);
      
      const response = await fetch(`${CONFIG.API_URL}/api/send-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test Notification',
          body: message || 'This is a test notification',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }

      setMessage('');
      alert('Notification sent successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter notification message"
        className="px-4 py-2 border rounded mr-2"
      />
      <button
        onClick={sendNotification}
        disabled={sending}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {sending ? 'Sending...' : 'Send Test Notification'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}