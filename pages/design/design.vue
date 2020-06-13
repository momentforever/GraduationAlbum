<template>
	<view>
		<view>
			<button @click="choosePhoto">上传照片</button>
			<p>输入框:</p>
			<input class="uni-input" placeholder="输入您想说的话" v-model="booksInfo[0].leaveMsg"/>
			<p>***********************</p>
		</view>
		<view>
			<image :src="tempPhotoUrl"></image>
			<!-- <p>显示的文本:</p> -->
			<!-- <h2>{{booksInfo[0].leaveMsg}}</h2> -->
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
				tempPhotoUrl:getApp().globalData.yourBooksInfo[0].photoUrl,
				booksInfo : [{
					_id:getApp().globalData.yourBooksInfo[0]._id,
					yourDataId:getApp().globalData.yourBooksInfo[0].yourDataId,
					photoUrl:getApp().globalData.yourBooksInfo[0].photoUrl,
					leaveMsg:getApp().globalData.yourBooksInfo[0].leaveMsg,
					bookTemplate:getApp().globalData.yourBooksInfo[0].bookTemplate
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
				
				if(_this.tempPhotoUrl==''||
				_this.booksInfo[0].leaveMsg==''){
					console.log('信息不能为空');
					return;
				}
				
				uni.showLoading({
					title: '请稍等...',
					mask:true
				})
				
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
				
				const addBookInfo = function(){
					return new Promise(function(resolve,reject){
						uniCloud.callFunction({
							name: 'addBooksInfo',
							data: {
								yourDataId:getApp().globalData.yourData._id,
								photoUrl:_this.booksInfo[0].photoUrl,
								leaveMsg:_this.booksInfo[0].leaveMsg,
								bookTemplate:''
							},
							success:function(res){
								resolve(res)
							}
						})
					})
				}
				const updateBookInfo = function(){
					return new Promise(function(resolve,reject){
						uniCloud.callFunction({
							name: 'updateBooksInfo',
							data: {
								yourDataId:getApp().globalData.yourData._id,
								photoUrl:_this.booksInfo[0].photoUrl,
								leaveMsg:_this.booksInfo[0].leaveMsg,
								bookTemplate:''
							},
							success:function(res){
								resolve(res)
							}
						})
					})
				}
				const getBooksInfo=function(){
					return new Promise(function(resolve,reject){
						uniCloud.callFunction({
							name:'queryYourBooks',
							data:{
								yourDataId:getApp().globalData.yourData._id
							},
							success:function(result){
								resolve(result);
							}
						})
					})
				}

				console.log("成功上传");
				if(_this.tempPhotoUrl!=getApp().globalData.yourBooksInfo[0].photoUrl){	
					console.log("重新上传照片");
					_this.booksInfo[0].photoUrl = await uploadPhoto();
				}else{
					console.log("与原来照片一样");
				}
				
				// console.log('booksinfo是=>');
				// console.log(_this.booksInfo[0]);
				
				let bookInfoJudge= await getBooksInfo();
				
				if(bookInfoJudge.result.data[0]==undefined){		
					let addBookInfoResult = await addBookInfo();
				}else{
					let	updateBookInfoResult = await updateBookInfo();
				}
				
				//同步信息
				let bookInfo= await getBooksInfo();
				console.log(bookInfo.result.data[0]);
				_this.booksInfo[0]=bookInfo.result.data[0];
				getApp().globalData.yourBooksInfo[0]=_this.booksInfo[0];
				console.log('全局的book信息是=>');
				console.log(getApp().globalData.yourBooksInfo[0]);
				
				uni.hideLoading();
			}
		},
		onShow: function() {
			let _this = this;
			console.log('design Show');
						
			//同步信息
			//_this.booksInfo[0]=getApp().globalData.yourBooksInfo;
			console.log('index页面的booksinfo=>');
			console.log(getApp().globalData.yourBooksInfo);			
			
			
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
