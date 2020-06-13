<template>
	<view>
		<view>
			<view>
				<p>学校：{{yourData.yourSchool}}</p>
				<p>院系：{{yourData.yourDepartment}}</p>
				<p>班级：{{yourData.yourClass}}</p>
				<p>学号：{{yourData.yourID}}</p>
				<p>姓名：{{yourData.yourName}}</p>
			</view>
			<view>
				<button @click="toInformation">修改个人信息</button>
			</view>
		</view>
		<p hidden>{{randomNum}}</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yourData: {
					_id: getApp().globalData.yourData._id,
					wechatId: getApp().globalData.yourData.wechatId,
					yourSchool: getApp().globalData.yourData.studentSchool,
					yourDepartment: getApp().globalData.yourData.studentDepartment,
					yourClass: getApp().globalData.yourData.studentClass,
					yourID: getApp().globalData.yourData.studentID,
					yourName: getApp().globalData.yourData.studentName
				},
				randomNum:''
			}
		},
		methods: {
			toInformation:function(){
				uni.navigateTo({
					url: '../information/information'
				})
			}
		},
		onShow:function(){
			let _this=this;
			console.log('informationshow show');
			_this.yourData = {
				_id: getApp().globalData.yourData._id,
				wechatId: getApp().globalData.yourData.wechatId,
				yourSchool: getApp().globalData.yourData.studentSchool,
				yourDepartment: getApp().globalData.yourData.studentDepartment,
				yourClass: getApp().globalData.yourData.studentClass,
				yourID: getApp().globalData.yourData.studentID,
				yourName: getApp().globalData.yourData.studentName
			}
			_this.randomNum=Math.random()*100;
			
		}
	}
</script>

<style>

</style>
