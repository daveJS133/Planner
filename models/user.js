var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	image: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	visits: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Visit'
		}
	],

	friends: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);