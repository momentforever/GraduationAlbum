<template>
	<view>
		<view>
			<view class="planet">
			  <image class="h1" src="../../static/images/4.png" ></image>
			  <button style='font-size:40rpx' class="shine" @click="submitAllInfo">✦{{showButton}}✦</button>
			</view>
			<view  class="form">
			  <van-cell-group>
			    <van-field
			      label="学校"
			      placeholder="请输入学校"
			      border="false"
				  :value="yourDataTemp.yourSchool"
				  @input="updateSchool"
			    />
			    <van-field
			      label="院系"
			      placeholder="请输入院系"
			      border="false"
				  :value="yourDataTemp.yourDepartment"
				  @input="updateDepartment"
			    />
			    <van-field
			      label="班级"
			      placeholder="请输入班级"
			      border="false"
				  :value="yourDataTemp.yourClass"
				  @input="updateClass"
			    />
			    <van-field
			      label="学号"
			      placeholder="请输入学号"
			      border="false"
				  :value="yourDataTemp.yourID"
				  @input="updateID"
			    />
			    <van-field
			      label="姓名"
			      placeholder="请输入姓名"
			      border="false"
				  :value="yourDataTemp.yourName"
				  @input="updateName"
			    />
			  </van-cell-group>
			</view>
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
			updateSchool:function(e){
				this.yourDataTemp.yourSchool=e.detail;
			},
			updateDepartment:function(e){
				this.yourDataTemp.yourDepartment=e.detail;
			},
			updateClass:function(e){
				this.yourDataTemp.yourClass=e.detail;
			},
			updateID:function(e){
				this.yourDataTemp.yourID=e.detail;
			},
			updateName:function(e){
				this.yourDataTemp.yourName=e.detail;
			},

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
				
				if(_this.studentSchool==''||
				_this.yourDataTemp.yourSchool==''||
				_this.yourDataTemp.yourDepartment==''||
				_this.yourDataTemp.yourClass==''||
				_this.yourDataTemp.yourID==''){
					console.log('信息不完整');
					return;
				}
				
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
				
				if(studentAllInfo.result.data[0]==undefined){
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
				
				uni.navigateBack({
					url:'./informationshow/informationshow',
					fail:function(result){
						console.log(result);
					}
				})
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
page{
  background-color:#141319;
}

.h1{
  margin-top: 60rpx;
  width: 768rpx;
  height: 576rpx;
}
.shine{
  color: white;
  background-color: #141319;
}
.planet{
  height: 650rpx;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-shadow:0px 0px 5px yellow;
}


.form {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
} 

</style>
