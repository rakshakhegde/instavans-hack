rootRef = new Firebase('https://instavans.firebaseio.com/');
rootRef.onAuth(refresh);

if (("Notification" in window) &&
	(Notification.permission === 'denied' || Notification.permission === "default")) {
	Notification.requestPermission(function (permission) {
		// If the user accepts, let's create a notification
		if (permission === "granted") {
			new Notification('Off to a great start!');
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

$('#btn-ok').click(function () {
	$.get(
		'https://www.kookoo.in/outbound/outbound_sms.php?phone_no=9738144734&message=Please+reach+Titan+Watches+Warehouse%2C+Hosur+by+6am&api_key=KK268a2e81e84db444386421ac2d771fd8',
		function (html) {
			showError('Successfully done!');
		}
	);
});

function saveData(authData) {
	var uid = rootRef.getAuth().uid;
	var tp = authData.twitter; // Twitter Profile - tp
	rootRef.child('porters/' + uid).set({
		displayName: tp.displayName,
		accessToken: tp.accessToken,
		accessTokenSecret: tp.accessTokenSecret,
		profileImageURL: tp.profileImageURL,
		username: tp.username
	});
}

function populateData(authData) {
	var uid = rootRef.getAuth().uid;
	rootRef.child('historyPorters/' + uid).once('value', function (data) {
		$('#tab-history').empty();
		$.each(data.val(), function (i, v) {
			$('#tab-history').append(makeUrlInput(i, v));
		});
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
		//populateData(authData);
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

function makeUrlInput(pos, srcData) {
	var porterNames = srcData.porter_name.join('<br/>');
	return '<div class="section card-panel grey lighten-5">\
					<span id="shippers_name-' + pos + '" class="col s12"><b>Shipper\'s Name</b>: ' + srcData.shippers_name + '</span>\
					<span id="shipid-' + pos + '" class="col s12"><b>Shipping ID</b>: ' + srcData.shipid + '</span>\
					<span id="consignment_details-' + pos + '" class="col s12"><b>Consignment Details</b>: ' + srcData.consignment_details + '</span><hr/>\
					<span id="from_address-' + pos + '" class="col s12"><b>From Address</b>: ' + srcData.from_address + '</span>\
					<span id="pickup_time-' + pos + '" class="col s12"><b>Pickup Time</b>: ' + srcData.pickup_time + '</span><hr/>\
					<span id="to_address-' + pos + '" class="col s12"><b>To Address</b>: ' + srcData.to_address + '</span>\
					<span id="drop_time-' + pos + '" class="col s12"><b>Drop Time</b>: ' + srcData.drop_time + '</span><hr/>\
					<span id="porter_name-' + pos + '" class="col s12"><b>Porter Address</b>:<br/>' + porterNames + '</span><hr/>\
				</div>';
}

/*rootRef.child('active').on('value', function (data) {
	console.log(data.val());
	if (data.val()) {
		var notif = new Notification("New Job", {
			body: "Check it out!",
			tag: 'tag-porter'
		});
		notif.onclick(function() {
			window.open('https://www.mozilla.org', '_blank');
			console.log('Notification got clicked!');
		});
	}
});
*/
