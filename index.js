/*
 * Quick and Dirty Subscription-based Bot to notify
 * Final Fantasy Randomizer runners on SpeedRunsLive
 */


var Discord = require('discord.io');
var auth = require('./auth.json');

var subs = require('./subscriptions');

// Initialize Discord Bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});
bot.on('ready', function (evt) {
	console.log('Connected');
	console.log('Logged in as: ');
	console.log(bot.username + ' - (' + bot.id + ')');

	bot.sendMessage({
		to: '398576343295459341',
		message: 'Never fear! FFR-RaceBot is here!'
	});
});
bot.on('message', function (user, userID, channelID, message, evt) {
	if (message.substring(0, 1) != '!') return;

	var args = message.substring(1).split(' ');
	var cmd = args[0];

	args = args.splice(1);
	switch(cmd) {
	case 'sub':
	case 'subscribe':
		AddSubscription(user, userID, args);
		break;
	case 'unsub':
	case 'unsubscribe':
		RemoveSubscription(user, userID, args);
		break;
	}
}
});
