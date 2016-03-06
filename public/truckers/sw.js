importScripts('https://cdn.firebase.com/js/client/2.4.0/firebase.js');
rootRef = new Firebase('https://instavans.firebaseio.com/');

function updateLocation() {
	navigator.geolocation.getCurrentPosition(function (pos) {
		rootRef.child('trucker/' + rootRef.getAuth().uid).update({
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		});
		console.log(pos);
	})
	setTimeout(updateLocation, 5000);
}

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

updateLocation();
