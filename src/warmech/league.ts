// League-related functionality
//
// e.g. Querying the standings / schedule

import * as gsheets from 'google-spreadsheet';

interface IScheduleRow {
	racestage: string;
	matchdate: string;
	matchtimeuseastern: string;
	restreamedracer1: string;
	restreamedracer2: string;
	restreamedracer3: string;
	restreamedracer4: string;
}

export class Match {
	constructor(
		public stage: string,
		public day: string,
		public time_useastern: string,
		public racers: string[]
	) { }

	get startTime() : string {
		return `${this.day} at ${this.time_useastern}`;
	}

	get runners() : string {
		let list = this.racers.filter(function(i) {
			return i != undefined && i != ''; 
		});

		if (list.length == 0) return '';

		return  `\nFeaturing: ${list.join(', ')}\n`;
	}

	get date() : Date {
		let tz = isEDT() ? 'GMT-0400' : 'GMT-0500';

		let str = `${this.day.trim()} 2018 ${this.time_useastern}:00 ${tz}`;

		return new Date(Date.parse(str));
	}
		
	public toString() : string {
		return `${this.stage}, on ${this.day.trim()} at ${this.time_useastern} Eastern${this.runners}`;
	}


	public static fromSheetRow(i: IScheduleRow) {
		let racers = [
			i.restreamedracer1,
			i.restreamedracer2,
			i.restreamedracer3,
			i.restreamedracer4
		];

		return new Match(i.racestage, i.matchdate, 
			i.matchtimeuseastern, racers);
	}
}

// Fuck Daylight Savings and JavaScript verbosity.
function isEDT() {
	const now = new Date();

	const jan = new Date(now.getFullYear(), 0, 1);
	const jul = new Date(now.getFullYear(), 6, 1);

	let offset = 
		Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
	
	return now.getTimezoneOffset() < offset;
}

export function schedule(cb: (err: Error, matches?: Match[]) => void) {
	let doc = new gsheets('1UPfB0EhycJWqBgdbn1Yr_HuX4tE6thErwUqUT6B1-P0');
	doc.getInfo(function(err, info) {
		if (err) {
			cb(err);
			return;
		}

		let sheet = info.worksheets[1];
		sheet.getRows({ offset: 1, limit: 50 }, function(err, rows) {
			if (err) {
				cb(err);
				return;
			}

			cb(err, rows.map(Match.fromSheetRow));
		});
	});
}


export function upcomingRaces(cb: (err: Error, matches?: Match[]) => void) {
	schedule(function(err, matches) {
		if (err || !matches) {
			cb(err);
			return;
		}

		const now = new Date();

		matches.sort(byDateAsc);
		
		// inline to not have 500 date instantiations
		// alternative: binding to +now+; fuck the verbosity,
		// the intent is obvious.
		cb(err, matches.filter(function(i) { return i.date > now }));
	});
}

function byDateAsc(a: any, b: any) { return a.date - b.date; }
