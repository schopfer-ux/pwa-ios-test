import { useState } from 'react';
import { registerSW, subscribeToPushNotifications } from '../services/pushNotification';

export function usePushNotification() {
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function subscribe() {
    try {
      setLoading(true);
      const swRegistration = await registerSW();
      const sub = await subscribeToPushNotifications(swRegistration);
      setSubscription(sub);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { subscription, error, loading, subscribe };
}