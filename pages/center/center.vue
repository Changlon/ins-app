<template>
	<view class="">
		<view class="vtop">
			<view class="title u-flex u-row-left u-p-l-40" :style="{marginTop: menuButtonInfo.top+'px'}">
				<text>无名壁纸</text>
				<u-icon class="u-p-l-15" name="/static/icon/share.png" size="40"></u-icon>
				<button open-type="share" style="position: absolute;top: 20rpx;left: 230rpx;width: 50rpx;height: 50rpx;opacity: 0;"></button>
			</view>
		</view>
		
		<view class="" :style="{marginTop: 'calc('+menuButtonInfo.top+'px + 68rpx + 24rpx)'}"></view>
		<view class="u-flex u-row-between u-col-center u-p-r-40">
			<view class="user u-p-l-40 u-p-r-40 u-flex u-row-left u-col-center">
				<button class="u-reset-button" open-type="getUserInfo" @getuserinfo="goLogin">
					<image class="logo-img" :src="login ? uerInfo.avatarUrl :avatarUrl"></image>
				</button>
				<!-- <open-data class="avatar" type="userAvatarUrl"></open-data> -->
				<view class="u-p-l-20">
					<!-- <open-data class="name u-font-18" type="userNickName"></open-data> -->
					<view class="logo-title name u-font-18">
						<text class="uer-name">Hi，{{login ? uerInfo.nickName : '您未登录'}}</text>
					
					</view>
					<view class="addr u-light-color u-p-t-10 u-font-12">必须要有好看的壁纸~</view>
				</view>
			</view>
		</view>
<!-- 		<view class="jifen u-flex u-row-left u-p-l-30 u-p-r-30 u-m-t-50">
			<view class="tab u-flex-col u-row-center u-col-center u-p-t-40 u-p-b-40 border-box" hover-class="hover-class" hover-stay-time="50">
				<view class="icon u-flex u-row-center u-col-center">
					<u-icon name="/static/icon/user1.png" size="46"></u-icon>
				</view>
				<view class="title u-main-color u-p-t-10 u-font-12">邀请好友</view>
				<view class="cont u-light-color u-p-t-10 u-font-12">好用就要分享</view>
				<button open-type="share" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;"></button>
			</view>
			<view class="tab u-flex-col u-row-center u-col-center u-p-t-40 u-p-b-40 border-box" hover-class="hover-class" hover-stay-time="50" @click="yanClick">
				<view class="icon u-flex u-row-center u-col-center" :class="isSign?'icons':''">
					<u-icon name="/static/icon/user2.png" size="46"></u-icon>
				</view>
				<view class="title u-main-color u-p-t-10 u-font-12">每日一言</view>
				<view class="cont u-light-color u-p-t-10 u-font-12">一言道出心声</view>
			</view>
			<view class="tab u-flex-col u-row-center u-col-center u-p-t-40 u-p-b-40 border-box" hover-class="hover-class" hover-stay-time="50" @click="redClick">
				<view class="icon u-flex u-row-center u-col-center">
					<u-icon name="/static/icon/user3.png" size="46"></u-icon>
				</view>
				<view class="title u-main-color u-p-t-10 u-font-12">红包封面</view>
				<view class="cont u-light-color u-p-t-10 u-font-12">发红包有牌面</view>
			</view>
		</view> -->
<!-- 		<view class="menu u-m-l-40 u-m-r-40 u-m-t-40 border-box">
			<view class="u-flex u-row-between u-p-30" hover-class="hover-class1" hover-stay-time="50" @click="contactClick">
				<view class="u-flex u-row-left">
					<image src="/static/icon/shoucang.png"></image>
					<view class="u-p-l-20">制作同款</view>
				</view>
				<view class="u-flex u-row-right">
					<view class="u-light-color u-font-12 u-p-r-10">小程序</view>
					<view class="arror-right"></view>
				</view>
			</view>
			<view class="u-flex u-row-between u-p-30 border-bottom" hover-class="hover-class1" hover-stay-time="50" @click="collectClick(1)">
				<view class="u-flex u-row-left">
					<image src="/static/icon/dingdan.png"></image>
					<view class="u-p-l-20">我的下载</view>
				</view>
				<view class="u-flex u-row-right">
					<view class="arror-right"></view>
				</view>
			</view>
		</view> -->
		<!-- <view class="menu u-m-l-40 u-m-r-40 u-m-t-40 border-box">
			<view class="u-flex u-row-between u-p-30 border-bottom" hover-class="hover-class1" hover-stay-time="50" @click="collectClick">
				<view class="u-flex u-row-left">
					<image src="/static/icon/shoucang.png"></image>
					<view class="u-p-l-20">我的收藏</view>
				</view>
				<view class="u-flex u-row-right">
					<view class="arror-right"></view>
				</view>
			</view>
			<view class="u-flex u-row-between u-p-30 border-bottom" hover-class="hover-class1" hover-stay-time="50" @click="orderClick">
				<view class="u-flex u-row-left">
					<image src="/static/icon/dingdan.png"></image>
					<view class="u-p-l-20">我的兑换</view>
				</view>
				<view class="u-flex u-row-right">
					<view class="arror-right"></view>
				</view>
			</view>
			<view class="u-flex u-row-between u-p-30" hover-class="hover-class1" hover-stay-time="50" @click="writeClick">
				<view class="u-flex u-row-left">
					<image src="/static/icon/fabu.png"></image>
					<view class="u-p-l-20">我的投稿</view>
				</view>
				<view class="u-flex u-row-right">
					<view class="u-light-color u-font-12 u-p-r-10">投稿赚积分</view>
					<view class="arror-right"></view>
				</view>
			</view>
		</view> -->
		<view class="menu u-m-l-40 u-m-r-40 u-m-t-40 border-box">
