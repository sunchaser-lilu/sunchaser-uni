<template>
	<view>
		<view class="wrap">
			<u-waterfall v-model="flowList">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
						<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
						<u-lazy-load :loading-img="loadingImgUrl" imgMode="widthFix" border-radius="10" :image="item.url" :index="index"></u-lazy-load>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
						<u-lazy-load :loading-img="loadingImgUrl" imgMode="widthFix" border-radius="10" :image="item.url" :index="index"></u-lazy-load>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore
				icon-type="flower"
				margin-top="3"
				margin-bottom="3"
				bg-color="rgb(240, 240, 240)"
				:status="loadMoreStatus"
				@loadmore="loadDataFromServer"></u-loadmore>
		</view>
		<u-tabbar :list="vuex_tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNo: 1,
				pageSize: 10,
				hasNext: true,
				loadMoreStatus: 'loadmore',
				flowList: [],
				loadingImgUrl: 'https://cdn.lilu.org.cn/loading.png'
			}
		},
		onLoad() {
			this.loadMoreStatus = 'loading';
			this.loadDataFromServer();
		},
		onReachBottom() {
			console.log('waterfall - onReachBottom');
			if (this.loadMoreStatus === 'loadmore') {
				this.loadMoreStatus = 'loading';
				this.loadDataFromServer();
			}
		},
		methods: {
			loadDataFromServer() {
				let _this = this;
				if (!_this.hasNext) {
					_this.loadMoreStatus = 'nomore';
					return;
				}
				let pageNo = _this.pageNo;
				let pageSize = _this.pageSize;
				let channel = 'wx_mini';
				let id = 'W15639449413'
				this.$u.api.getImages({pageNo, pageSize, channel, id}).then(res => {
					res.data.forEach(function(item) {
						let flowItem = {
							id: _this.$u.guid(),
							url: item.url
						};
						_this.flowList.push(flowItem);
					});
					if (res.hasNext) {
						_this.pageNo++;
						this.loadMoreStatus = 'loadmore';
					} else {
						_this.hasNext = false;
						_this.loadMoreStatus = 'nomore';
					}
				});
			}
		}
	}
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		position: relative;
	}
</style>
