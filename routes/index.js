var express = require('express');
var router  = express.Router();
var passport = require('passport');
var User = require('../models/user');

//root route
router.get('/', function(req, res){
	res.render('index');
});

// show register form
router.get('/index:register', function(req, res){
	res.render('index:register'); 
});

//handle sign up logic
router.post('/index:register', function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash('error', err.message);
			return res.render('/index:register');
		}
		passport.authenticate('local')(req, res, function(){
			req.flash('success', 'Welcome' + user.username);
			res.redirect('/locations'); 
		});
	});
});

//show login form
router.get('/index:login', function(req, res){
	res.render('/index:login'); 
});

//handling login logic
router.post('/index:login', passport.authenticate('local', 
	{
		successRedirect: '/dashboard',
		failureRedirect: '/index:login'
	}), function(){
});

// logout route
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'Logged you out!');
	res.redirect('/locations');
});



module.exports = router;