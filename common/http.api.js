// /common/http.api.js


// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	//获取首页数据
	let getHomeContent=(params) =>vm.$u.get('/wallpaper-portal/wp/home/content');
//=========================================================================================================
	//category页面数据
	//分页获取最新专辑
	let getAlbumWithNew=(current,params)=>vm.$u.get(`/wallpaper-portal/wp/category/albums/${current}/${params.limit}/new`)
	//分页获取热门专辑
	let getAlbumWithHot=(current,params)=>vm.$u.get(`/wallpaper-portal/wp/category/albums/${current}/${params.limit}/hot`)
	//分页获取人气专辑
	let getAlbumWithLike=(current,params)=>vm.$u.get(`/wallpaper-portal/wp/category/albums/${current}/${params.limit}/like`)
	//根据标签获取专辑
	let getAlbumByTag=(current,params)=>vm.$u.get(`/wallpaper-portal/wp/album/albums/${current}/${params.limit}/${params.tagId}`)
//=========================================================================================================
	//获取专辑图片
	let getAlbumPic=(params)=>vm.$u.get(`/wallpaper-portal/wp/album/album/${params}`);
	//获取专辑活跃数据
	let getAlbumActive=(params)=>vm.$u.get(`/wallpaper-portal/wp/album/album/statis/${params}`)
	//获取专辑点赞数
	let getAlbumLikes=(params)=>vm.$u.get(`/wallpaper-portal/wp/album/likes/${params}`)
	//专辑点赞/取消点赞
	let LikeIt=(params,value)=>vm.$u.post(`/wallpaper-portal/wp/album/like/${params.albumId}/${params.userId}/${value}`)
	//获得专辑点赞状态
	let LikeStatus=(params)=>vm.$u.get(`/wallpaper-portal/wp/album/likestatus/${params.albumId}/${params.userId}`)
	//根据演员获取专辑
	let getPicByActor=(params)=>vm.$u.get(`/wallpaper-portal/wp/album/albums/${params.current}/${params.limit}/${params.actorId}/actor`)
//=========================================================================================================
	//增加专辑图片热度
	let incrPicHot=(params)=>vm.$u.post(`/wallpaper-portal/wp/albumpic/statis/${params}`)
	//获取专辑图片点赞数
	let getAlbumPicLikes=(picId)=>vm.$u.get(`/wallpaper-portal/wp/albumpic/likes/${picId}`)
	//获取点赞状态
	let PicLikeStatus=(params)=>vm.$u.get(`/wallpaper-portal/wp/albumpic/likestatus/${params.picId}/${params.userId}`)
	//图片点赞/取消点赞
	let picLikeIt=(params,value)=>vm.$u.post(`/wallpaper-portal/wp/albumpic/like/${params.picId}/${params.userId}/${value}`)

//=========================================================================================================
	//获取演员基本信息
	let getActor=(actorId)=>vm.$u.get(`/wallpaper-portal/wp/actor/actors/${actorId}`)
//=========================================================================================================
	//获取所有标签
	let getAllTag=()=>vm.$u.get(`/wallpaper-portal/wp/category/tags`);
//==========================================================================================================
	//小程序登录
	let wxMiniProLogin=(code)=>vm.$u.get(`/mall-portal/sso/wxprogram/login/${code}`)
	//获取自己后他的用户信息
	let ssoInfo=()=>vm.$u.get(`/mall-portal/sso/info`)
	

	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {getHomeContent,getAlbumPic,getAlbumActive,
					getAlbumLikes,incrPicHot,getActor,getPicByActor,getAllTag,
					getAlbumWithNew,getAlbumWithHot,getAlbumWithLike,
					getAlbumByTag,wxMiniProLogin,ssoInfo,LikeIt,LikeStatus,
					getAlbumPicLikes,PicLikeStatus,picLikeIt};
}

export default {
	install
}