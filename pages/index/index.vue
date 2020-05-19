<template>
	
	<view>
		<view>
			<button @click="choosePhoto">上传照片</button>
			<input class="uni-input" placeholder="输入您想说的话" v-model="booksInfo[0].leaveMsg"/>
		</view>
		<view>
			<image :src="tempPhotoUrl"></image>
			<h2>{{booksInfo[0].leaveMsg}}</h2>
		</view>
		<view>
			<button @click="submitToDatabase">提交信息</button>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				tempPhotoUrl:'',
				booksInfo : [{
					_id:'',
					studentSchool: '',
					studentDepartment: '',
					studentClass: '',
					studentName:'',
					studentID:'',
					photoUrl:'',
					leaveMsg:'',
					bookTemplate:''
				}]
			}
		},
		methods: {
			choosePhoto:async function(){
				let _this = this;
				
				const chooseImage = function() {
					return new Promise(function(resolve, reject) {
				
						uni.chooseImage({
							count: 1, //默认9
							sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
							sourceType: ['album'], //从相册选择
							success: function(res) {
								//console.log(res.tempFilePaths);
								//console.log(res.tempFiles);
								resolve(res.tempFilePaths[0])
							}
						});
				
					})
				}
				
				_this.tempPhotoUrl = await chooseImage();
			},
			submitToDatabase:async function(){
				let _this = this;
				
				const uploadPhoto = function() {
					return new Promise(function(resolve, reject) {
						uniCloud.uploadFile({
							filePath: _this.tempPhotoUrl,
							onUploadProgress: function(progressEvent) {
								// console.log(progressEvent);
								// var percentCompleted = Math.round(
								// 	(progressEvent.loaded * 100) / progressEvent.total
								// );
							},
							success:function(res){
								resolve(res.fileID);
							}
						});
					})
				}
				
				const submitInfo = function(){
					return new Promise(function(resolve,reject){
						uniCloud.callFunction({
							name: 'addBooksInfo',
							data: {
								studentSchool: '',
								studentDepartment: '',
								studentClass: '',
								studentID:0,
								studentName:'student',
								photoUrl:_this.booksInfo[0].photoUrl,
								leaveMsg:_this.booksInfo[0].leaveMsg,
								bookTemplate:''
							}
						})
					})
				}
				

				if(_this.tempPhotoUrl==''||
				_this.booksInfo[0].leaveMsg==''){
					console.log('信息不能为空');
				}else{
				_this.booksInfo[0].photoUrl = await uploadPhoto();
				await submitInfo();
				}
			}
		},
		onShow: function() {
			console.log('index Show');
			
			// if(getApp().globalData.yourData._id==''){
			// 	console.log("未注册");
			// 	uni.switchTab({
			// 		url: '../information/information'
			// 	});
			// }
		}
	}
</script>

<style>

</style>
