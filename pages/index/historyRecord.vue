<template>
	<view>
		<view class="box1" height="100rpx" >检票记录</view>
		<u-divider text=""></u-divider>
		<uni-table class="table">
			<uni-tr>
				<uni-th>门票编码</uni-th>
				<uni-th>检票状态</uni-th>
				<uni-th>检票时间</uni-th>
			</uni-tr>
			<uni-tr v-for="index in code.length" >
				<uni-th>{{code[index-1].ticketCode}}</uni-th>
				<uni-th>{{code[index-1].ticketStatus}}</uni-th>
				<uni-th>{{code[index-1].useTime}}</uni-th>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
	import publicMethod from '../../common/publicMethod.js';
	import {
		postMenu,
		getMenu
	} from '@/config/api.js';
	export default {
		data() {
			return {
				message:[],
				code:[],
				
			}
		},
		methods: {
			async historyRecordUpdate () {
				let that = this
				
				// 更新门票状态信息
				uni.request({
					url: `https://6455b471.cpolar.cn/updateUseStatus`,
					method: 'POST', 
					header: {
					        'Content-Type': 'application/x-www-form-urlencoded'  
					    },  
					success: (res) => {
						console.log(res.data);
					}
				});
				// 获取所有门票信息
				await getMenu({ custom: { auth: true }}).then((res) => {
					console.log(res,'请求成功')
					that.message = res.data.data
					console.log(that.message)
					
				}).catch((res) =>{
					console.log(res,'请求失败')
				})
				// 处理历史记录数据
				for(let key in that.message) {
					let time;
					if(that.message[key].useTime){
						 time = publicMethod.getNowTime(that.message[key].useTime)
					}
					that.code.push({'ticketCode':key,'ticketStatus':that.message[key].useStatus,'useTime':time})
					//console.log(that.message[key].useStatus)
				}	//that.message[key].useTime?that.message[key].useTime:'未使用'
				console.log(that.code)
				
			}
		},
		async onLoad() {
			let that = this
			setInterval(function(){
				that.code = []
				that.historyRecordUpdate()
			}, 3000)
			
			
		},
	}
</script>

<style>
	.box1 {
		font-size: 60rpx;
	}
	.table {
		width: 100%;
	}
</style>
