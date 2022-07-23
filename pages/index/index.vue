<template>
	<view class="content">

		<view class="box1" height="100rpx" bgColor="#3c7dfc">剧场检票系统</view>
		<view class="box2">
			<text class="text1">检票结果</text>
			<view class="box2_1">
				<u--image :src="this.iconSrc" width="256rpx" height="256rpx" class="img"></u--image>
				<view class="state">{{state}}</view>
			</view>
			<view class="box3">
				<text class="text2">类型: {{type}}</text>
				<text class="text3">使用期限: {{endTime.year + '年' + endTime.month + '月' + endTime.day + '日'}}</text>
				<text class="text4">入场时间: {{useTime}}</text>
			</view>

		</view>


		<view class="box4">
			<u-button @click="clickScan" class="scanButton" :plain="true" shape="circle">扫描二维码</u-button>
		</view>

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
				icon: {
					src1: '../../static/icon/success.png',
					src2: '../../static/icon/fail.png',
					src3: '../../static/icon/pending.png',
				},
				iconSrc: null,
				state: '待检',
				code: null,
				type: 'xxx',
				endTime: {
					year: 'xxxx',
					month: 'xx',
					day: 'xx',
				},
				useTime: 'xxxx年xx月xx日  xx:xx:xx',
			}
		},
		onLoad() {
			this.iconSrc = this.icon.src3
		},
		methods: {
			clickScan() {
				let that = this //uni.scanCode回调里面的this并不是页面最高对象,而是当前回调函数
				uni.scanCode({

					scanType: ['qrCode'], //扫描类型的合法值
					success: function(res) {
						that.$u.toast('检票成功')
						that.state = '成功'
						that.iconSrc = that.icon.src1
						onlyFromCamera: false,
							console.log('条码内容：' + res.result);
						// console.log('条码类型：' + res.scanType);
						// console.log('二维码字符集：' + res.charSet);
						that.code = res.result
						//获取门票截止日期
						that.endTime.year = that.code.slice(3, 7)
						that.endTime.month = that.code.slice(7, 9)
						that.endTime.day = that.code.slice(9, 11)
						console.log(that.endTime.year, that.endTime.month, that.endTime.day)
						/* //将门票信息存入本地
						uni.setStorageSync('code1', that.code);
						const value = uni.getStorageSync('code1');
						if (value) {
							console.log(value);
						} */

						//处理门票截止日期
						let typeCode = that.code.slice(15, 16)
						switch (true) {
							case typeCode === '1':
								that.type = '成人票';
								break;
							case typeCode === '2':
								that.type = '儿童票';
								break;
							case typeCode === '3':
								that.type = '团体票';
								break;
							case typeCode === '4':
								that.type = '赠送票';
								break;
							default:
								that.$u.toast('无效门票')
						}

						//获取入场时间（当前日期）
						that.useTime = publicMethod.getNowDate()
						console.log(that.useTime)

						//请求接口
						uni.request({
							url: `https://6d058e45.cpolar.cn/isUsed?code=${that.code}`,
							method: 'POST',
							header: {  
							        'Content-Type': 'application/x-www-form-urlencoded'  
							    },  
							success: (res) => {
								console.log(res.data);
								console.log(that.code)
							}
						});
						getMenu({ custom: { auth: true }}).then((res) => {
							console.log(res,'请求成功')
						}).catch((res) =>{
							console.log(res,'请求失败')
						})
						// postMenu({'code':that.code},{ custom: { auth: true }}).then((res)=>{
						// 	console.log(res,'请求成功')
						// }).catch((res)=>{
						// 	console.log(res,'请求失败')
						// })

					},
					fail: function(res) {
						that.iconSrc = that.icon.src2
						that.state = '失败'
						console.log('扫码失败或取消扫码')
					},
					/* complete: function (res) {
						console.log(that.code)
					} */
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;

	}

	.box1 {
		display: flex;
		height: 100rpx;
		background-color: #3c7dfc;
		color: #ffffff;
		font-size: 60rpx;
		text-align: center;
		writing-mode: vertical-lr;
	}

	.box2 {
		display: flex;
		flex-direction: column;
		height: 800rpx;

		.text1 {
			font-size: 60rpx;
			font-weight: 600;
			margin: 10rpx 0rpx 0rpx 10rpx;
		}

		.box2_1 {
			height: auto;
			margin: 40rpx 32% 40rpx 32%;
			display: flex;
			flex-direction: column;

			.img {
				vertical-align: middle;
			}

			.state {
				width: 100%;
				font-size: 60rpx;
				text-align: center;
			}
		}

		.text2 {
			font-size: 40rpx;
			color: #838383;
			margin: 30rpx 0rpx 0rpx 30rpx;
		}

		.text3 {
			font-size: 40rpx;
			color: #838383;
			margin: 30rpx 0rpx 0rpx 30rpx;
		}

		.text4 {
			font-size: 40rpx;
			color: #838383;
			margin: 30rpx 0rpx 0rpx 30rpx;
		}
	}

	.box3 {
		display: flex;
		flex-direction: column;
		height: auto;
		color: #838383;
	}

	.box4 {
		display: flex;
		color: #838383;
	}

	.scanButton {
		width: 80%;
		margin-top: 50rpx;
		font-size: 50rpx;
		font-weight: 600;
	}
</style>
