<template>
	<view>
		<view>
			<button @click="choosePhoto">上传照片</button>
			<p>输入框:</p>
			<input class="uni-input" placeholder="输入您想说的话" @input="updateLeaveMsg"/>
			<button @click="submitToDatabase">提交信息</button>
			<h2>***********************</h2>
		</view>
		<view>
			<templatea :photourl="tempPhotoUrl" :leavemsg="booksInfo[0].leaveMsg" :name="name" v-if="tempa"></templatea>
			<templateb :photourl="tempPhotoUrl" :leavemsg="booksInfo[0].leaveMsg" :name="name" v-if="tempb"></templateb>
			<templatec :photourl="tempPhotoUrl" :leavemsg="booksInfo[0].leaveMsg" :name="name" v-if="tempc"></templatec>
		</view>
		<view>
			<button @click="chooseTemplate">选择模板</button>
		</view>
		<p hidden>{{randomNum}}</p>
	</view>
<!-- 	<view>			
		<view>
			<button @click="choosePhoto">上传照片</button>
			<p>输入框:</p>
			<input class="uni-input" placeholder="输入您想说的话" @input="updateLeaveMsg"/>
			<p>***********************</p>
		</view>
		<view>
			<image :src="tempPhotoUrl"></image>
			<p>选择的模板:</p>
			<p>{{booksInfo[0].bookTemplate}}</p>
			<p>显示的文本:</p>
			<h2>{{booksInfo[0].leaveMsg}}</h2>
		</view>
		<view>
			<button @click="submitToDatabase">提交信息</button>
			<button @click="chooseTemplate">选择模板</button>
		</view>
		<p hidden>{{randomNum}}</p>
	</view> -->
</template>

<script>
	import templatea from "../template/templatea.vue"
	import templateb from "../template/templateb.vue"
	import templatec from "../template/templatec.vue"
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
				}],
				randomNum:'',
				name:getApp().globalData.yourData.studentName,
				tempa:'',
				tempb:'',
				tempc:''
			}
		},
		components:{
			templatea,
			templateb,
			templatec
		},
		methods: {
			updateLeaveMsg:function(e){
				//console.log(e);
				this.booksInfo[0].leaveMsg=e.detail.value
			},
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
				console.log("_this.bookInfo[0].bookTemplate=>");
				console.log(_this.booksInfo[0].bookTemplate);
				if(_this.tempPhotoUrl==''||
				_this.booksInfo[0].leaveMsg==''||
				_this.booksInfo[0].bookTemplate==''){
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
								bookTemplate:_this.booksInfo[0].bookTemplate
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
								bookTemplate:_this.booksInfo[0].bookTemplate
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
				
				// uni.navigateBack({
				// 	url:'../designshow/designshow',
				// 	fail:function(result){
				// 		console.log(result);
				// 	}
				// })
				uni.reLaunch({
					url:'../designshow/designshow'
				})
				
				uni.hideLoading();
			},
			chooseTemplate:function(){
				uni.navigateTo({
					url:'../chooseTemplate/chooseTemplate'
				})
			}
		},
		onLoad:function(option){
			let _this = this;
			
			console.log(option);
			_this.booksInfo[0].bookTemplate=option.bookTemp;
		},
		onShow: function() {
			let _this = this;
			console.log('design Show');
						
			//同步信息
			//_this.booksInfo[0]=getApp().globalData.yourBooksInfo[0];
			console.log('index页面的booksinfo=>');
			console.log(getApp().globalData.yourBooksInfo[0]);
			
			
			_this.randomNum=Math.random()*100;
			
			console.log(_this.booksInfo[0].bookTemplate);
			if(_this.booksInfo[0].bookTemplate==1){
				_this.tempa=true;
				_this.tempb=false;
				_this.tempc=false;
			}else if(_this.booksInfo[0].bookTemplate==2){
				_this.tempa=false;
				_this.tempb=true;
				_this.tempc=false;
			}else if(_this.booksInfo[0].bookTemplate==3){
				_this.tempa=false;
				_this.tempb=false;
				_this.tempc=true;
			}
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
page{
  background-color: lightgray;
}
</style>
