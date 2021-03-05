<template>
	<view class="">
		<view class="tab wrap" style="padding: 0rpx;">
			<u-image width="100%" height="400rpx" :src="lactorRes.cover" mode="aspectFill"></u-image>
		</view>

		<view class="album-active u-flex ">
			<view class="u-flex-1" v-if="lactorRes.constellation">
				<view class="u-font-12 u-light-color u-margin-left-20 u-text-center">星座</view>
				<view class="u-font-12 u-main-color u-margin-left-20" style="color: #FFFFFF;border-radius: 12rpx;">{{lactorRes.constellation}}</view>
			</view>
			<view class="u-flex-1" v-if="lactorRes.size">
				<view class="u-font-12 u-light-color u-margin-left-20 u-text-center">三围</view>
				<view class="u-font-12 u-main-color u-margin-left-20" style="color: #FFFFFF;border-radius: 12rpx;">{{lactorRes.size}}</view>
			</view>
			<view class="u-flex-1" v-if="lactorRes.city">
				<view class="u-font-12 u-light-color u-margin-left-20 u-text-center">城市</view>
				<view class="u-font-12 u-main-color u-margin-left-20" style="color: #FFFFFF;border-radius: 12rpx;">{{lactorRes.city}}</view>
			</view>

		</view>


		<view class="u-flex avater">
			<u-avatar :src="lactorRes.avatar" size="large"></u-avatar>
			<view class="" v-if="lactorRes">
				<view class="u-font-19 u-main-color u-margin-left-20 u-padding-bottom-16" style="color: #FFFFFF;border-radius: 12rpx;" >{{lactorRes.name}}</view>
				<view class="u-font-15 u-main-color u-margin-left-20 u-padding-bottom-16" style="color: #FFFFFF;border-radius: 12rpx ;">
					{{lactorRes.occupation}}
				</view>
			</view>

		</view>

		<!-- <u-gap height="20" bg-color="#ffffff"></u-gap> -->
		<!-- 基本信息开始 -->
		<u-sticky @fixed="fixed" @unfixed="unfixed">
			<view class="wrap" style="padding: 16rpx 40rpx 16rpx 40rpx;" :class="bfixed?'info-tab-fixed':'info-tab'">

				<u-row gutter="16 " class="">

					<u-col span="6" class="u-font-19 u-main-color" style="color: #FFFFFF;border-radius: 12rpx ;" v-show="bfixed" v-if="lactorRes.name">{{lactorRes.name}}</u-col>

					<u-col span="6" v-show="bfixed">
						<view class="u-flex">
							<view class="u-flex-1" v-if="lactorRes.constellation">
								<view class="u-font-12 u-light-color u-margin-left-20 u-text-center">星座</view>
								<view class="u-font-12 u-main-color u-margin-left-20 u-text-center" style="color: #FFFFFF;border-radius: 12rpx;">{{lactorRes.constellation}}</view>
							</view>
							<view class="u-flex-1" v-if="lactorRes.size">
								<view class="u-font-12 u-light-color u-margin-left-20 u-text-center">三围</view>
								<view class="u-font-12 u-main-color u-margin-left-20 u-text-center" style="color: #FFFFFF;border-radius: 12rpx;">{{lactorRes.size}}</view>
							</view>
							<view class="u-flex-1" v-if="lactorRes.city">
								<view class="u-font-12 u-light-color u-margin-left-20 u-text-center">城市</view>
								<view class="u-font-12 u-main-color u-margin-left-20 u-text-center" style="color: #FFFFFF;border-radius: 12rpx;">{{lactorRes.city}}</view>
							</view>
						</view>
					</u-col>
				</u-row>
				<view class="u-flex u-margin-top-16" v-show="!bfixed" style="justify-content: flex-end; " >
					<view class="u-font-13 u-content-color" style="color: #FFFFFF;border-radius: 12rpx;" v-if="lactorRes.hobby">爱好：</view>
					<view class="u-font-13 u-content-color" style="color: #FFFFFF;border-radius: 12rpx;"> </view>
					
					<view class="u-font-13 u-main-color" style="color: #FFFFFF;border-radius: 12rpx ; " v-if="lactorRes.hobby">
						{{lactorRes.hobby}}
					</view>
				</view>


			</view>
		</u-sticky>
		<!-- 基本信息结束 -->
		<u-gap height="20" bg-color="#ffffff"></u-gap>

		<view v-for="(item,index) in lalbumInfo" :key="index">
			<u-row>
				<u-col span="2" class="">
					<view class="u-margin-top-10">
						<u-avatar class="" :src="lactorRes.avatar"></u-avatar>
					</view>

					<view class="u-tips-color u-text-center u-font-13">专辑</view>
				</u-col>
				<u-col span="10">

					<u-card :title="item.albumName" :sub-title="item.gmtCreate.split('T')[0]" margin="10rpx 30rpx 10rpx 0rpx">

						<view class="" slot="body">
							<navigator :url="'../album-detail/album-detail?album='+encodeURIComponent(JSON.stringify(item))">
								<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
									<image :src="item.cover" mode="aspectFill"></image>
								</view>
							</navigator>


						</view>
					</u-card>
				</u-col>
			</u-row>
			<u-gap height="20" bg-color="#F5D553" ></u-gap>
		</view>
		<u-loadmore :status="status" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				sactorId: null,
				lactorRes: [],
				bfixed: false,
				oparams: {

					current: 1,
					limit: 2,
					actorId: ''
				},
				lalbumInfo: [],
				status: 'loadmore'


			}
		},
		onLoad(option) {
			this.sactorId = option;
			this.oparams.actorId = option.actorId
			//console.log(this.sactorId)
			this.getActorInfo();
			this.getAlbumInfo();

		},
		methods: {
			//获取演员信息
			getActorInfo() {
				//console.log('albumInfo', this.albumInfo)
				this.$u.api.getActor(this.sactorId.actorId).then(res => {	
					//console.log('Actor', res)
						this.lactorRes = res.data.result
				})
			},
			//获取专辑信息
			getAlbumInfo() {
				this.$u.api.getPicByActor(this.oparams).then(res => {
					//console.log('PicByActor', res)
					if(res.data.result.length!=0){
						if(this.oparams.current==1){
							this.lalbumInfo=res.data.result
						}else{
							this.lalbumInfo=[...this.lalbumInfo,...res.data.result]
							console.log('lalbumInfo',this.lalbumInfo)
						}
						this.status='loadmore'
					}else{
						this.status='nomore'
					}

				})
			},

			fixed() {
				this.bfixed = true
			},
			unfixed() {
				this.bfixed = false
			},
			onReachBottom() {
				this.oparams.current+=1
				this.status = 'loading';
				this.getAlbumInfo();
				
			}


		},

	}
</script>

<style lang="scss" scoped>
	.wrap {

		padding: 40rpx;
		display: flex;
		flex-direction: column;
		//height: 100%;
		//height: calc(100vh - var(--window-top));
		width: 100%;
	}

	.avater {
		position: absolute;
		left: 10px;
		top: 170px;
	}

	,
	.album-active {
		position: absolute;
		right: 10px;
		top: 165px;
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

	.info-tab {
		background-image: linear-gradient(to right, #F5D553, #F0B347);

	}

	.info-tab-fixed {
		background-image: linear-gradient(to right, rgba(245, 213, 83, 0.5), rgba(240, 179, 71, 0.5));
	}
</style>
