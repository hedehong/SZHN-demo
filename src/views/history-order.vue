<template>
	<div class="history-order-container">
		<van-nav-bar left-text="返回" left-arrow @click-left="_clickLeft" title="历史订单" />
		<van-list :offset="5" :immediate-check="false">
			<div v-for="(item, index) in data" :key="index" class="list-item">
				<div class="title">
					订单编号：{{item.orderId}}
				</div>
				<van-card v-for="(child, count) in item.successOrder" :key="count" centered :num="child.count" :origin-price="child.originPrice" :price="child.price" :desc="child.desc" :thumb="child.image"></van-card>
			</div>
		</van-list>
	</div>
</template>

<script>
	import '../../mock/history-order.js'
	import {
		getHistoryOrder
	} from '../api/history-order.js'
	export default {
		data() {
			return {
				data: []
			}
		},
		created() {
			getHistoryOrder().then(res => {
				this.data = res
			})
		},
		methods: {
			_clickLeft() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="less" scoped>
	.history-order-container {
		padding-bottom: 50px;
		box-sizing: border-box;
		min-height: 100%;
		.list-item {
			margin: 10px 10px;
			border:  1px solid #ccc;
			border-radius: 4px;
			padding: 10px;
		}
		.title{
			text-align: left;
		}
	}
</style>
