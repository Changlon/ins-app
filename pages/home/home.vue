<template>

	<view class="wrap">
		<view class="vtop">
			<view class="title u-flex u-row-left u-p-l-40" :style="{marginTop: menuButtonInfo.top+'px'}">
				<text>无名壁纸</text>
				<u-icon class="u-p-l-15" name="/static/icon/share.png" size="40"></u-icon>
				<button open-type="share" style="position: absolute;top: 20rpx;left: 230rpx;width: 50rpx;height: 50rpx;opacity: 0;"></button>
			</view>
		</view>
		<view class="" :style="{marginTop: 'calc('+menuButtonInfo.top+'px + 68rpx + 24rpx)'}"></view>
		
			<u-swiper :effect3d="true" effect3d-previous-margin="40" bg-color="#FFFFFF" :list="mresList.lswiperList" name="imageUrl"
			 height="280rpx" border-radius="16" img-mode="widthFix" @click="swiperClick"></u-swiper>
		<view class="u-tabs-box">
			<u-sticky :offset-top="menuButtonInfo.top+ 68 + 24">
				<u-tabs-swiper ref="tabs" :list="title" :current="current" @change="change" :is-scroll="false" swiperWidth="750"
				 active-color="#F8D246;"></u-tabs-swiper>
			</u-sticky>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="height: 1850rpx;">
			<swiper-item class="swiper-item" v-for="(item,index) in title" :key="index">
				<u-row gutter="16">
					<u-col span="6" v-for="(item,ind) in ltabsList[index]" :key="ind">
						<navigator :url="'../album-detail/album-detail?album='+encodeURIComponent(JSON.stringify(item))">
							<view class="u-padding-bottom-16 tab">
								<u-image class="images" width="100%" height="600rpx" :src="item.cover" border-radius="16rpx"></u-image>
							</view>
						</navigator>


					</u-col>
				</u-row>
			</swiper-item>
		</swiper>
		<u-loadmore :status="nomore" />

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
				title: [{
					name: '最新'
				}, {
					name: '热门'
				}, {
					name: '人气',

				}],
				//首页查询结果集
				mresList: {
					//轮播图
					lswiperList: [],
					//lhotAlbumsList: []
				},
				ltabsList: [],

				menuButtonInfo: menuButtonInfo,


				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的

			}
		},
		created() {
			// this.getContent();
		},
		methods: {
			getContent() {
				this.$u.api.getHomeContent().then(res => {
					this.mresList.lswiperList = res.data.result.swipers
					this.ltabsList.push(res.data.result.newAlbums)
					this.ltabsList.push(res.data.result.hotAlbums)
					this.ltabsList.push(res.data.result.likeAlbums)

					//console.log('ltabsList',this.mresList.lswiperList)

				})

			},

			// tab栏切换
			change(index) {
				//console.log('changeIndex', index)
				this.swiperCurrent = index;

			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				//console.log('animationfinish', current)
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;

			},
			//点击轮播图
			swiperClick(index){
				//console.log('index',index)
				let res=this.mresList.lswiperList[index].imageUrl;
				
				uni.navigateTo({
					url:`../image-detail/image-detail?url=${res}`
				}) 
			}


		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		//height: 100%;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.vtop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		z-index: 999999;

		.title {
			position: relative;
			color: #303030;
			font-size: 24px;
			line-height: 80rpx;
		}

		.search {
			background: #F3F4F5;
			height: 68rpx;
			margin: 20rpx 40rpx 15rpx 40rpx;
			padding-left: 40rpx;
			border-radius: 50px;

			text {
				color: #a6a7a8;
				font-size: 14px;
			}
		}
	}

	.u-row {
		margin: 40rpx;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}

	.tab {
		position: relative;
		//height: 356rpx;
		border-radius: 32rpx;

		//margin-right: 15rpx;
		//margin-bottom: 7.5rpx;
		image {
			border-radius: 16rpx;
		}
	}


	.tags {
		font-size: 14px;
		background-color: #F5F6F8;
		color: #909399;
		border-radius: 40rpx;
		line-height: 60rpx;
		padding: 0 40rpx;
		margin-right: 20rpx;
	}

	.tag-active {
		background-image: linear-gradient(to right, #FCEF59, #F8D246);
		color: #333333;
		box-shadow: 0px 0px 10px #fff8ab;
		animation: tiaobig 0.8s ease-in-out alternate infinite;
		animation-iteration-count: 1;
	}
</style>
