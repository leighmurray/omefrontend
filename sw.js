self.addEventListener('push', function(e) {
  var title;
  var streamer = "";

  if (e.data) {
    streamer = e.data.text();
    title = streamer + " is live now!";
  } else {
    title = 'Push message no payload';
  }

  var options = {
    //body: body,
    //icon: 'images/notification-flat.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      streamer: streamer
    },
    actions: [
      {action: 'watch', title: 'Watch',
        icon: 'images/checkmark.png'},
      {action: 'close', title: 'Boring!',
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var action = e.action;

  if (action === 'watch') {
    clients.openWindow('https://hah.gay/' + notification.data.streamer);
  }
  notification.close();

});
