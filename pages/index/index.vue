<template>
	<view>
		<view class="ball1"></view>
		<view class="ball2"></view>
		<view class="ball3"></view>
		<view class="part2">
		  <image src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-gruadationablum/72c4138b-a68c-4a9d-a7ea-37b0eda32306.jpg" class="userinfo-avatar"></image><!--头像-->
		</view>
		<view class="part3">
		  <view class="name">@肿头狗</view>
		</view>
		<view class="part4">
		  <view class="item-link" bindtap="jump">标题部分</view>
		</view>
	</view>
</template>

<script>
//https://vkceyugu.cdn.bspapp.com/VKCEYUGU-gruadationablum/72c4138b-a68c-4a9d-a7ea-37b0eda32306.jpg
	export default {
		data() {
			return {
				text:''
			}
		},
		methods: {
			
		},
		onShow:async function(){
			let _this=this;
			console.log("index show");
			
			if(getApp().globalData.yourData._id==''&&
			getApp().globalData.yourData.wechatId!=''){
				console.log("必须注册");
				uni.redirectTo({
					url:'/pages/information/information'
				})
			}
			
		}
	}
</script>

<style>
page{
  background: linear-gradient(0deg,rgb(205,228,223),rgb(22, 32, 32) 60%,black);
}
.ball3{
  height: 600rpx;
  font-size: 15px;
  line-height: 30px;
  color: beige;
  padding-top: 25%;
  padding-left: 20%;
  text-align: center;
  background-image: url(https://aaa-1302259509.cos.ap-beijing.myqcloud.com/%E7%90%833.png);
  background-size: 100%;
  background-repeat:no-repeat; 
  z-index: -1;
} 
/* ↓用户头像 */
.part2{
  margin-top: -100%;
  text-align: center;
  margin-top: -55%;
}
.userinfo-avatar{
  width: 300rpx;
  height: 300rpx;
  overflow:hidden;
  border-style: solid;
  border-color:white;
  border-width: 6rpx;
  border-radius: 50%;
}
.part3{
  margin-top: 8%;
}
.name{
  text-align: center;
  font-size: 40rpx;
  color: aliceblue;
}
.part4{
padding: none;
margin-top: 160rpx;
}
.item-link{
  color: aliceblue;
  font-size: 60rpx;
  text-align: center;
}
</style>
