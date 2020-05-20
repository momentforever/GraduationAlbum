<template>
	<view>
		<view>
			<p>学校：</p>
			<input class="uni-input" placeholder="输入" v-model="yourDataTemp.yourSchool" />
			<p>院系：</p>
			<input class="uni-input" placeholder="输入" v-model="yourDataTemp.yourDepartment" />
			<p>班级：</p>
			<input class="uni-input" placeholder="输入" v-model="yourDataTemp.yourClass" />
			<p>学号：</p>
			<input class="uni-input" placeholder="输入" v-model="yourDataTemp.yourID" />
			<p>姓名：</p>
			<input class="uni-input" placeholder="输入" v-model="yourDataTemp.yourName" />
			<button @click="getAllInfo">提交信息</button>
			<!-- <button @click="queryStudentById">查询信息</button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yourDataTemp: {
					_id: getApp().globalData.yourData._id,
					wechatId: getApp().globalData.yourData.wechatId,
					yourSchool: getApp().globalData.yourData.studentSchool,
					yourDepartment: getApp().globalData.yourData.studentDepartment,
					yourClass: getApp().globalData.yourData.studentClass,
					yourID: getApp().globalData.yourData.studentID,
					yourName: getApp().globalData.yourData.studentName
				}
			}
		},
		methods: {
			getAllInfo: async function() {
				let _this = this;
				
				if(getApp().globalData.yourData._id!=''){
					console.log('已存在用户不能再注册');
					return;
				}
				//用于提交信息到数据库
				const submitInfo = function() {
					return new Promise(function(resolve, reject) {
						uniCloud.callFunction({
							name: 'addStudentsData',
							data: {
								wechatId: _this.yourDataTemp.wechatId,
								studentSchool: _this.yourDataTemp.yourSchool,
								studentDepartment: _this.yourDataTemp.yourDepartment,
								studentClass: _this.yourDataTemp.yourClass,
								studentID: _this.yourDataTemp.yourID,
								studentName: _this.yourDataTemp.yourName
							},
							success:function(result){
								resolve(result);
							}
						})
					})
				}
				
				const getStudentInfo=function(){
					return new Promise(function(resolve,reject){
						uniCloud.callFunction({
							name:'queryStudentByWechatId',
							data:{
								wechatId:_this.yourDataTemp.wechatId
							},
							success:function(result){
								resolve(result);
							}
						})
					})
				}
				
				//getApp().globalData.yourData = this.yourDataTemp;
				

				// if(_this.studentSchool==''||
				// _this.yourDataTemp.yourSchool==''||
				// _this.yourDataTemp.yourDepartment==''||
				// _this.yourDataTemp.yourClass==''||
				// (_this.yourDataTemp.yourID==''){
				// 	console.log('信息不完整');
				// }else{	
				// await submitInfo();
				// }
				
				console.log(_this.yourDataTemp);
				
				let submitRes = await submitInfo();
				
				let studentAllInfo=await getStudentInfo();

				//console.log(studentAllInfo.result.data);
				
				//将信息同步
				getApp().globalData.yourData=studentAllInfo.result.data[0];
				
				console.log(getApp().globalData.yourData);
				
			}
		},
		onShow: function() {
			let _this=this;
			
			console.log("information Show");
					
			_this.yourDataTemp.wechatId=getApp().globalData.yourData._id;

		}
	}
</script>

<style>

</style>
