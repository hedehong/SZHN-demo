<template>
	<div class="mine-container">
		<div class="user-info-container">
			<van-image round width="50" height="50" src="https://img.yzcdn.cn/vant/cat.jpeg" @click="_headClick"/>
			<div class="user-name">
				<div>{{userInfo.username}}</div>
				<p>账号：{{userInfo.username}}</p>
			</div>
		</div>
		<div class="order-type">
			<van-cell title="历史订单" is-link to="/history-order"/>
		</div>
		<div class="logout">
			<van-button type="info" round @click="_logout">登出</van-button>
		</div>
	</div>
</template>

<script>
	import { getToken } from '../utils/auth.js'
	import {
		mapGetters
	} from 'vuex'
	import { Toast } from 'vant';
	export default {
		data() {
			return {
			}
		},
		computed: {
			...mapGetters([
				'userInfo'
			])
		},
		created() {
			this._getUserInfo()
		},
		methods: {
			_getUserInfo() {
				this.$store.dispatch('GetUserInfo')
			},
			_headClick() {
				this.$router.replace('/home')
			},
			_logout() {
				this.$store.dispatch('Logout').then(() => {
					Toast.fail('注销成功！');
					this.$router.replace('/home')
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.mine-container {
		height: 100%;
		padding: 10px;
		padding-bottom: 50px;
		box-sizing: border-box;
		background-color: #e8e8e8;
		// display: flex;
		// flex-flow: column;
		// justify-content: space-between;
		.user-info-container{
			display: flex;
			margin-bottom: 20px;
			.van-image{
				margin-right: 15px;
			}
			.user-name{
				display: flex;
				flex-flow: column;
				justify-content: center;
				div{
					font-weight: bold;
					font-size: 24px;
				}
				p{
					margin: 0;
					font-size: 12px;
					color: #bbb;
				}
			}
		}
		.order-type{
			.van-cell{
				border-radius: 4px 4px 0 0;
			}
			margin-bottom: 15px;
		}
		.van-button{
			position: fixed;
			bottom: 50px;
			left: 15px;
			width: calc(100vw - 30px);
		}
		
	}
</style>
