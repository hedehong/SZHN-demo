###########开发编译
1. npm install
2. npm run serve

###########部署步骤
1. npm install

2. npm run build



###########目录结构描述
├── mock                        // mock接口
│   ├── cart.js                  	 // 购物车接口
│   ├── cartlist.js                // 购物车缓存接口
│   ├── goods-detail.js            // 商品详情接口
│   ├── history-order.js           // 历史订单接口
│   ├── history-order-list.js      // 历史订单缓存接口
│   ├── home-list.js               // 主页商品列表接口
│   ├── response-template.js       // response分页模板
│   ├── submit-order.js            // 提交订单接口
│   ├── user-info.js               // 个人信息接口
├── public                      // 静态
├── src                      		// 配置
│   ├── api											   // 请求配置	
│   ├── assets                     // 图片
│   ├── components                 // 组件
│   ├── router                     // 路由配置
│   ├── store                      // vuex配置
│   ├── utils                      // 公共类
│   └── view                       // 路由页面
│   		├── cart.vue                  // 购物车
│   		├── comfire-order.vue         // 确认订单
│   		├── detail.vue                // 商品详情
│   		├── history-order.vue         // 历史订单
│   		├── home.vue                  // 主页
│   		├── Layout.vue                // 根容器
│   		├── login.vue                	// 登录
│   		└── mine.vue                	// 个人中心
│   ├── App.vue                    // 入口文件
│   ├── main.js                    // 入口文件
│   └── permission.js              // 路由守卫
└── Readme.md                   // help



