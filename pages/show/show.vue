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
							studentSchool: getApp().globalData.yourData.studentSchool,
							studentDepartment: getApp().globalData.yourData.studentDepartment,
							studentClass: getApp().globalData.yourData.studentClass
						},
						success:function(res){
							resolve(res)
						}
					})
				})
			}
			
			
			let allBooks = await queryAllBooks();
			
			console.log(allBooks);
			
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
