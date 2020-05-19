<template>
	<view>
		<view>
			<p>学校：</p>
			<input class="uni-input" placeholder="输入" v-model="yourDataTemp.yourSchool"/>
			<p>院系：</p>
			<input class="uni-input" placeholder="输入" v-model="yourDataTemp.yourDepartment"/>
			<p>班级：</p>
			<input class="uni-input" placeholder="输入" v-model="yourDataTemp.yourClass"/>
			<p>学号：</p>
			<input class="uni-input" placeholder="输入" v-model="yourDataTemp.yourID"/>
			<p>姓名：</p>
			<input class="uni-input" placeholder="输入" v-model="yourDataTemp.yourName"/>
			<button @click="getAllInfo">提交信息</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yourDataTemp:{
					_id: '',
					wechatId:'',
					yourSchool: '',
					yourDepartment: '',
					yourClass: '',
					yourID: '',
					yourName: ''
				}
			}
		},
		methods: {
			getAllInfo:async function(){
				let _this=this;
				
				//用于提交信息到数据库
				const submitInfo = function(){
					return new Promise(function(resolve,reject){
						uniCloud.callFunction({
							name: 'addStudentsData',
							data: {
								wechatId:_this.yourDataTemp.wechatId,
								studentSchool:_this.yourDataTemp.yourSchool,
								studentDepartment:_this.yourDataTemp.yourDepartment,
								studentClass:_this.yourDataTemp.yourClass,
								studentID:_this.yourDataTemp.yourID,
								studentName:_this.yourDataTemp.yourName
							}
						})
					})
				}
				// console.log(_this.yourDataTemp.wechatId);
				// console.log(_this.yourDataTemp.yourSchool);
				// console.log(_this.yourDataTemp.yourDepartment);
				// console.log(_this.yourDataTemp.yourClass);
				// console.log(_this.yourDataTemp.yourID);
				// console.log(_this.yourDataTemp.yourName);
				
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
				
				await submitInfo();
			}
		},
		onShow: function() {
			console.log("成功进入");

			// uni.getUserInfo({
			// 	success:(result)=>{
			// 		console.log(result);
			// 	}
			// })
		}
	}
</script>

<style>

</style>
