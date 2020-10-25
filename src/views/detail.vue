<template>
	<div class="detail-container">
		<van-nav-bar left-text="返回"left-arrow @click-left="_clickLeft" @click-right="_goCart">
			<template #right>
				<van-icon name="shopping-cart-o" size="20"/>
			</template>
		</van-nav-bar>
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" :height="200">
			<van-swipe-item v-for="item in detail.bannerList" :key="item.id">
				<van-image width="100%" :src="item.image" />
			</van-swipe-item>
		</van-swipe>
		<div class="goods-info-container">
			<div class="goods-info">
				<div class="price-container">
					<div class="price">￥{{detail.originPrice}}</div>
					<div class="after-flod">折后￥{{detail.price}}</div>
					<div class="stock">库存{{detail.stock}}件</div>
				</div>
				<div class="goods-title">{{detail.title}}</div>
				<div class="goods-desc">{{detail.desc}}</div>
			</div>
			<div class="goods-info">
				<van-image v-for="item in detail.goodsInfoList" :key="item.id" width="100%" :src="item.image" />
			</div>
		</div>
		<van-goods-action>
			<van-goods-action-icon icon="cart-o" text="购物车" @click="_goCart"/>
			<van-goods-action-button type="warning" text="加入购物车" @click="_addToCart"/>
			<van-goods-action-button type="danger" text="立即购买" @click="_buy"/>
		</van-goods-action>
	</div>
</template>

<script>
	import mock from '../../mock/goods-detail.js'
	import { Toast } from 'vant';
	import {
		getGoodsDetailById
	} from '../api/detail.js'
	export default {
		created() {
			this._getDetail()
		},
		data() {
			return {
				detail: {}
			}
		},
		methods: {
			_clickLeft() {
				this.$router.go(-1)
			},
			_goCart() {
				this.$router.push('/cart')
			},
			_getDetail() {
				let data = {
					id: this.$route.query.id
				}
				getGoodsDetailById(data).then(res => {
					console.log(res)
					this.detail = res
				})
			},
			_addToCart() {
				let data = this.detail
				data.count = 1
				this.$store.dispatch('addToCart', data).then(res => {
					Toast.success('添加成功，在购物车等亲~');
				})
			},
			_buy() {
				console.log(this.detail)
				this.detail.image = this.detail.bannerList[0].image
				this.detail.count = 1
				this.$store.dispatch('comfireOrder', [this.detail]).then(res => {
					this.$router.push('/comfire-order')
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.detail-container {
		background-color: #eee;
		color: #333;

		.goods-info-container {
			padding: 10px;
			padding-bottom: 50px;
			text-align: left;

			>div {
				background-color: #fff;
				border-radius: 5px;
				padding: 10px 10px;
				margin-bottom: 10px;
			}

			.price-container {
				display: flex;
				margin-bottom: 10px;

				.price {
					font-size: 20px;
					color: coral;
				}

				.after-flod {
					background-color: coral;
					display: flex;
					align-items: center;
					border-radius: 50px;
					padding: 2px 10px;
					color: #fff;
					font-size: 14px;
					margin-left: 10px;
				}

				.stock {
					display: flex;
					align-items: flex-end;
					margin-left: 10px;
					font-size: 12px;
					color: #b1b1b1;
				}
			}

			.goods-title {
				text-align: left;
				font-weight: bold;
				margin-bottom: 5px;
				color: #333;

				span {
					border-radius: 4px;
					background-color: darkorange;
					color: #fff;
					font-weight: 400;
					padding: 2px 5px;
					font-size: 12px;
					margin-left: 10px;
				}
			}

			.goods-desc {
				text-align: left;
				font-size: 12px;
				color: #666;
			}

			.goods-info {}
		}
	}
</style>
