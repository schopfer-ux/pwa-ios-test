export const CONFIG = {
    APP_NAME: 'My PWA App',
    PUBLIC_VAPID_KEY: import.meta.env.VITE_PUBLIC_VAPID_KEY || 'YOUR_VAPID_KEY',
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    AWS_CONFIG: {
      region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolWebClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    }
  };