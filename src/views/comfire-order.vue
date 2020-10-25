<template>
	<div class="comfire-order-container">
		<van-nav-bar left-text="返回" left-arrow @click-left="_clickLeft" title="确认订单" />
		<van-cell class="receive-info" is-link @click="_editAddress">
			<van-icon name="location" size="30" />
			<div class="info" v-if="showAddNewAddress">
				<div class="name">
					<p>{{addressInfo.name}}</p>
					<span class="phone">{{addressInfo.tel}}</span>
				</div>
				<div class="address">{{address}}</div>
			</div>
			<div class="info" v-else>添加新地址</div>
		</van-cell>
		<van-list :offset="5" :immediate-check="false">
			<div v-for="(item, index) in comfireOrderList" :key="index" class="list-item">
				<van-card :key="index" centered :origin-price="item.originPrice" :price="item.price" :desc="item.desc" :title="item.title"
				 :num="item.count" :thumb="item.image">
				</van-card>
			</div>
		</van-list>
		<van-submit-bar :price="totalAmount" button-text="提交订单" @submit="_onSubmit" />
		<van-action-sheet v-model="comfireOrderShow" title="修改收货地址">
			<div class="address-info">
				<van-address-edit :area-list="areaList" :address-info="addressInfo" :area-columns-placeholder="['请选择', '请选择', '请选择']"
				 @save="onSave" />
			</div>
		</van-action-sheet>
	</div>
</template>

<script>
	import '../../mock/submit-order.js'
	import areaList from '../utils/area.js'
	import {
		getToken,
		setToken
	} from '../utils/auth.js'
	import {
		Toast
	} from 'vant';
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				data: [],
				loading: false,
				finished: false,
				checked: false,
				price: 0,
				areaList: areaList,
				comfireOrderShow: false,
				addressInfo: {
					name: '',
					province: '',
					city: '',
					county: '',
					addressDetail: '',
					tel: ''
				},
				addressComplete: false
			}
		},
		created() {
			if (getToken('addressInfo') !== null) {
				this.addressInfo = JSON.parse(getToken('addressInfo'))
				this.addressComplete = true
			}
		},
		computed: {
			...mapGetters([
				'comfireOrderList',
				'cartList'
			]),
			totalAmount: function() {
				let total = 0
				this.comfireOrderList.map(item => {
					total += item.price * 100 * item.count
				})
				return total
			},
			address: function() {
				let addressInfo = this.addressInfo
				return addressInfo.province + addressInfo.city + addressInfo.county + addressInfo.addressDetail
			},
			showAddNewAddress() {
				let res = false
				let addressInfo = this.addressInfo
				if (addressInfo.name && addressInfo.province && addressInfo.city && addressInfo.county && addressInfo.addressDetail) {
					res = true
				}
				return res
			}
		},
		methods: {
			_editAddress() {
				this.comfireOrderShow = true
			},
			_clickLeft() {
				this.$router.go(-1)
			},
			_allSelect(status) {
				this.data.map(item => {
					item.checked = status
					console.log(item.price)
					status ? this.price += item.price * 100 : this.price -= item.price * 100
				})
				console.log(this.price)
			},
			_onSubmit() {
				this.$store.dispatch('SubmitOrder', this.comfireOrderList).then(res => {
					if (this.addressComplete) {
						Toast.success('购买成功!')
						this.$router.replace('/history-order')
						this.$store.commit('SET_CART_LIST', newCartList)
						setToken('goodsList', JSON.stringify(newCartList))
					} else {
						Toast.fail('请填写收货地址后，再提交订单!')
					}
				})
			},
			onSave(res) {
				this.addressInfo = res
				this.comfireOrderShow = false
				setToken('addressInfo', JSON.stringify(res))
				this.addressComplete = true
			}
		}
	}
</script>

<style lang="less" scoped>
	.comfire-order-container {
		background-color: #eee;
		min-height: 100%;
		padding-bottom: 50px;
		box-sizing: border-box;
	}

	/deep/ .receive-info {
		.van-cell__value {
			display: flex;

			.info {
				margin-left: 10px;
			}

			.name {
				font-size: 16px;
				display: flex;
				align-items: flex-end;

				p {
					margin: 0;

				}

				.phone {
					font-size: 12px;
					color: #999;
					margin-left: 10px;
					line-height: 20px;
				}
			}

			.address {
				font-size: 12px;
			}
		}
	}

	.list-item {
		background-color: #fafafa;
		margin: 10px;

		.title {
			display: flex;
			padding: 5px 15px;
			padding-top: 10px;

			p {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 0;
			}

			.van-checkbox {
				margin-right: 15px;
				min-width: 20px;
			}
		}
	}
</style>
