'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collectionStudentsData = db.collection('studentsdata')
	const idList = await collectionStudentsData.where({
		studentSchool: event.studentSchool,
		studentDepartment: event.studentDepartment,
		studentClass: event.studentClass
	}).get()
	
	// console.log("idlist=>")
	// console.log(idList.data)
	
	const collectionBooksInfo = db.collection('booksinfo')
	let res = []
	for(let i in idList.data){
		//console.log(idList.data[i]._id);
		res[i] = await collectionBooksInfo.where({
			yourDataId: idList.data[i]._id,
		}).get()
	}
	return res
};
