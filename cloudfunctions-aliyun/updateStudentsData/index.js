'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const collection = db.collection('studentsdata')
	const res = await collection.where({
		wechatId: event.wechatId
	}).update(event)
	return res
};