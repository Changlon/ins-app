<template>
	<view class="wrap">
		<view class="vtop">
			<view class="title u-flex u-row-left u-p-l-40" :style="{marginTop: menuButtonInfo.top+'px'}">
				<text>无名壁纸</text>
				<u-icon class="u-p-l-15" name="/static/icon/share.png" size="40"></u-icon>
				<button open-type="share" style="position: absolute;top: 20rpx;left: 230rpx;width: 50rpx;height: 50rpx;opacity: 0;"></button>
			</view>
		</view>
		<view class="" :style="{marginTop: 'calc('+menuButtonInfo.top+'px + 24rpx)'}"></view>

		<view class="u-tabs-box">
			<u-sticky :offset-top="menuButtonInfo.top+ 68 + 24">
				<u-tabs-swiper ref="tabs" :list="title" :current="current" @change="change" :is-scroll="false" swiperWidth="750"
				 name="tag" active-color="#F8D246;"></u-tabs-swiper>
			</u-sticky>
		</view>
		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="height: 1850rpx;">
			<swiper-item class="swiper-item" v-for="(item,index) in title" :key="index">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<view class="page-box">
						<u-row gutter="16">
							<u-col span="4" v-for="(item,ind) in lAlbumRes[index]" :key="ind">
								<navigator :url="'../album-detail/album-detail?album='+encodeURIComponent(JSON.stringify(item))">
									<view class="u-padding-bottom-16 tab">
										<u-image class="images" width="100%" height="600rpx" :src="item.cover" border-radius="16rpx"></u-image>
									</view>
								</navigator>
							</u-col>
						</u-row>

					</view>
					<u-loadmore :status="loadStatus[0]"></u-loadmore>
				</scroll-view>
			</swiper-item>
		</swiper>

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


				title: [{
						id: -3,
						tag: '最新'
					},
					{
						id: -2,
						tag: '热门'
					},
					{
						id: -1,
						tag: '人气'
					}
				],
				currentPage: {

				},
				lAlbumRes: [],
				loadStatus: ['loadmore', 'loadmore', 'loadmore'],
				oparams: {
					limit: 9,
					tagId: ''
				},

				tabsHeight: 0,
				dx: 0,
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的

			}
		},
		async onLoad() {
			await this.getAll()
			await this.getAlbumInfo(0);

			//this.getNew(0)
		},
		methods: {
			//获取所有标签
			getAll() {
				this.$u.api.getAllTag().then(res => {
					//console.log(res)
					this.title = [...this.title, ...res.data.result]
					console.log('title', this.title)
				})
			},

			//根据标签id获取专辑
			getAlbumInfo(index) {
				switch (index) {
					case 0:
						this.getNew(index);
						break;
					case 1:
						this.getHot(index);
						break;
					case 2:
						this.getLike(index);
						break;
					default:
						this.getOther(index);
				}




			},
			getNew(index) {
				if (this.currentPage[index] == undefined) {
					this.currentPage[index] = 1
				}
				//console.log('new的currentPage', this.currentPage)
				//console.log('最新当前页', this.currentPage[index])
				this.$u.api.getAlbumWithNew(this.currentPage[index], this.oparams).then(res => {
					if (res.data.result.length != 0) {
						if (this.lAlbumRes[index]) {
							this.$set(this.lAlbumRes, index, [...this.lAlbumRes[index], ...res.data.result])
						} else {
							this.$set(this.lAlbumRes, index, res.data.result)
						}
						//页数加一
						this.currentPage[index] += 1
						this.loadStatus.splice(this.current, 1, "loadmore")
						//console.log(this.lAlbumRes[index])
					} else {
						this.loadStatus.splice(this.current, 1, "nomore")
					}

				})
			},
			getHot(index) {
				if (this.currentPage[index] == undefined) {
					this.currentPage[index] = 1
				}
				//console.log('hot的currentPage', this.currentPage[index])
				//console.log('热门当前页', this.currentPage[index])
				this.$u.api.getAlbumWithHot(this.currentPage[index], this.oparams).then(res => {
					if (res.data.result.length != 0) {
						if (this.lAlbumRes[index]) {
							this.$set(this.lAlbumRes, index, [...this.lAlbumRes[index], ...res.data.result])
						} else {
							this.$set(this.lAlbumRes, index, res.data.result)
						}
						//页数加一
						this.currentPage[index] += 1
						this.loadStatus.splice(this.current, 1, "loadmore")
						//console.log(this.lAlbumRes[index])
					} else {
						this.loadStatus.splice(this.current, 1, "nomore")
					}

				})
			},
			getLike(index) {
				if (this.currentPage[index] == undefined) {
					this.currentPage[index] = 1
				}
				//console.log('hot的currentPage', this.currentPage[index])
				//console.log('热门当前页', this.currentPage[index])
				this.$u.api.getAlbumWithLike(this.currentPage[index], this.oparams).then(res => {
					if (res.data.result.length != 0) {
						if (this.lAlbumRes[index]) {
							this.$set(this.lAlbumRes, index, [...this.lAlbumRes[index], ...res.data.result])
						} else {
							this.$set(this.lAlbumRes, index, res.data.result)
						}
						//页数加一
						this.currentPage[index] += 1
						this.loadStatus.splice(this.current, 1, "loadmore")
						//console.log(this.lAlbumRes[index])
					} else {
						this.loadStatus.splice(this.current, 1, "nomore")
					}

				})
			},
			getOther(index) {
				if (this.currentPage[index] == undefined) {
					this.currentPage[index] = 1
				}
				console.log('Other的currentPage', this.currentPage[index])
				console.log('热门当前页', this.currentPage[index])
				this.oparams.tagId=this.title[index].id
				console.log('当前tagId',this.oparams.tagId)
				this.$u.api.getAlbumByTag(this.currentPage[index], this.oparams).then(res => {
					if (res.data.result.length != 0) {
						if (this.lAlbumRes[index]) {
							this.$set(this.lAlbumRes, index, [...this.lAlbumRes[index], ...res.data.result])
						} else {
							this.$set(this.lAlbumRes, index, res.data.result)
						}
						//页数加一
						this.currentPage[index] += 1
						this.loadStatus.splice(this.current, 1, "loadmore")
						console.log('otherlAlbumRes',this.lAlbumRes[index])
					} else {
						this.loadStatus.splice(this.current, 1, "nomore")
					}
				
				})

			},
			reachBottom() {
				console.log('触发了上滑')

				this.loadStatus.splice(this.current, 1, "loading")

				this.getAlbumInfo(this.current);


			},
			// tab栏切换
			change(index) {
				console.log('changeIndex', index)
				this.swiperCurrent = index;
				this.getAlbumInfo(index);
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
				console.log('animationfinish', current)
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				this.getAlbumInfo(current);

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
</style>
