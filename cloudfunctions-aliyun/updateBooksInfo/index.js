'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const collection = db.collection('booksinfo')
	const res = await collection.where({
		yourDataId: event.yourDataId
		}).update(event)
	return res
};
