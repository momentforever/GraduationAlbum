<template>
		<view>
		   <image class="k" src="https://aaa-1302259509.cos.ap-beijing.myqcloud.com/%E5%B0%81%E9%9D%A2.png"></image>
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
	  background-color: #3B4144;
	}
	.k{
	  margin-top: 0rpx;
	  width: 756rpx;
	  height: 1344rpx;
	}
</style>