<template>
	<div class="layout">
		<transition name="transitionRouter">
		  <router-view></router-view>
		</transition>
		<!-- 底部导航栏 -->
		<van-tabbar class="nav" route>
			<van-tabbar-item replace :to="{ name: 'home' }" icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item replace :to="{ name: 'cart' }" icon="shopping-cart-o">购物车</van-tabbar-item>
			<van-tabbar-item replace :to="{ name: 'mine' }" icon="manager-o">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import { getToken } from '../utils/auth.js'
	export default {
		data() {
			return {
				
			}
		},
		created() {
			this._getUserInfo()
		},
		methods: {
			_getUserInfo() {
				let userInfo = null
				console.log(getToken('userInfo'))
				if (getToken('userInfo')) {
					userInfo = JSON.parse(getToken('userInfo'))
				}
				this.$store.commit('SET_USER_INFO', userInfo)
			}
		}
	}
</script>

<style lang="less" scoped>
	.layout{
		height: 100%;
	}
	.transitionRouter-enter-active,
	.transitionRouter-leave-active {
	    transition: all 0.4s;
	}
	
	.transitionRouter-enter,
	.transitionRouter-leave{
	    transform: translate3d(100%, 0, 0);
	}
</style>
