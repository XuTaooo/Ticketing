<template>
	<view>
		<view class="box1" height="100rpx" >检票记录</view>
		<u-divider text=""></u-divider>
		<uni-table>
			<uni-tr>
				<uni-th>门票编码</uni-th>
				<uni-th>检票状态</uni-th>
				<uni-th>检票时间</uni-th>
			</uni-tr>
			<uni-tr v-for="index in message.length" >
				<uni-th>{{message[index-1].ticketCode}}</uni-th>
				<uni-th>{{message[index-1].ticketState}}</uni-th>
				<uni-th>{{message[index-1].useTime}}</uni-th>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message:[{
					ticketCode:'1',
					ticketState:'2',
					useTime:'3',
				},{
					ticketCode:'4',
					ticketState:'5',
					useTime:'6',
				},{
					ticketCode:'7',
					ticketState:'8',
					useTime:'9',
				}
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.box1 {
		font-size: 60rpx;
	}
</style>
