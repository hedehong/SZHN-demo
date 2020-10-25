<template>
	<div class="home">
		<div class="search-container">
			<van-search v-model="searchData.keyword" background="#ddd" placeholder="请输入搜索关键词" @search="_onSearch">
			</van-search>
			<div class="search-option">
				<div @click="_tabClick('overall')" :class="{active: activeTab === 'overall'}">综合</div>
				<div @click="_tabClick('saleNum')" :class="{active: activeTab === 'saleNum'}">销量</div>
				<div @click="_tabClick('priceUp')" :class="{active: activeTab === 'priceUp'}">价格升序</div>
				<div @click="_tabClick('priceDown')" :class="{active: activeTab === 'priceDown'}">价格降序</div>
			</div>
			<div class="preview-type">
				<div style="padding-left: 28px;">共{{total}}件</div>
				<div class="preview-icon" @click="isList = !isList">
					<van-icon v-if="isList" name="wap-nav" />
					<van-icon v-if="!isList" name="apps-o"/>
					视图
				</div>
			</div>
		</div>
		<van-list v-if="isList" v-model="loading" :finished="finished" finished-text="没有更多了" @load="_onLoad" :offset="5"
		 :immediate-check="false">
			<van-card @click="_goDetail(item)" v-for="(item, index) in data" :key="index" centered :origin-price="item.originPrice" :price="item.price"
			 :desc="item.desc" :title="item.title" :thumb="item.image" />
		</van-list>
		<van-list v-else class="grid-list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="_onLoad" :offset="5"
		 :immediate-check="false">
			<div @click="_goDetail(item)" v-for="(item, index) in data" :key="index">
				<!-- <van-image :src="item.image" /> -->
				<img :src="item.image">
				<div class="title">{{item.title}}</div>
				<div class="price-container">
					<div class="origin-price">￥{{item.originPrice}}</div>
					<div class="price">{{item.price}}</div>
				</div>
			</div>
		</van-list>
	</div>
</template>

<script>
	import mock from '../../mock/home-list.js'
	import {
		getHomeList,
		// test
	} from '@/api/home.js'
	export default {
		data() {
			return {
				isList: false,
				activeTab: '',
				total: 0,
				totalPages: 0,
				searchData: {
					overall: 0,
					saleNum: 0,
					priceUp: 0,
					priceDown: 0,
					keyword: '',
					pageNo: 1,
					pageSize: 10
				},
				data: [],

				loading: false,
				finished: false,
				refreshing: false,
			}
		},
		created() {
			this._getHomeList()
		},
		methods: {
			_goDetail(item) {
				console.log(item)
				this.$router.push({
					path: '/detail',
					query: {
						id: item.id
					}
				})
			},
			_onSearch() {
				this.searchData.pageNo = 1
				this.data = []
				this._getHomeList()
			},
			_tabClick(name) {
				this.activeTab = name
				this.overall = 0
				this.saleNum = 0
				this.priceUp = 0
				this.priceDown = 0
				this.searchData[name] = 1
				this.data = []
				this.searchData.pageNo = 1
				this._getHomeList()
			},
			_getHomeList() {
				getHomeList(this.searchData).then(res => {
					let data = res.data
					data.map(item => {
						this.data.push(item)
					})
					this.total = res.total
					this.totalPages = res.totalPages
					this.loading = false
					this.finished = false
				})
			},
			_onLoad() {
				if (this.searchData.pageNo < this.totalPages) {
					this.searchData.pageNo += 1
					setTimeout(() => {
						this._getHomeList()
					}, 1500)
				} else {
					this.finished = true
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.active {
		color: indianred;
	}

	.home {
		height: auto;
		padding-bottom: 50px;

		.search-container {
			position: fixed;
			width: 100%;
			z-index: 9999;

			>div {
				background-color: #fff;
			}

			.search {
				/deep/ .van-cell__value {
					background-color: #fff;
				}
			}

			.search-option {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #bbb;

				>div {
					width: 25%;
					padding: 10px;
					display: flex;
					align-items: center;
					justify-content: center;

					.icon-container {
						display: flex;
						flex-flow: column;
						margin-top: 2px;
					}

					i {
						margin-left: 5px;
					}
				}
			}

			.preview-type {
				font-size: 12px;
				display: flex;
				flex-flow: row;
				justify-content: space-between;
				border-bottom: 1px solid #bbb;

				>div {
					padding: 10px 0;
					display: flex;
					align-items: center;

					&:first-child {
						flex: 1;
					}
				}

				.preview-icon {
					padding: 10px 15px;
					display: flex;
					flex-flow: column;
					border-left: 1px solid #bbb;
				}
			}
		}

		.van-list, .grid-list {
			padding-top: 150px;
			/deep/ .van-list__finished-text, /deep/ .van-list__loading{
				margin: 0 auto;
			}
		}
		.grid-list{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			background-color: #e8e8e8;
			>div {
				width: 48%;
				background-color: #fff;
				margin-bottom: 10px;
				border-radius: 4px;
				.title{
					padding: 5px 10px;
					font-size: 14px;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.price-container{
					padding: 5px 10px;
					display: flex;
					padding-top: 10px;
					padding-bottom: 15px;
					.origin-price{
						color: orangered;
						margin-right: 5px;
					}
					.price{
						font-size: 12px;
						display: flex;
						color: #ccc;
						align-items: center;
						padding-top: 2px;
						text-decoration:line-through
					}
				}
				img{
					width: 100%;
					border-radius: 4px 4px 0 0;
				}
			}
		}
	}
</style>
