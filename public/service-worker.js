self.addEventListener('push', function(event) {
    const options = {
      body: event.data.text(),
      icon: 'icons/icon-192x192.png',
      badge: 'icons/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '1'
      },
      actions: [
        {
          action: 'explore',
          title: 'View Details',
        }
      ]
    };
  
    event.waitUntil(
      self.registration.showNotification('New Notification', options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    if (event.action === 'explore') {
      clients.openWindow('/details');
    } else {
      clients.openWindow('/');
    }
  });