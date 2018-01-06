


class MockRepo {
	protected data: Array<any>;

	findOne(query: Object, cb: (err: Error, data?: any) => void) {
		
	}


	find(query: Object, cb: (err: Error, data?: any) => void) {
	}


	remove(query: Object, cb: (err: Error, data?: any) => void) {
	}


	update(query: Object, cb: (err: Error, data?: any) => void) {
	}


	insert(query: Object, cb: (err: Error, data?: any) => void) {
	}
}


export class MockRaceRepo extends MockRepo {
	data = [
		new Race('Stale FFHacks', '#srl-nomatter', 'in_progress', 
			'Kill Chaos', new Date(Date.now() - 24 * 3600 * 1000)),

		new Race('To Update', '#srl-fixme', 'open', '', new Date())
	];
}
