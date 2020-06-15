<template>
	<view>
		<view>
			<button @click="toDesign">修改模板</button>
			<templatea :photourl="booksInfo[0].photoUrl" :leavemsg="booksInfo[0].leaveMsg" :name="name" v-if="tempa"></templatea>
			<templateb :photourl="booksInfo[0].photoUrl" :leavemsg="booksInfo[0].leaveMsg" :name="name" v-if="tempb"></templateb>
			<templatec :photourl="booksInfo[0].photoUrl" :leavemsg="booksInfo[0].leaveMsg" :name="name" v-if="tempc"></templatec>
		</view>
		<p hidden>{{randomNum}}</p>
	</view>
<!-- 	<view>
		<view>
			<image :src="booksInfo[0].photoUrl"></image>
			<p>{{booksInfo[0].leaveMsg}}</p>
			<p>{{booksInfo[0].bookTemplate}}</p>
		</view>
		<view>
			<button @click="toDesign">修改模板</button>
		</view>
		<p hidden>{{randomNum}}</p>
	</view> -->
</template>


<script>
	import templatea from "../template/templatea.vue"
	import templateb from "../template/templateb.vue"
	import templatec from "../template/templatec.vue"
	export default {
		data() {
			return {
				booksInfo : [{
					_id:getApp().globalData.yourBooksInfo[0]._id,
					yourDataId:getApp().globalData.yourBooksInfo[0].yourDataId,
					photoUrl:getApp().globalData.yourBooksInfo[0].photoUrl,
					leaveMsg:getApp().globalData.yourBooksInfo[0].leaveMsg,
					bookTemplate:getApp().globalData.yourBooksInfo[0].bookTemplate
				}],
				randomNum:'',
				name:getApp().globalData.yourData.studentName,
				tempa:'',
				tempb:'',
				tempc:''
			}
		},
		components:{
			templatea,
			templateb,
			templatec
		},
		methods: {
			toDesign:function(){
				uni.navigateTo({
					url:'../chooseTemplate/chooseTemplate'
				})
			}
		},
		onShow:function(){
			let _this=this;
			//console.log(getApp().globalData.yourBooksInfo[0]._id=='');
			if(getApp().globalData.yourBooksInfo[0]._id==''){
				console.log("开始您的初次设计");
				uni.redirectTo({
					url:'../chooseTemplate/chooseTemplate'
				})
			}
			
			console.log('designshow show');
			
			_this.booksInfo[0] = {
				_id:getApp().globalData.yourBooksInfo[0]._id,
				yourDataId:getApp().globalData.yourBooksInfo[0].yourDataId,
				photoUrl:getApp().globalData.yourBooksInfo[0].photoUrl,
				leaveMsg:getApp().globalData.yourBooksInfo[0].leaveMsg,
				bookTemplate:getApp().globalData.yourBooksInfo[0].bookTemplate
			}
			
			_this.name=getApp().globalData.yourData.studentName;
			
			_this.randomNum=Math.random()*100;
			
			console.log(_this.booksInfo[0].bookTemplate);
			if(_this.booksInfo[0].bookTemplate==1){
				_this.tempa=true;
				_this.tempb=false;
				_this.tempc=false;
			}else if(_this.booksInfo[0].bookTemplate==2){
				_this.tempa=false;
				_this.tempb=true;
				_this.tempc=false;
			}else if(_this.booksInfo[0].bookTemplate==3){
				_this.tempa=false;
				_this.tempb=false;
				_this.tempc=true;
			}
		}
	}
</script>

<style>
page{
  background-color: lightgray;
}
</style>
