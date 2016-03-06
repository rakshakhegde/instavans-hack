rootRef = new Firebase('https://instavans.firebaseio.com/');
rootRef.onAuth(refresh);

if (("Notification" in window) &&
	(Notification.permission === 'denied' || Notification.permission === "default")) {
	Notification.requestPermission(function (permission) {
		// If the user accepts, let's create a notification
		if (permission === "granted") {
			self.registration.showNotification('Off to a great start!');
		}
	});
}

if ('serviceWorker' in navigator) {
	console.log('Service Worker is supported');
	navigator.serviceWorker.register('sw.js').then(function (reg) {
		console.log(':^)', reg);
		// TODO
	}).catch(function (err) {
		console.log(':^(', err);
	});
}

function saveData(authData) {
	var uid = rootRef.getAuth().uid;
	var tp = authData.twitter; // Twitter Profile - tp
	rootRef.child('trucker/' + uid).set({
		displayName: tp.displayName,
		accessToken: tp.accessToken,
		accessTokenSecret: tp.accessTokenSecret,
		profileImageURL: tp.profileImageURL,
		username: tp.username
	});
}

$('#login').click(function (event) {
	rootRef.authWithOAuthPopup('twitter');
});

$('#logout').click(function (event) {
	rootRef.unauth();
});

function refresh(authData) {
	$('.row, #error-text').hide();
	console.log('Auth data:', authData);
	if (authData) {
		$('#logged-in-section').show();
		saveData(authData);
	} else {
		$('#login-section').show();
	}
}

function invalidTokens() {
	showError('Invalid tokens provided in URL!');
}

function showError(errorMsg) {
	$('#error-text').show();
	$('#error-text').append('</br>' + errorMsg);
}

function makeUrlInput(pos, txt) {
	return '<div class="input-field col s12 m10 offset-m1 l8 offset-l2">\
		<input id="input-' + pos + '" type="text" class="url-input" oninput="changed(' + pos + ')" value="' + txt + '"/>\
		<label for="input-' + pos + '">Amazon Product URL</label>\
		</div>';
}
