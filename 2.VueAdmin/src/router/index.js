	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import news from '@/views/news/list'
	import forum from '@/views/forum/list'
	import quxiaodingdan from '@/views/quxiaodingdan/list'
	import zixishileixing from '@/views/zixishileixing/list'
	import yonghu from '@/views/yonghu/list'
	import chat from '@/views/chat/list'
	import discusszixishixinxi from '@/views/discusszixishixinxi/list'
	import zixishixinxi from '@/views/zixishixinxi/list'
	import yuyuedingdan from '@/views/yuyuedingdan/list'
	import config from '@/views/config/list'
	import chongzhixinxi from '@/views/chongzhixinxi/list'
	import genghuanzuowei from '@/views/genghuanzuowei/list'
	import yonghuCenter from '@/views/yonghu/center'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: '首页',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页Home',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: '修改密码',
			component: () => import('../views/updatepassword.vue')
		}
		
		,{
			path: '/yonghuCenter',
			name: '用户个人中心',
			component: yonghuCenter
		}
		,{
			path: '/news',
			name: '新闻资讯',
			component: news
		}
		,{
			path: '/forum',
			name: '我的发布',
			component: forum
		}
		,{
			path: '/quxiaodingdan',
			name: '取消订单',
			component: quxiaodingdan
		}
		,{
			path: '/zixishileixing',
			name: '自习室类型',
			component: zixishileixing
		}
		,{
			path: '/yonghu',
			name: '用户',
			component: yonghu
		}
		,{
			path: '/chat',
			name: '留言反馈',
			component: chat
		}
		,{
			path: '/discusszixishixinxi',
			name: '自习室信息评论',
			component: discusszixishixinxi
		}
		,{
			path: '/zixishixinxi',
			name: '自习室信息',
			component: zixishixinxi
		}
		,{
			path: '/yuyuedingdan',
			name: '预约订单',
			component: yuyuedingdan
		}
		,{
			path: '/config',
			name: '轮播图',
			component: config
		}
		,{
			path: '/chongzhixinxi',
			name: '充值信息',
			component: chongzhixinxi
		}
		,{
			path: '/genghuanzuowei',
			name: '更换座位',
			component: genghuanzuowei
		}
		]
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
