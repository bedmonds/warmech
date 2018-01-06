import 'mocha';
import * as assert from 'assert';

import * as league from '../src/warmech/league';

describe('league schedule', function() {
	it('should work', function(done) {
		this.timeout(5000);

		league.schedule(function(err, matches) {
			assert.ifError(err);
			assert.ok(matches.length > 0);

			done();
		});
	});
});
