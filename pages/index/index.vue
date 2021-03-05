<template>
	<view class="warp">
		<u-swiper :list="list" @click="swiperClickHandler"></u-swiper>
		<u-sticky>
			<!-- 只能有一个根元素 -->
			<u-section title="今日热门" sub-title="查看更多" color=#303133 font-size=40></u-section>
		</u-sticky>

	</view>  
</template> 

<script>
	export default {
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],

			}
		},
		onLoad() {

		},
		methods: {
			swiperClickHandler(index) {
				console.log(index)
			}

		}
	}
</script>

<style scoped lang="scss">
	.warp {
		background-color: $u-bg-color;
		min-height: 200vh;
	}

	.sticky {
		width: 750rpx;
		height: 120rpx;
		background-color: #2979ff;
		color: #fff;
		padding: 24rpx;
	}
</style>
