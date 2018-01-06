import { execFile } from 'child_process';
import * as root from 'app-root-path';

import Datastore = require('nedb');

import { IRepo } from './common';


type RaceState = 'open' | 'in_progress' | 'complete' | 'unknown';

class Race {
	constructor(
		public game: string, 
		public room: string, 
		public state: RaceState, 
		public goal: string,
		public discovered_at: Date
	) {}
}


const $db = new Datastore({
	filename: `${root}/db/races.db`,
	autoload: true
});


// Update race history by retrieving current races
// from the SRL API and removing stale races.
//
// This whole chain is criminally inefficient, but
// we're not dealing with large datasets and it's my
// fucking hardware running it.
export function refresh(db: IRepo) {
	db = db || $db;

	removeOldRaces(db);
	list(function(err, races) {
		if (err || races == undefined) throw err;

		for(let i of races) createOrUpdate(db, i);
	});
}


function createOrUpdate(db: IRepo, race: Race) {
	db.find({ 'room': race.room }, function(err, doc) {
		throw new Error('NYI');
	});
};


// Remove any stored race data older than 24 hours.
//
// If a Speed Run takes more than 24 hours, there's something wrong.
function removeOldRaces(db: IRepo) {
	let q = { 'discovered_at': {
		$lt: (new Date(Date.now() - 24 * 3600 * 1000))
	}};

	db.remove(q, function(err, data) {
		if (err) throw err;	
	});
}


// Parse the output of `bin/fetch-races` into an array of `Race`s.
//
// See that program for formatting.
function parse(data: string) {
	let races: Race[] = data.trim().split("\n").map(function(i) {
		var args = i.split("\t"); 
		return new Race(
			args[0], args[1], <RaceState>args[2], args[3], new Date()
		);
	});

	return races;
}


function list(cb: (err: Error | null, races: Race[] | undefined) => void) {
	let ls = execFile(`${root}/bin/fetch-races`, ['ffhacks']);
	
	ls.stdout.on('data', function(data) {
		cb(null, parse(data.toString()));
	});

	ls.stderr.on('data', function(data) {
		cb(new Error(data.toString()), undefined);
	});
}



//
// Exports for unit tests
//
export var _parse = parse;
export var _list = list;
