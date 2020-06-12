'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('booksinfo')
	const res = await collection.where({
		yourDataId: event.yourDataId,
	}).get()
	return res
};