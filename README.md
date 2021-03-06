# wallpaper-uniapp
<p>
  <a href="https://gitee.com/theOS/wallpaper-swarm"><img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d312c7f9-984b-40d2-a02e-6ef169da1d29/4fb8d7b5-6d3b-4df9-ac39-07bd467a3412.svg" alt="后台项目"></a>
  <a href="https://gitee.com/theOS/wallpaper-admin-web"><img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d312c7f9-984b-40d2-a02e-6ef169da1d29/0778dac7-70a2-4437-aaef-f88540a33cc3.svg" alt="管理端前台"></a>
  <a href="https://gitee.com/theOS/wallpaper-uniapp-wx"><img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d312c7f9-984b-40d2-a02e-6ef169da1d29/11d2af06-ce1f-4ce3-b694-b00234f55094.svg" alt="uni-app用户端"></a>
  <a href="https://theos.gitee.io/"><img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d312c7f9-984b-40d2-a02e-6ef169da1d29/0f2f32ac-c0c6-4075-97f1-ff1ab60b02b7.svg" alt="文档地址"></a>
</p>


## 前言

该项目为wallpaper-swarm前后端分离项目的用户端部分，后端项目`wallpaper-swarm`地址：[传送门](https://gitee.com/theOS/wallpaper-swarm)。

管理端前端：[传送门](https://gitee.com/theOS/wallpaper-admin-web)

## 项目介绍

`wallpaper-uniapp`是wallpaper-swarm系统的用户端项目，基于uni-app实现的微信小程序客户端，主要包括首页轮播图，图片查看，专辑查看，下载、分享，点赞，登录等功能。

用户端功能演示
<p>
  <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d312c7f9-984b-40d2-a02e-6ef169da1d29/705346bc-42c4-4f49-ac01-2a3b09f30d13.png" alt="">
  <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d312c7f9-984b-40d2-a02e-6ef169da1d29/89a58963-4676-4158-814d-749a84318b3f.png" alt="">
 <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d312c7f9-984b-40d2-a02e-6ef169da1d29/3604b5ea-2d63-48fd-89b2-6d1abc7d8fde.png" alt="">
  <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d312c7f9-984b-40d2-a02e-6ef169da1d29/5c164587-a5ac-405b-a0a1-68e78fac2a0c.png" alt="">
  <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d312c7f9-984b-40d2-a02e-6ef169da1d29/b0e5a2cc-ba07-43ff-9074-30ddcbdb77c1.png" alt="">
  <img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d312c7f9-984b-40d2-a02e-6ef169da1d29/cdf8e8ae-c963-4d3d-92ff-450e8efd4997.png" alt="">
</p>


### 技术选型

技术 | 说明 | 官网
----|----|----
uni-app | 前端框架 | [https://uniapp.dcloud.io/](https://uniapp.dcloud.io/) 
uView | UI框架 | [https://uviewui.com/guide/demo.html](https://uviewui.com/guide/demo.html) 

### 项目布局

``` lua
src -- 源码目录
├── static -- 静态资源目录
	├── icon -- 图标
	└── tabbar -- tabbar图标
├── common -- 公共组件
└── page -- 前端页面
    ├── home -- tabbar首页面
    ├── category -- tabbar分类页面
    └──  center -- tabbar我的页面
```

## 搭建步骤
- 下载Hbuilder X并安装：[https://www.dcloud.io/hbuilderx.html](https://www.dcloud.io/hbuilderx.html);

- 该项目为前后端分离项目，访问本地访问接口需搭建后台环境，搭建请参考后端项目[传送门](https://gitee.com/theOS/wallpaper-swarm);

- 所有接口都需要通过网关访问，需要将`common/http.interceptor.js`文件中的`baseUrl`改为[http://localhost:8201]；

- 克隆源代码到本地，使用Hbuilder X打开，运行->运行到小程序模拟器->微信开发者工具



## 许可证

[Apache License 2.0](https://github.com/macrozheng/mall-admin-web/blob/master/LICENSE)

Copyright (c) 2018-2021 theOS
