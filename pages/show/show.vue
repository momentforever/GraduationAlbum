<template>
	<view>
		
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
		onShow: async function() {
			console.log('index Show');
			
			
			const queryAllBooks = function(){
				return new Promise(function(resolve,reject){
					uniCloud.callFunction({
						name: 'queryAllBooks',
						data: {
							studentSchool: getApp().globalData.yourData.yourSchool,
							studentDepartment: getApp().globalData.yourData.yourDepartment,
							studentClass: getApp().globalData.yourData.yourClass
						}
					})
				})
			}
			
			
			if(getApp().globalData.yourData.yourSchool==''||
			getApp().globalData.yourData.yourDepartment==''||
			getApp().globalData.yourData.yourClass==''){
				console.log('未注册');
			}else{	
			await queryAllBooks();
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

</style>
