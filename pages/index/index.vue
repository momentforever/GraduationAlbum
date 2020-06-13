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

			// function takeLongTime(){
			// 	return new Promise(resolve=>{
			// 		setTimeout(()=>resolve('longTimeValue'),10000);
			// 	});
			// }
			
			// let res=await takeLongTime();
			// console.log(res);
			// _this.text=res;
		
			// const queryAllBooks = function(){
			// 	return new Promise(function(resolve,reject){
			// 		uniCloud.callFunction({
			// 			name: 'queryAllBooks',
			// 			data: {
			// 				studentSchool: '1',
			// 				studentDepartment: '1',
			// 				studentClass: '1'
			// 			},
			// 			success:function(res){
			// 				resolve(res.result)
			// 			}
			// 		})
			// 	})
			// }
			
			// let allBooks = await queryAllBooks();
			
			// console.log("数据库中的信息=>");
			// console.log(allBooks);
			
			// console.log("第一个人的第一个信息=>");
			// console.log(allBooks[0].data[0]);
		}
	}
</script>

<style>

</style>
