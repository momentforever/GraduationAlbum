<template>
	<view class="templatea">
		<view class="bg">
			<view class="ball1"></view>
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
	/* 以下是ball1背景 */
	 page{
	  background: linear-gradient(0deg,rgb(154,122,126),rgb(19,18,18));
	} 
	.bg{
	  background: linear-gradient(0deg,rgb(154,122,126),rgb(19,18,18));
	  height: 100vh;
	} 
	.ball1{
	  height: 600rpx;
	  font-size: 15px;
	  line-height: 30px;
	  color: beige;
	  padding-top: 25%;
	  padding-left: 20%;
	  text-align: center;
	  background-image: url(https://aaa-1302259509.cos.ap-beijing.myqcloud.com/652981946587482942.png);
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
	  border-color: white;
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
	  margin: 20% 5% 0 5%;
	  padding:0;
	}
	.item-link{
	  color: aliceblue;
	  font-size: 60rpx;
	  text-align: center;
	}
</style>
