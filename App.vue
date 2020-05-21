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
			
			uni.showLoading({
				title: '正在启动ing...',
				mask:true
			})
			
			let wechatCode = await getWechatCode();
			
			let openId = await getOpenId();
			
			let yourInfo=await getStudentInfo();
			
			console.log('你的openid是=>');
			console.log(openId.result.data.openid);
			
			if(yourInfo.result.data==[]){
				console.log('未注册');
			}else{
				getApp().globalData.yourData=yourInfo.result.data[0];
				console.log('登录时调用的信息=>');
				console.log(getApp().globalData.yourData);
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
			}
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
