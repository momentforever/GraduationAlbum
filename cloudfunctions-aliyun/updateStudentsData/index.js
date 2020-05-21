'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const collection = db.collection('studentsdata')
	const res = await collection.where({wechatId: dbCmd.eq(event.wechatId)}).update({
		studentSchool:event.studentSchool,
		studentDepartment:event.studentDepartment,
		studentClass:event.studentClass,
		studentID:event.studentID,
		studentName:event.studentName
	})
	return res
};
// let res = await collection.doc('doc-id').update({
//   name: "Hey",
//   count: {
//     fav: 1
//   }
// });