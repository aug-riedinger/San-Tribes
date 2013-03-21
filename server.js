var express = require('express');
// var MemcachedStore = require('connect-memcached')(express);

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

app.configure(function() {
	app.use(express.logger({
		format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms'
	}));
	app.use(express.errorHandler({
		dumpExceptions: true
	}));
	app.set('view options', {
		pretty: true
	});

	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({
		secret: 'test genial'
		// store: new MemcachedStore
		// store: new mongoStore({
		// 	url: 'mongodb://localhost/san-tribes',
		// 	collection: 'sessions'
		// })
	}));

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express["static"](__dirname + '/app'));
});

passport.use(new FacebookStrategy({
	clientID: 142275899274139,
	clientSecret: 'e4f9b928893c26b6f0876b696f99b1f0',
	display: 'popup',
	callbackURL: '/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
	console.log(profile);
	// User.findOrCreate({
	// 	facebookId: profile.id
	// }, function(err, user) {
	// 	return done(err, user);
	// });
	// function(err, user) {
	// 	return done(err, user);
	// }
	done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
passport.authenticate('facebook', {
	successRedirect: '/auth/facebook/callback/success',
	failureRedirect: '/auth/facebook/callback/failure'
}));

app.get('/auth/facebook/callback/:status', function(req, res) {
	var status = req.params.status;

	res.writeHead(200, {
		'Content-Type': 'text/html'
	});

	res.write('</html><body><h1>' + status + '</h1>');
	res.write('<script>(function(){if (opener && "" != opener.location) {');
	// if (status === 'success') {
	// 	res.write('opener.angular.element(\'body\').scope().name=\'Augustin Riedinger\';');
	// } else {
	// 	res.write('opener.angular.element(\'body\').scope().name=\'\';');
	// }
	res.write(' opener.angular.element(\'body\').scope().loginPopUpClosed(); window.close(); } })();</script>');
	res.end('</body></html>');
});

passport.serializeUser(function(user, done) {
	console.log('serializing ...');
	console.log(user);
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	console.log(user);
	done(null, user);
});

app.get('/api/me', ensureAuthenticatedJSON, function(req, res) {
	res.json(req.user);
});

app.get('/calendar', function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/calendar'
	});
	res.write('BEGIN');
	res.end();
});

app.get('/json/:file', ensureAuthenticatedJSON, function(req, res) {
	console.log('serializing ?');
	res.sendfile(__dirname + '/json/' + req.params.file);
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/auth/facebook/callback/logout');
});

// app.get('/channel', function(req, res) {
// 	res.writeHead(200, {
// 		'Content-Type': 'text/html'
// 	});
// 	res.end('<script src="//connect.facebook.net/en_US/all.js"></script>');
// });

app.listen(9000, function() {
	console.log('Listening on port 9000');
});

function ensureAuthenticatedJSON(req, res, next) {
	if (req.isAuthenticated()) {
		console.log('Authenticated');
		return next();
	} else {
		console.log('Not authenticated');
		res.json({});
	}
}