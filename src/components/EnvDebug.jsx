export function EnvDebug() {
    return (
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <h2 className="text-lg font-bold mb-2">Environment Variables:</h2>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(
            {
              API_URL: import.meta.env.VITE_API_URL,
              NODE_ENV: import.meta.env.MODE,
              // Don't expose sensitive values in production
              ...(import.meta.env.DEV && {
                VAPID_KEY: import.meta.env.VITE_PUBLIC_VAPID_KEY,
              }),
            },
            null,
            2
          )}
        </pre>
      </div>
    );
  }