<template>
	<view>
		<view>
			<image :src="booksInfo[0].photoUrl"></image>
			<p>{{booksInfo[0].leaveMsg}}</p>
			<p>{{booksInfo[0].bookTemplate}}</p>
		</view>
		<view>
			<button @click="toDesign">修改模板</button>
		</view>
		<p hidden>{{randomNum}}</p>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				booksInfo : [{
					_id:getApp().globalData.yourBooksInfo[0]._id,
					yourDataId:getApp().globalData.yourBooksInfo[0].yourDataId,
					photoUrl:getApp().globalData.yourBooksInfo[0].photoUrl,
					leaveMsg:getApp().globalData.yourBooksInfo[0].leaveMsg,
					bookTemplate:getApp().globalData.yourBooksInfo[0].bookTemplate
				}],
				randomNum:''
			}
		},
		methods: {
			toDesign:function(){
				uni.navigateTo({
					url: '../design/design'
				})
			}
		},
		onShow:function(){
			let _this=this;
			//console.log(getApp().globalData.yourBooksInfo[0]._id=='');
			if(getApp().globalData.yourBooksInfo[0]._id==''){
				console.log("开始您的初次设计");
				uni.redirectTo({
					url:'../design/design'
				})
			}
			
			console.log('designshow show');
			
			_this.booksInfo[0] = {
				_id:getApp().globalData.yourBooksInfo[0]._id,
				yourDataId:getApp().globalData.yourBooksInfo[0].yourDataId,
				photoUrl:getApp().globalData.yourBooksInfo[0].photoUrl,
				leaveMsg:getApp().globalData.yourBooksInfo[0].leaveMsg,
				bookTemplate:getApp().globalData.yourBooksInfo[0].bookTemplate
			}
			
			_this.randomNum=Math.random()*100;
		}
	}
</script>

<style>

</style>
