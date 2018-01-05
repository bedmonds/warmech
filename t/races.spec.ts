// Test that race-related functionality works properly.
//
// Of note is that not only the public API of the race module
// is tested here.
//
// Due to the nature of SRL, some of these tests will fail if you are not
// connected to the internet, and may sometimes time out.
import * as races from '../src/warmech/races';
import 'mocha';
import * as assert from 'assert';
import * as root from 'app-root-path';

import { execFile } from 'child_process';


const dummyRaces = `Final Fantasy Hacks\t#srl-yojoe\topen\tKill Chaos
The Legend of Zelda: A link to the Past Hacks\t#srl-alwaysthere\tin_progress\tvtwhatever randomizer
Mega Man X\t#srl-calebhart\tcomplete\tany%


`;

describe('races module', function() {
	it('should return a list', function(done) {
		// SRL had a tendancy to take longer than 2 seconds
		// every once in a while.
		this.timeout(8000);

		races._list(function(err, races) {
			assert.ifError(err);
			assert.ok(races);
			done();
		});
	});

	it('should parse fetch-races output', function(done) {
		let list = races._parse(dummyRaces);

		assert.equal(3, list.length);

		assert.equal('Final Fantasy Hacks', list[0].game);
		assert.equal('complete', list[2].state);

		done();
	});
});

describe('srl-api interop', function() {
	it('should fetch current races', function(done) {
		// SRL had a tendancy to take longer than 2 seconds
		// every once in a while.
		this.timeout(8000);

		var ls = execFile(`${root}/bin/fetch-races`, []);
		ls.stdout.on('data', function(data) {
			assert.ok(data);
			done();
		});
	});
});
