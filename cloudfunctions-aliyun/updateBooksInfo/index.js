'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const collection = db.collection('booksinfo')
	const res = await collection.where({wechatId: dbCmd.eq(event.wechatId)}).update(event)
	return res
};
