importScripts('https://cdn.firebase.com/js/client/2.4.0/firebase.js');

self.addEventListener('notificationclick', function (event) {
	console.log('Notification click: tag ', event.notification.tag);
	event.notification.close();
	var url = 'https://instavans.firebaseapp.com';
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

rootRef = new Firebase('https://instavans.firebaseio.com/');
rootRef.child('porters/username1/0').on('value', function (data) {
	self.registration.showNotification("Porter name", {
		body: data.val(),
		icon: 'static/images/twitter_mini_logo.png',
		tag: 'tag-trucker'
	});
});
