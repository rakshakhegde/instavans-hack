if ('serviceWorker' in navigator) {
	showError('Service Worker is supported');
	navigator.serviceWorker.register('sw.js').then(function (reg) {
		showError(':^)' + reg);
		// TODO
	}).catch(function (err) {
		console.log(':^(', err);
	});
}

rootRef = new Firebase('https://instavans.firebaseio.com/');
rootRef.onAuth(refresh);

function setFields() {
	var uid = rootRef.getAuth().uid;
	rootRef.child('user/' + uid).once('value', function (data) {
		$('#logged-in-section').show();
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
	if (authData) {
		$('#logged-in-section').show();
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
