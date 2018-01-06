export interface IStream {
	reply(string);
}

export interface IRepo {
	findOne(query: Object, cb: (Error, any) => void);
	find(query: Object, cb: (Error, any) => void);
	remove(query: Object, cb: (Error, any) => void);
	insert(query: Object, cb: (Error, any) => void);
}
