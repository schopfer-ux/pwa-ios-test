import { usePushNotification } from '../hooks/usePushNotification';

export function NotificationButton() {
  const { subscription, error, loading, subscribe } = usePushNotification();

  return (
    <div className="mb-4">
      <button 
        onClick={subscribe} 
        disabled={loading || subscription}
        className={`px-4 py-2 rounded ${
          subscription 
            ? 'bg-green-500 text-white' 
            : loading 
              ? 'bg-gray-300' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {loading ? 'Subscribing...' : 
         subscription ? 'Notifications Enabled' : 
         'Enable Push Notifications'}
      </button>
      {error && (
        <p className="text-red-500 mt-2">
          Error: {error.message}
        </p>
      )}
    </div>
  );
}