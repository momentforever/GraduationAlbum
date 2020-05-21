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
			<button @click="submitAllInfo">{{showButton}}</button>
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
				},
				showButton:''
			}
		},
		methods: {
			submitAllInfo: async function() {
				let _this = this;
				
				//用于提交信息到数据库
				const addStudentInfo = function() {
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
				
				const updateStudentInfo = function() {
					return new Promise(function(resolve, reject) {
						uniCloud.callFunction({
							name: 'updateStudentsData',
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
				
				// if(_this.studentSchool==''||
				// _this.yourDataTemp.yourSchool==''||
				// _this.yourDataTemp.yourDepartment==''||
				// _this.yourDataTemp.yourClass==''||
				// (_this.yourDataTemp.yourID==''){
				// 	console.log('信息不完整');
				// }else{	
				// await submitInfo();
				// }
				
				uni.showLoading({
					title: '加载ing...',
					mask:true
				})
				
				console.log('你的_id=>');
				console.log(_this.yourDataTemp._id);
				console.log('你的openid=>');
				console.log(_this.yourDataTemp.wechatId);
				
				let studentAllInfo=await getStudentInfo();
				console.log('你存在本地的信息=>');
				console.log(_this.yourDataTemp);
				console.log('第一次查询的结果=>');
				console.log(studentAllInfo.result.data);
				
				if(studentAllInfo.result.data==[]){
					console.log('第一次注册账号');
					let submitRes = await addStudentInfo();
					console.log('增添用户返回值=>');
					console.log(submitRes);
				}else{	
					console.log('修改账号');
					let submitRes = await updateStudentInfo();
					console.log('修改用户返回值=>');
					console.log(submitRes);
				}
				
				

				//console.log(studentAllInfo.result.data);
				
				//将信息同步
				let newStudentAllInfo=await getStudentInfo();
				console.log('第二次查询的结果=>');
				console.log(newStudentAllInfo);
				
				getApp().globalData.yourData=newStudentAllInfo.result.data[0];
				
				uni.hideLoading();
				//console.log(getApp().globalData.yourData);
				
			}
		},
		onShow: function() {

			let _this=this;
			
			console.log("information Show");

			if(_this.yourDataTemp._id==''){
				_this.showButton='注册信息'
			}else{
				_this.showButton='修改信息'
			}
			//_this.yourDataTemp.wechatId=getApp().globalData.yourData.wechatId;
			

		}
	}
</script>

<style>

</style>
