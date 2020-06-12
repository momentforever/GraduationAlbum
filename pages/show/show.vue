<template>
	<view>
		<view v-for="bookInfo in booksInfo">
			<image :src="bookInfo.photoUrl"></image>
			<p>{{bookInfo.leaveMsg}}</p>
			<p>{{bookInfo.bookTemplate}}</p>
			<h4>********************</h4>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				booksInfo : [{
					_id:'',
					yourDataId:'',
					photoUrl:'',
					leaveMsg:'',
					bookTemplate:''
				}]
			}
		},
		methods: {

		},
		onShow: async function() {
			// uni.showLoading({
			// 	title: '请稍等...',
			// 	mask:true
			// })
			
			let _this=this;
			console.log('index Show');
			console.log("yourData=>");
			console.log(getApp().globalData.yourData);
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
							resolve(res.result.data)
						}
					})
				})
			}
			
			console.log("yourData=>");
			console.log(getApp().globalData.yourData);
			
			let allBooks = await queryAllBooks();
			
			console.log("数据库中的书籍信息=>");
			console.log(allBooks);
			
			_this.booksInfo=allBooks;
			
			console.log("本地中的书籍信息=>");
			console.log(_this.booksInfo);
			
			// if(getApp().globalData.yourData._id==''){
			// 	console.log("未注册");
			// 	uni.switchTab({
			// 		url: '../information/information'
			// 	});
			// }
			
			// uni.hideLoading();
		}
	}
</script>

<style>

</style>
