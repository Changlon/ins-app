<template>
	<view>
		<view class="vtop">
			<view class="title u-flex u-row-left u-p-l-40" :style="{marginTop: menuButtonInfo.top+'px'}">
				<text>无名壁纸</text>
				<u-icon class="u-p-l-15" name="/static/icon/share.png" size="40"></u-icon>
				<button open-type="share" style="position: absolute;top: 20rpx;left: 230rpx;width: 50rpx;height: 50rpx;opacity: 0;"></button>
			</view>
		</view>
		<view class="" :style="{marginTop: 'calc('+menuButtonInfo.top+'px + 68rpx + 24rpx)'}"></view>
	</view>
		
	
</template>

<script>
	// 获取系统状态栏的高度
	let menuButtonInfo = {};
	// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
	// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
	menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	// #endif
	export default {
		data() {
			return {
				menuButtonInfo: menuButtonInfo,
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.vtop{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(100vh - var(--window-top));
		background-color: #FFFFFF;
		z-index: 999999;
		.title{
			position: relative;
			color: #303030;
			font-size: 24px;
			line-height: 80rpx;
		}
		.search{
			background: #F3F4F5;
			height: 68rpx;
			margin: 20rpx 40rpx 15rpx 40rpx;
			padding-left: 40rpx;
			border-radius: 50px;
			text{
				color: #a6a7a8;
				font-size: 14px;
			}
		}
	}

</style>
