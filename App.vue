<script>
	export default {
		onLaunch: async function() {
			let _this=this;
			
			console.log('App Launch');
			
			const getWechatCode = function() {
				return new Promise(function(resolve, reject) {
					uni.login({
						success: function(res) {
							resolve(res.code);
						}
					})
				})
			}
			
			const getOpenId = function() {
				return new Promise(function(resolve, reject) {
					uniCloud.callFunction({
						name: 'getOpenId',
						data: {
							wechatCode
						},
						success:function(result){
							resolve(result)
						}
					})
				})
			}
			
			const getStudentInfo=function(){
				return new Promise(function(resolve,reject){
					uniCloud.callFunction({
						name:'queryStudentByWechatId',
						data:{
							wechatId:openId.result.data.openid
						},
						success:function(result){
							resolve(result);
						}
					})
				})
			}
			
			const getBooksInfo=function(){
				return new Promise(function(resolve,reject){
					uniCloud.callFunction({
						name:'queryYourBooks',
						data:{
							yourDataId:yourInfo.result.data[0]._id
						},
						success:function(result){
							resolve(result);
						}
					})
				})
			}
			
			
			uni.showLoading({
				title: '正在启动ing...',
				mask:true
			})
			
			let wechatCode = await getWechatCode();
			
			let openId = await getOpenId();
			
			console.log('你的openid是=>');
			console.log(openId.result.data.openid);
			
			let yourInfo=await getStudentInfo();
			
			console.log('你的yourInfo是=>');
			console.log(yourInfo.result.data[0]);
						
			let yourBookInfo;
			
			if(yourInfo.result.data[0]==undefined){
				console.log('未注册');
			}else{
				console.log("已注册");
				//将用户信息同步到本地
				getApp().globalData.yourData=yourInfo.result.data[0];
				
				console.log(getApp().globalData.yourData);
				
				yourBookInfo=await getBooksInfo();
				
				console.log('你的yourBookInfo是=>');
				console.log(yourBookInfo);
			}
			
			if(yourBookInfo.result.data[0]==undefined){
				 console.log("未填写相册");
			}else{
				console.log("填写过相册");
				//将自己的书籍信息同步到本地
				getApp().globalData.yourBooksInfo=yourBookInfo.result.data[0];
				
				console.log(getApp().globalData.yourBooksInfo);
			}
			
			uni.hideLoading();
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		globalData: {
			yourData: {
				_id:'',
				wechatId:'',
				studentSchool:'',
				studentDepartment:'',
				studentClass:'',
				studentID:'',
				studentName:''
			},
			yourBooksInfo : [{
				_id:'',
				yourDataId:'',
				photoUrl:'',
				leaveMsg:'',
				bookTemplate:''
			}]
		}
	}
</script>

<style>
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	/* #endif */
</style>
