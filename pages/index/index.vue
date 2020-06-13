<template>
	<view>
		<div>
			<h2>{{text}}</h2>
		</div>
	</view>
</template>

<script>
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

</style>
