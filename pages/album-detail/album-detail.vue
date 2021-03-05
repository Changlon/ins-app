<template>
	<view class="">
		<view class="tab wrap" style="padding: 0rpx;">
			<u-image width="100%" height="400rpx" :src="albumInfo.cover" mode="aspectFill"></u-image>
		</view>
		
		<view class="album-active u-flex ">
			<view class="u-flex-1" @click="clickLike">
				<u-icon name="heart-fill" color="#F0B347" size="40rpx" :label="albumInfo.likeIt" label-size="20rpx" label-pos="bottom"
				label-color="#F0B347"  v-if="likeIt"></u-icon>
				<u-icon name="heart" color="#ffffff" size="38rpx" :label="albumInfo.likeIt" label-size="20rpx" label-pos="bottom"
				 label-color="#ffffff" v-else></u-icon>

			</view>
			<view class="u-flex-1 u-margin-left-40" >
				<u-icon name="eye" color="#ffffff" size="40rpx" :label="halbumActive.hot" label-size="20rpx" label-pos="bottom"
				 label-color="#ffffff" ></u-icon>

			</view>

		</view>
		
		
		<view class="u-flex avater">
			<navigator :url="`../actor-detail/actor-detail?actorId=${albumInfo.actorId}`">
				<u-avatar :src="albumInfo.cover" size="large" mode="square"></u-avatar>
			</navigator>
			
			<view class="" >
				<view class="u-font-19 u-main-color u-margin-left-20 u-padding-bottom-16" style="color: #FFFFFF;border-radius: 12rpx;">{{albumInfo.albumName}}</view>
				<view class="u-font-15 u-main-color u-margin-left-20 u-padding-bottom-16" style="color: #FFFFFF;border-radius: 12rpx ;">
					专辑
				</view>
			</view>
			
		</view>
		
		<!-- <u-gap height="20" bg-color="#ffffff"></u-gap> -->
		<!-- 基本信息开始 -->
		<u-sticky @fixed="fixed" @unfixed="unfixed">
			<view class="wrap" style="padding: 16rpx 40rpx 16rpx 40rpx;" :class="bfixed?'info-tab-fixed':'info-tab'">

				<u-row gutter="16 " class="">

					<u-col span="6" class="u-font-19 u-main-color" style="color: #FFFFFF;border-radius: 12rpx ;" v-show="bfixed">{{albumInfo.albumName}}</u-col>

					<u-col span="6" v-show="bfixed">
						<view class="u-flex">
							<view class="u-flex-1">
								<u-icon name="eye" color="#ffffff" size="40rpx" :label="halbumActive.hot" label-size="20rpx" label-pos="bottom"
								 label-color="#ffffff"></u-icon>
							</view>
							<view class="u-flex-1">
								<u-icon name="heart" color="#ffffff" size="38rpx" :label="albumInfo.likeIt" label-size="20rpx" label-pos="bottom"
								 label-color="#ffffff" hover-class=""></u-icon>
							</view>
						</view>
					</u-col>
				</u-row>

				<view class="u-flex u-margin-top-16" v-show="!bfixed" style="justify-content: flex-end;">
					<view class="u-font-13 u-content-color" style="color: #FFFFFF;border-radius: 12rpx;">标签：</view>
					<view class="" v-for="(item,index) in albumInfo.wallpaperTags" :key="index">
						<u-tag class="u-col-center u-row-center" :text="item.tag" :type="tagColor[this.$u.random(1, 3)]" mode="light"
						 shape="circle" />
					</view>
				</view>

			</view>
			</u-sticky>
				<!-- 基本信息结束 -->
				
				<u-gap height="20" bg-color="#ffffff"></u-gap>
				<u-row gutter="16 " class="">
					<u-col span="4" v-for="(item,index) in lpicRes" :key="index">
						<navigator :url="`../image-detail/image-detail?url=${item.picUrl}&id=${item.id}`">
							<view class="u-padding-bottom-16 tab">
								<u-image height="500rpx" :src="item.picUrl" border-radius="16rpx"></u-image>
							</view>
						</navigator>

					</u-col>
				</u-row>
				<u-loadmore :status="nomore" />


	</view>
</template>

<script>
	export default {
		data() {
			return {
				albumInfo: null,
				lpicRes: [],
				tagColor: [
					'primary',
					'success',
					'warning',
					'error'
				],
				halbumActive: {},
				preImageUrls: [],
				bfixed:false,
				likeIt:false,
				//发送点赞需要的数据
				likeItParams:{
					albumId:'',
					userId:''
					
				}
			}
		},
		onLoad(option) {
			this.albumInfo = JSON.parse(decodeURIComponent(option.album));
			this.likeItParams.albumId=this.albumInfo.id
			this.getUserInfo();
			this.getPic();
			this.getActive();
			this.getLikes();
			this.getLikeStatus();

		},
		methods: {
			//获取专辑下的图片
			getPic() {
				//console.log('albumInfo', this.albumInfo)
				this.$u.api.getAlbumPic(this.albumInfo.id).then(res => {
					//console.log('res', res)
					this.lpicRes = res.data.result
				})
			},
			getUserInfo(){
				
				if(uni.getStorageSync('ssoInfo')){
					 let ssoInfo = uni.getStorageSync('ssoInfo')
					 //console.log('ssoinfo',ssoInfo)
					 this.likeItParams.userId=ssoInfo.id
				}
			},
			//获取专辑的活跃信息
			getActive() {
				this.$u.api.getAlbumActive(this.albumInfo.id).then(res => {
					//console.log('AlbumActive', res)
					this.halbumActive = res.data.result
				})
			},
			//获取专辑点赞总数
			getLikes() {
				//console.log('albumInfo', this.albumInfo.id)
				this.$u.api.getAlbumLikes(this.albumInfo.id).then(res => {
					this.albumInfo.likeIt=res.data.result
					console.log('AlbumLikes', this.albumInfo.likeIt)
				})
			},
			//获得此用户对此专辑的点赞状态
			getLikeStatus(){
				if(this.likeItParams.userId){
					this.$u.api.LikeStatus(this.likeItParams).then(res=>{
						this.likeIt =res.data.result
					})
				}

			},
			fixed(){
				this.bfixed=true
			},
			unfixed(){
				this.bfixed=false
			},
			clickLike(){
				if(this.likeItParams.userId){
					this.likeIt?this.likeIt=false:this.likeIt=true;
					if(this.likeIt){
						this.$u.api.LikeIt(this.likeItParams,1).then(res=>{
							console.log(res)
							this.getLikes()
							this.getLikeStatus()
						})
					}else{
						this.$u.api.LikeIt(this.likeItParams,0).then(res=>{
							console.log(res)
							this.getLikes()
							this.getLikeStatus()
						})
					}
				}else{
					this.$u.toast('请登录后操作!')
				}
				

				console.log('触发了clickLike',this.likeIt)
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
	.avater{
		position: absolute;
		  left: 10px;
		  top: 170px;
	},
	.album-active{
		position: absolute;
		  right: 10px;
		  top: 160px;
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
	.info-tab-fixed{
		background-image: linear-gradient(to right, rgba(245,213,83,0.5), rgba(240,179,71,0.5));
	}
</style>