<!-- 			<view class="u-flex u-row-between u-p-30 border-bottom" hover-class="hover-class1" hover-stay-time="50" @click="collectClick(2)">
				<view class="u-flex u-row-left">
					<image src="/static/icon/yuyue.png"></image>
					<view class="u-p-l-20">最近浏览</view>
				</view>
				<view class="u-flex u-row-right">
					<view class="arror-right"></view>
				</view>
			</view> -->
			<view class="u-flex u-row-between u-p-30 border-bottom" hover-class="hover-class1" hover-stay-time="50">
				<view class="u-flex u-row-left">
					<image src="/static/icon/kefu.png"></image>
					<view class="u-p-l-20">联系客服</view>
				</view>
				<view class="u-flex u-row-right">
					<view class="arror-right"></view>
				</view>
				<button open-type="contact" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;"></button>
			</view>
<!-- 			<view class="u-flex u-row-between u-p-30 border-bottom" hover-class="hover-class1" hover-stay-time="50" @click="exitClick">
				<view class="u-flex u-row-left">
					<image src="/static/icon/qingchu.png"></image>
					<view class="u-p-l-20">清理缓存</view>
				</view>
				<view class="u-flex u-row-right">
					<view class="u-light-color u-font-12 u-p-r-10">{{currentSize}}kb</view>
					<view class="arror-right"></view>
				</view>
			</view> -->
			<view class="u-flex u-row-between u-p-30" hover-class="hover-class1" hover-stay-time="50" @click="aboutClick">
				<view class="u-flex u-row-left">
					<image src="/static/icon/guanyu.png"></image>
					<view class="u-p-l-20">关于我们</view>
				</view>
				<view class="u-flex u-row-right">
					<view class="arror-right"></view>
				</view>
			</view>
		</view>
		<view class="" style="height: 180rpx;"></view>
		
		<u-popup v-model="modelShow" mode="center" border-radius="16" width="80%" closeable="true" close-icon-size="24" close-icon-color="#B8B8B8">
			<view class="u-p-l-30 u-p-r-30">
				<view class="u-p-t-25 u-p-b-25 u-text-center">每日一言</view>
				<view class="u-p-b-30 u-font-12 u-tips-color">
					<u-alert-tips type="warning" :description="modelTitle"></u-alert-tips>
				</view>
			</view>
		</u-popup>
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
				modelShow: false,
				modelTitle: '',
				menuButtonInfo: menuButtonInfo,
				
				login: false,
				avatarUrl: '../../static/icon/logo.png',
				uerInfo: {}
			}
		},
		props: ['currentSize'], 
		methods: {
			collectClick(type){
				uni.navigateTo({
					url: '/pages/collect/collect?type='+type
				})
			},
			goLogin(info) {
				//console.log('infoDetail',info.detail)
			
				if (info.detail['userInfo']) {
					this.login = true
					this.uerInfo = info.detail.userInfo
					//存储到本地
					uni.setStorage({
						key: 'userInfo',
						data: this.uerInfo
					})
				}
			
				uni.login({
					provider: 'weixin',
					success:(loginRes)=> {
						console.log('loginRes.code',loginRes.code);
						this.$u.api.wxMiniProLogin(loginRes.code).then(res=>{
							uni.setStorage({
								key:'token',
								data:res.data
							})
							console.log(res)
						})
					}
				});
				this.$u.api.ssoInfo().then(res=>{
					//自己后台返回的用户信息
					uni.setStorage({
						key: 'ssoInfo',
						data: res.data
					})
					console.log(res)
				})
				
			},

			aboutClick(){
				uni.navigateTo({
					url: '/pages/about/about'
				})
			},
		}
	}
</script>

<style lang="scss">
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
	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}
	.user{
		.avatar{
			width: 116rpx;
			height: 116rpx;
			border-radius: 116rpx;
			overflow: hidden;
		}
		.name{
			font-size: 20px;
			font-weight: 500;
		}
	}
	.jifen{
		.tab{
			position: relative;
			background-color: #FFFFFF;
			width: 234rpx;
			margin-right: 10rpx;
			margin-left: 10rpx;
			.title{
				font-weight: 550;
			}
			.icon{
				width: 80rpx;
				height: 80rpx;
				border-radius: 80rpx;
			}
		}
		.tab:nth-child(1) .icon{
			background-image: linear-gradient(to right, #84D787 , #5FBB92);
		}
		.tab:nth-child(2) .icon{
			background-image: linear-gradient(to right, #F5D553 , #F0B347);
		}
		.tab:nth-child(2) .icons{
			background-image: linear-gradient(to right, #dadada , #dadada);
		}
		.tab:nth-child(3) .icon{
			background-image: linear-gradient(to right, #ee6c6c , #f0513c);
		}
	}
	.border-box{
		box-shadow: 0 0px 24px rgba(231, 231, 231, 0.65);
		border-radius: 16rpx;
	}
	.menu{
		image{
			width: 38rpx;
			height: 38rpx;
		}
	}
	.border-bottom{
		border-bottom: 1rpx solid #F6F6F6;
		position: relative;
	}
	.hover-class{
		transform:scale(0.95);
		transition: all 0.2s;
	}
	.hover-class1{
		background-color: #F8F8F8;
	}
	.arror-right{
		width: 15rpx;
		height: 15rpx;
		border-top: 3rpx solid #a9acb3;
		border-right: 3rpx solid #a9acb3;
		transform: rotate(45deg);
	}
</style>
