'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('booksinfo')
	const res = await collection.where({
		studentSchool: event.studentSchool,
		studentDepartment: event.studentDepartment,
		studentClass: event.studentClass
	}).get()
	return res
};
