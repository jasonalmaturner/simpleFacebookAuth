var express = require('express'),
  app = express(),
  session = require('express-session'),
  passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  port = 9011,
  bodyParser = require('body-parser'),
  cors = require('cors');

passport.use(new FacebookStrategy({
  clientID: '1470927166552964',
  clientSecret: '545845f640a206329e1aff3dac9053fa',
  callbackURL: 'http://localhost:9011/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done){
  // console.log(profile);
  return done(null, profile);
}));

app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'quando omni flunkus moritati',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
  console.log(111111, user);
  done(null, user);
})

passport.deserializeUser(function(obj, done){
  console.log(2222222, obj);
  done(null, obj);
})

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/api/me',
  failureRedirect: '/api/login'
}))

app.get('/api/me', function(req, res){
  console.log(3333333, req.user);
  res.json(req.user);
});

// app.get('api/session', function(req, res){
//   req.session({test: 'this is a test'})
//   res.send('check the session');
// })

app.listen(port, function(){
  console.log('listening on port:', port);
});
