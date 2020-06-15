<template>
	<view>
	<!-- 	<view>
			<templatea :photourl="booksInfo[0].photoUrl" :leavemsg="booksInfo[0].leaveMsg" :name="names[0]" v-if="tempa[0]"></templatea>
			<templateb :photourl="booksInfo[0].photoUrl" :leavemsg="booksInfo[0].leaveMsg" :name="names[0]" v-if="tempb[0]"></templateb>
			<templatec :photourl="booksInfo[0].photoUrl" :leavemsg="booksInfo[0].leaveMsg" :name="names[0]" v-if="tempc[0]"></templatec>
		</view> -->
		<view v-for="(bookInfo,i) in booksInfo">
			<view>
				<templatea :photourl="bookInfo.photoUrl" :leavemsg="bookInfo.leaveMsg" :name="names[i]" v-if="tempa[i]"></templatea>
				<templateb :photourl="bookInfo.photoUrl" :leavemsg="bookInfo.leaveMsg" :name="names[i]" v-if="tempb[i]"></templateb>
				<templatec :photourl="bookInfo.photoUrl" :leavemsg="bookInfo.leaveMsg" :name="names[i]" v-if="tempc[i]"></templatec>
			</view>
		</view>
		<p hidden>{{randomNum}}</p>
	</view>
</template>


<script>
	import templatea from "../template/templatea.vue"
	import templateb from "../template/templateb.vue"
	import templatec from "../template/templatec.vue"
	
	export default {
		data() {
			return {
				dividingLine:'',
				booksInfo : [{
					_id:'',
					yourDataId:'',
					photoUrl:'',
					leaveMsg:'',
					bookTemplate:'',
				}],
				randomNum:'',
				tempc:[],
				tempb:[],
				tempa:[],
				names:[]
			}
		},
		methods: {
		},
		components:{
			templatea,
			templateb,
			templatec
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
				_this.names[i]=allBooks[i].name;
				
				if(_this.booksInfo[i].bookTemplate==1){
					_this.tempa[i]=true;
					_this.tempb[i]=false;
					_this.tempc[i]=false;
				}else if(_this.booksInfo[i].bookTemplate==2){
					_this.tempa[i]=false;
					_this.tempb[i]=true;
					_this.tempc[i]=false;
				}else if(_this.booksInfo[i].bookTemplate==3){
					_this.tempa[i]=false;
					_this.tempb[i]=false;
					_this.tempc[i]=true;
				}
			}
			
			console.log("本地中的书籍信息=>");
			console.log(_this.booksInfo);
			console.log(_this.names);
			
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
