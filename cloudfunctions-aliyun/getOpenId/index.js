// 'use strict';
// exports.main = async (event, context) => {
//   //event为客户端上传的参数
//   console.log('event : ' + event)
//   //返回数据给客户端
//   return event
// };


'use strict';
exports.main = async (event, context) => {

	// const getOpenId = function() {
	// 	return new Promise(function(resolve, reject) {
	// 		uni.request({
	// 			url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx3a2620e3cfddcf73&secret=4dd2e657d0fbf7c46bd9f9a0f163c39f&js_code=' +
	// 				wxCode + '&grant_type=authorization_code',
	// 			success: (result) => {
	// 				resolve(result.data.openid);
	// 			}
	// 		})
	// 	})
	// }
	let wxCode = event.wechatCode;
	const getOpenId = uniCloud.httpclient.request(
		'https://api.weixin.qq.com/sns/jscode2session?appid=wx3a2620e3cfddcf73&secret=4dd2e657d0fbf7c46bd9f9a0f163c39f&js_code=' +
		wxCode + '&grant_type=authorization_code', {
			method: 'POST',
			dataType:'json'
		})
	return getOpenId;
	// let wxCode = event.wechatCode;
	// let res = await getOpenId();
	//return res
};
