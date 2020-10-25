<template>
	<div class="cart-container">
		<van-nav-bar left-text="返回" left-arrow @click-left="_clickLeft" title="购物车"/>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="5"
		 :immediate-check="false">
		 <div v-for="(item, index) in data" :key="index" class="list-item">
			 <div class="title">
			 	<van-checkbox shape="square" v-model="item.checked" @change="_checkBoxChange($event, item)"></van-checkbox>
				<p>{{item.title}}</p>
			 </div>
			 <van-card :key="index" centered :origin-price="item.originPrice" :price="item.price"
			  :desc="item.desc" :thumb="item.image">
			  <template #footer>
			 	 <van-stepper v-model="item.count" button-size="20" @plus="_stepPlus(item)" @minus="_stepMinus(item)"/>
			  </template>
			 </van-card>
		 </div>
		</van-list>
		<van-submit-bar :price="price" button-text="结算" @submit="_onSubmit">
		  <van-checkbox v-model="checked" @change="_allSelect">全选</van-checkbox>
		  <!-- <template #tip>
		    你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
		  </template> -->
		</van-submit-bar>
	</div>
</template>

<script>
	import mock from '../../mock/cart.js'
	import { getCartById } from '../api/cart.js'
	import { Toast } from 'vant';
	export default {
		data() {
			return {
				data: [],
				loading: false,
				finished: false,
				checked: false,
				price: 0
			}
		},
		created() {
			this._goCartList()
		},
		methods: {
			_clickLeft() {
				this.$router.go(-1)
			},
			_goCartList() {
				getCartById({ id: this.$route.query.id }).then(res => {
					this.data = res
				})
			},
			_stepPlus(item) {
				if(item.checked) {
					this.price += item.price * 100
				}
			},
			_stepMinus(item) {
				if(item.checked) {
					this.price -= item.price * 100
				}
			},
			_checkBoxChange(status, item) {
				console.log(1111111)
				this.price = status ? this.price + item.price * 100 * item.count : this.price - item.price * 100 * item.count
			},
			_allSelect(status) {
				this.data.map(item => {
					item.checked = status
				})
			},
			_onSubmit() {
				let arr = this.data.filter((item) => {
					if (item.checked) {
						return item
					}
				})
				if (arr.length > 0) {
					this.$store.dispatch('comfireOrder', arr).then(res => {
						this.$router.push('/comfire-order')
					})
				} else{
					Toast.fail('请选中商品后进行结算！')
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.cart-container{
		// padding-bottom: 50px;
	}
	.list-item{
		background-color: #fafafa;
		margin: 10px;
		.title{
			display: flex;
			padding: 5px 15px;
			padding-top: 10px;
			p{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 0;
			}
			.van-checkbox{
				margin-right: 15px;
				min-width: 20px;
			}
		}
	}
</style>
