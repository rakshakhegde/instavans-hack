importScripts('https://cdn.firebase.com/js/client/2.4.0/firebase.js');
rootRef = new Firebase('https://instavans.firebaseio.com/');

console.log('In porters sw.js');

self.addEventListener('notificationclick', function (event) {
	console.log('Notification click: tag ', event.notification.tag);
	event.notification.close();
	var url = 'https://instavans.firebaseapp.com/porters';
	event.waitUntil(
		clients.matchAll({
			type: 'window'
		}).then(function (windowClients) {
			for (var i = 0; i < windowClients.length; i++) {
				var client = windowClients[i];
				if (client.url === url && 'focus' in client) {
					return client.focus();
				}
			}
			if (clients.openWindow) {
				return clients.openWindow(url);
			}
		})
	);
});


rootRef.child('active').on('value', function (data) {
	console.log(data.val());
	if (data.val()) {
		self.registration.showNotification("New Job", {
			body: "Check it out!",
			tag: 'tag-porter'
		});
	}
});
