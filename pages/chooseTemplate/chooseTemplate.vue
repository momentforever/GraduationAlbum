<template>
	<view>
		<view class="title" style="margin-bottom:70rpx;">
		   <text style="font-weight:bold">🎨选择你的模板🎨</text>
		</view>
		
		<button class="celect" style="height:600rpx;width:650rpx;margin-bottom:70rpx;" @click="chooseTemplate1">
		  <image class="p1" src="../../static/images/22.png" mode="widthFix"></image>
		</button> 
		
		<button class="celect" style="height:600rpx;width:650rpx;margin-bottom:70rpx;" @click="chooseTemplate2">
		  <image class="p1" src="../../static/images/25.png" mode="widthFix"></image>
		</button> 
		
		<button class="celect" style="height:600rpx;width:650rpx;margin-bottom:70rpx;" @click="chooseTemplate3">
		  <image class="p1" src="../../static/images/28.png" mode="widthFix"></image>
		</button> 
		
		<button class="celect1" style="height:600rpx;width:650rpx;margin-bottom:70rpx;">
		  <text style="font-weight:bold;font-size:180rpx;">...</text>
		</button> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookTemplate:'',
			}
		},
		methods: {
			chooseTemplate1:function(){
				this.bookTemplate=1;
				console.log(getApp().globalData.yourBooksInfo[0].bookTemplate);
				uni.reLaunch({
					url:"../design/design?bookTemp="+this.bookTemplate
				})
			},
			chooseTemplate2:function(){
				this.bookTemplate=2;
				console.log(getApp().globalData.yourBooksInfo[0].bookTemplate);
				uni.reLaunch({
					url:"../design/design?bookTemp="+this.bookTemplate
				})
			},
			chooseTemplate3:function(){
				this.bookTemplate=3;
				console.log(getApp().globalData.yourBooksInfo[0].bookTemplate);
				uni.reLaunch({
					url:"../design/design?bookTemp="+this.bookTemplate
				})
			}
		}
	}
</script>

<style>
page{
  background-color: lightgray;
}
.p1{
  width:600.6rpx;
  height: 432.9rpx;
}

.title{
  background-color: white;
  font-size: 40rpx;
  height: 200rpx;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  
}
.celect{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 20rpx;
  padding-left: 20rpx;
  padding-top: 30rpx;
  padding-bottom: 80rpx;
}

.celect1{
  color: aliceblue;
  background-color: rgb(23, 23, 24);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 20rpx;
  padding-left: 20rpx;
  padding-top: 30rpx;
  padding-bottom: 80rpx;
}
</style>
