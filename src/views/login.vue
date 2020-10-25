<template>
	<div class="login-container">
		<div class="login-wrap">
			<van-icon name="user-o" size="60px" />
			<van-form @submit="_login">
				<van-field v-model="loginForm.username" name="username" label="用户名" placeholder="请输入用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
				<van-field v-model="loginForm.password" type="password" name="password" label="密码" placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" />
				<div style="margin: 16px;">
					<van-button round block type="info" native-type="submit">
						登录
					</van-button>
				</div>
			</van-form>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				loginForm: {
					username: '',
					password: '',
				}
			}
		},
		computed: {
			...mapGetters([
				'userInfo'
			])
		},
		methods: {
			_login(res) {
				if (this.loginForm.username !== 'admin' && this.loginForm.password !== '123456') {
					Toast.fail('用户名或密码错误！');
				} else {
					this.$store.dispatch('Login', this.loginForm).then(res => {
						console.log(this.userInfo)
						this.$router.go(-1)
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.login-container {
		height: 100%;
		background-color: #e8e8e8;
		padding: 10px;
		display: flex;
		flex-flow: column;
		box-sizing: border-box;

		.login-wrap {
			flex: 1;
			background-color: #fff;
			display: flex;
			align-items: center;
			flex-flow: column;
			justify-content: center;

			.van-icon {
				margin-bottom: 50px;
			}
		}
	}
</style>
