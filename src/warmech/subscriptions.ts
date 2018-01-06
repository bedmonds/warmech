import Datastore = require('nedb');
const root = require('app-root-path');

import { IStream, IRepo } from './warmech';


type MaybeSub = Subscription | null;

export interface ISubscriber {
	name?: string;
	id: string;
}

export class Subscription {
	constructor(
		public subscriber: ISubscriber, 
		public created_at: Date, 
		public last_modified_at: Date | null
	) {}
}


const $db = new Datastore({
	filename: `${root}/db/subscriptions.db`, 
	autoload: true 
});


export function register(member: ISubscriber, os: IStream, repo?: IRepo) {
	let db = repo || $db;

	db.findOne({ 'user.id': member.id }, (err: Error, doc?: Subscription) => {
		if (doc) {
			console.log(doc);
			os.reply("I am not messaging you twice every race, mate.");
			return;
		}

		let sub = new Subscription(
			{ name: member.name, id: member.id },
			new Date(),
			null 
		);

		db.insert(sub, onRegistration.bind(os));
	})
}


export function withdraw(member: ISubscriber, os: IStream, repo?: IRepo) {
	let db = repo || $db;

	let q = { 'user.id': member.id };

	db.findOne(q, (err: Error, doc: MaybeSub) => {
		if (!doc) {
			os.reply("You don't have an active subscription, bozo.");
			return;
		}

		db.remove(q, onWithdrawl.bind(os));
	});
}


function onRegistration(this: IStream, err: Error, sub: MaybeSub) {
	console.log(this);
	if (err) {
		console.log(err);
		this.reply(`Something broke while trying to add you to \
The List. My master has been notified, and will figure out what happened \
Soon(TM).`);
		return;
	}

	this.reply("You've been added to The List, good sir or madam!");
}


function onWithdrawl(this: IStream, err: Error, sub: MaybeSub) {
	console.log(this);
	if (err) {
		console.log(err);
		this.reply(`Something broke while I was trying to break \
up with you. My master has been notified, and will figure out what \
happened Soon(TM).`);
	}

	this.reply("It's not you, it's me... I won't be calling you again.");
}
