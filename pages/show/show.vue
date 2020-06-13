<template>
	<view>
		<view v-for="bookInfo in booksInfo">
			<image :src="bookInfo.photoUrl"></image>
			<p>{{bookInfo.leaveMsg}}</p>
			<p>{{bookInfo.bookTemplate}}</p>
		</view>
		<p hidden>{{randomNum}}</p>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				dividingLine:'',
				booksInfo : [{
					_id:'',
					yourDataId:'',
					photoUrl:'',
					leaveMsg:'',
					bookTemplate:''
				}],
				randomNum:''
			}
		},
		methods: {
		},
		onShow: async function() {
			uni.showLoading({
				title: '请稍等...',
				mask:true
			})
			
			let _this=this;
			
			console.log('show Show');
				
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
							resolve(res.result)
						}
					})
				})
			}
			
			console.log("yourData=>");
			console.log(getApp().globalData.yourData);
			
			let allBooks = await queryAllBooks();
			
			console.log("数据库中的书籍信息=>");
			console.log(allBooks);
			
					
			for(var i in allBooks){	
				_this.booksInfo[i]=allBooks[i].data[0];
			}
			
			console.log("本地中的书籍信息=>");
			console.log(_this.booksInfo[0]);
			
			_this.randomNum=Math.random()*100;

			// if(getApp().globalData.yourData._id==''){
			// 	console.log("未注册");
			// 	uni.switchTab({
			// 		url: '../information/information'
			// 	});
			// }
			
			uni.hideLoading();
		}
	}
</script>

<style>

</style>
