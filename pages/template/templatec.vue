<template>
	<view class="templatec">
		<view class="bg">
			<view class="ball3"></view>
			<view class="part2">
			  <image :src="photourl" class="userinfo-avatar"></image><!--头像-->
			</view>
			<view class="part3">
			  <view class="name">{{name}}</view>
			</view>
			<view class="part4">
			  <view class="item-link" bindtap="jump">{{leavemsg}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		props:{
			leavemsg: null,
			photourl: null,
			name: null,
		}
	}
</script>

<style>
	.bg{
	  background: linear-gradient(0deg,rgb(205,228,223),rgb(22, 32, 32) 60%,black);
	 height: 100vh;
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
