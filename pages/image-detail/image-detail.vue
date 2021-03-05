<template>
	<view class="">
		<view class="" @touchmove.stop.prevent="a = false" @catchtouchmove="a = false">
			<view class="" style="">
				<u-image :src="oimage.url" style="height: 100vh;width: 100vw;display: flex;" @click="cssClick"></u-image>
			</view>
			<view class="bottom" :class="cssTran ? 'closeCss' : 'openCss'">
				<view class="nav-box">
					<view class="nav-tab" @click="backClick">
						<u-icon name="/static/icon/back.png" :size="44"></u-icon>
						<text>返回</text>
					</view>
					<view class="nav-tab" @click="winClick()">
						<u-icon name="/static/icon/duihuan.png" :size="42"></u-icon>
						<text>下载</text>
					</view>
					
					<!-- TODO 完善登录后再实现 -->
					<view class="nav-tab" @click="clickLike">
						<u-icon name="/static/icon/like_art-nobg.png" :size="42" v-if="likeStatus"></u-icon>
						<u-icon name="/static/icon/thumbs-up.png" :size="42" v-else></u-icon>
						<text>喜欢</text>
					</view>

				
					<button class="u-reset-button nav-tab" open-type="share">
						<u-icon name="/static/icon/shares.png" :size="44"></u-icon>
						<text>分享</text>
						
					</button>
					

				</view>
				<div class="rgba"></div>
			</view>
			<!-- <view v-if="tipsShow" style="position: absolute;top: 0;left: 0;width: 100vw;height: 100vh;z-index: 11;" @click="tipsClick">
				<image src="../../static/tips.png" style="width: 100%;height: 100%;display: flex;" mode="aspectFill"></image>
			</view> -->
		</view>
		<!-- <view class="loading_page" v-if="loadFlag"><image src="/static/loading/loading.gif"></image></view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadFlag: true,
				loginShow: false,
				cssTran: false,
				oimage: '',
				likeStatus:false,
				likeItParams:{
					picId:'',
					userId:''
				}
			};
		},
		async onLoad(option) {

			
			this.oimage = option
			//console.log(this.oimage.id)
			if(this.oimage.id!=undefined){
				//console.log(this.oimage.id)
				this.incrHot();
				//设置获取点赞状态的参数
				if(uni.getStorageSync('ssoInfo')){
					 let ssoInfo = uni.getStorageSync('ssoInfo')
					 //console.log('ssoinfo',ssoInfo)
					 this.likeItParams.userId=ssoInfo.id
					 this.likeItParams.picId=this.oimage.id
				}
			}
			this.getLikeStatus();


		},
		methods: {
			incrHot(){
				//console.log('picid',this.oimage.id)
				this.$u.api.incrPicHot(this.oimage.id).then(res=>{
					//console.log(res)
				})
			},
			//获得点赞状态
			getLikeStatus(){
				if(this.likeItParams.userId){
					this.$u.api.PicLikeStatus(this.likeItParams).then(res=>{
						this.likeStatus= res.data.result
						//console.log('this.likeStatus',this.likeStatus)
					})
				}

			},
			clickLike(){
				if(this.likeItParams.userId){
					this.likeStatus?this.likeStatus=false:this.likeStatus=true;
					if(this.likeStatus){
						this.$u.api.picLikeIt(this.likeItParams,1).then(res=>{
							//console.log(res)
							this.getLikeStatus()
						})
					}else{
						this.$u.api.picLikeIt(this.likeItParams,0).then(res=>{
							//console.log(res)
							this.getLikeStatus()
							
						})
					}
				}else{
					this.$u.toast('请登录后操作!')
				}
				
			},

			cssClick() {
				this.cssTran = !this.cssTran
			},
			backClick() {
				uni.navigateBack()
			},
			winClick() {
				var that = this
				const sys = uni.getSystemInfoSync()
				uni.showLoading({
					mask: true,
					title: '下载中...'
				})
				const downloadTask = uni.downloadFile({
					url: this.oimage.url,
					success: (res) => {
						var benUrl = res.tempFilePath
						//图片保存到本地相册
						wx.saveImageToPhotosAlbum({
							filePath: benUrl,
							//授权成功，保存图片
							success: function(data) {
								uni.showToast({
									icon: 'success',
									title: '已保存到相册'
								});
							},
							//授权失败
							fail: function(err) {
								if (err.errMsg) {
									//重新授权弹框确认
									wx.showModal({
										title: '提示',
										content: '无权限，请打开下载权限后再试！',
										showCancel: false,
										success(res) {
											if (res.confirm) {
												//重新授权弹框用户点击了确定
												wx.openSetting({
													//进入小程序授权设置页面
													success(settingdata) {
														console.log(settingdata);
														if (settingdata.authSetting['scope.writePhotosAlbum']) {
															//用户打开了保存图片授权开关
															wx.saveImageToPhotosAlbum({
																filePath: benUrl,
																success: function(data) {
																	wx.showToast({
																		title: '已保存到相册',
																		icon: 'success',
																		duration: 2000
																	});
																}
															});
														} else {
															//用户未打开保存图片到相册的授权开关
															wx.showModal({
																title: '温馨提示',
																content: '授权失败，请稍后重新获取',
																showCancel: false
															});
														}
													}
												});
											}
										}
									});
								}
								uni.hideLoading()
							}
						});
					},
					fail: (error) => {
						console.log(error)
					}
				})

				downloadTask.onProgressUpdate((res) => {
					// 进度展示
				});

				// var downs = that.vuex_down
				// if(downs.length === 0){
				// 	downs = []
				// 	var map = {
				// 		id: that.detail.id,
				// 		thumb: that.detail.thumb
				// 	}
				// 	downs.splice(0,0,map)
				// 	that.$u.vuex('vuex_down',downs)
				// }else{
				// 	var flag = false
				// 	for (var i = 0; i < downs.length; i++) {
				// 		if(downs[i].id == that.detail.id){
				// 			flag = true
				// 		}
				// 	}
				// 	if(!flag){
				// 		var map = {
				// 			id: that.detail.id,
				// 			thumb: that.detail.thumb
				// 		}
				// 		if(downs.length >= 12){
				// 			downs.splice(-1,1)
				// 		}
				// 		downs.splice(0,0,map)
				// 	}
				// 	that.$u.vuex('vuex_down',downs)
				// }
			},
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '好看的壁纸这里都有~',
				imageUrl: this.oimage.url,
				path: `/pages/image-detail/image-detail?url=${this.oimage.url}`
			};
		}
	};
</script>
<style lang="scss">
	.bottom {
		position: fixed;
		left: 4%;
		right: 0;
		width: 92%;
		height: 52px;
		box-shadow: 0 0px 8px rgba(0, 0, 0, 0.06);
		background: rgba(0, 0, 0, 0.94);
		border-radius: 49px;
		z-index: 10;
		opacity: 0.8;
	}

	.nav-tab {
		position: relative;
		width: 100%;
		height: 52px;
		font-size: 12px;
		color: #D8D8D8;
		font-weight: 400;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.nav-box {
		/* position: absolute; */
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		box-sizing: border-box;
	}

	.openCss {
		animation-name: openLinear;
		animation-duration: 0.8s;
		animation-iteration-count: 1;
		bottom: 40px;
	}

	@keyframes openLinear {
		0% {
			transform: translateY(92px);
		}

		100% {
			transform: translateY(0px);
		}
	}

	.closeCss {
		animation-name: closeLinear;
		animation-duration: 0.8s;
		animation-iteration-count: 1;
		bottom: -52px;
	}

	@keyframes closeLinear {
		0% {
			transform: translateY(-92px);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>
