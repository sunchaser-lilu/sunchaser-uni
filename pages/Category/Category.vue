<template>
	<view>
		<view class="waterfall-box h-flex-x h-flex-2">
			<view>
				<sunchaser-category-waterfall
					v-for="(item,index) in leftList" 
					:key="index" 
					:params="item" 
					tag="left"
					:index="index"
					@height="onHeight"
					@click="onClick"
				></sunchaser-category-waterfall>
			</view>
			<view>
				<sunchaser-category-waterfall
					v-for="(item,index) in rightList" 
					:key="index" 
					:params="item" 
					@height="onHeight"
					@click="onClick"
					tag="right"
					:index="index"
				></sunchaser-category-waterfall>
			</view>
		</view>
		<u-loadmore
			icon-type="flower"
			margin-top="3"
			margin-bottom="3"
			bg-color="rgb(240, 240, 240)"
			:status="loadMoreStatus"
			@loadmore="loadCategoriesFromServer">
		</u-loadmore>
		<u-tabbar :list="vuex_tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	import sunchaserCategoryWaterfall from "@/uni_modules/sunchaser-category-waterfall/components/sunchaser-category-waterfall/sunchaser-category-waterfall"
	export default {
		components: {
			'sunchaser-category-waterfall': sunchaserCategoryWaterfall
		},
		data() {
			return {
				leftHeight: 0,
				rightHeight: 0,
				leftList: [],
				rightList: [],
				
				pageNo: 1,
				pageSize: 10,
				hasNext: true,
				
				loadMoreStatus: 'loadmore',
				loadingImgUrl: 'https://cdn.lilu.org.cn/loading.png'
			}
		},
		onLoad() {
			this.loadMoreStatus = 'loading';
			this.loadCategoriesFromServer();
		},
		onReachBottom() {
			this.loadMoreStatus = 'loading';
			this.loadCategoriesFromServer();
		},
		// 下拉刷新
		onPullDownRefresh(){
			// 正常情况下接口返回应该很会很快。故意延迟调用，让用户有在刷新的体验感
			setTimeout(() => {
				this.pageNo = 1;
				this.pageSize = 10;
				this.leftHeight = 0;
				this.rightHeight = 0;
				this.leftList = [];
				this.rightList = [];
				this.hasNext = true;
				this.loadMoreStatus = 'loading';
				this.loadCategoriesFromServer();
			}, 800);
		},
		methods: {
			// 监听高度变化
			onHeight(height, tag) {
				if (tag == 'left') {
					this.leftHeight += height;
				} else {
					this.rightHeight += height;
				}
			},
			// 组件点击事件
			onClick(index, tag) {
				// 对应的数据
				let id;
				let categoryName;
				if (tag == 'left') {
					id = this.leftList[index].id;
					categoryName = this.leftList[index].name;
				} else {
					id = this.rightList[index].id;
					categoryName = this.rightList[index].name;
				}
				let direction = {
					"left": '左',
					"right": '右'
				}
				uni.showToast({
					title:`${direction[tag]}侧列表第${index+1}个被点击`,
					icon:'none'
				});
				uni.navigateTo({
					url: '../CategoryDetail/CategoryDetail?id=' + id + '&categoryName=' + categoryName
				});
			},
			
			loadCategoriesFromServer() {
				let _this = this;
				if (!_this.hasNext) {
					_this.loadMoreStatus = 'nomore';
					return;
				}
				let pageNo = _this.pageNo;
				let pageSize = _this.pageSize;
				let channel = 'wx_mini';
				this.$u.api.getCategories({pageNo, pageSize, channel}).then(res => {
					if (!res || res.length < 1) {
						_this.hasNext = false;
						_this.loadMoreStatus = 'nomore';
						return;
					}
					_this.doCategoryWaterfall(res);
					if (res.hasNext) {
						_this.pageNo++;
						_this.loadMoreStatus = 'loadmore';
					} else {
						_this.hasNext = false;
						_this.loadMoreStatus = 'nomore';
					}
				});
			},
			
			doCategoryWaterfall(res) {
				// 获取到的数据，请注意数据结构
				
				// 左右列表高度的差
				let differ = this.leftHeight - this.rightHeight;
				// 计算差值，用于确定优先插入那一边
				let differVal = 0;
								
				// 初始化左右列表的数据
				let i = differ > 0 ? 1 : 0;
				
				let [left, right] = [
					[],
					[]
				];
				
				// 获取插入的方向
				let getDirection = (index) => {
					/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
					if (differ >= 600 && index < 3) {
						differVal = 1;
						return 'right';
					}
					
					/* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
					if (differ <= -600 && index < 3) {
						differVal = -1;
						return 'left';
					}
					
					/* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
					if (differ >= 350 && index < 2) {
						return 'right';
					}
					/* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
					if (differ <= -350 && index < 2) {
						differVal = -1;
						return 'left';
					}
					
					/* 当前数据序号为偶数时，则插入到左边 */
					if ((i + differVal) % 2 == 0) {
						return 'left';
					} else {
						/* 当前数据序号为奇数时，则插入到右边 */
						return 'right';
					}
				}
				
				// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
				res.data.forEach((item, index) => {
					if (getDirection(index) == 'left') {
						// console.log(`差值：${differ},方向：left，序号${index}`)
						left.push({
							id: item.id,
							url: item.url,
							name: item.name
						});
					} else{
						// console.log(`差值：${differ},方向：right，序号${index}`)
						right.push({
							id: item.id,
							url: item.url,
							name: item.name
						});
					}
					i++;
				});
				
				// 将左右列表的数据插入，第一页时则覆盖
				if (this.pageNo == 1) {
					this.leftList = left;
					this.rightList = right;
					uni.stopPullDownRefresh();
				} else {
					this.leftList = [...this.leftList, ...left];
					this.rightList = [...this.rightList, ...right];
				}
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
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
	
	.waterfall-box {
		padding: 20rpx 10rpx;
		box-sizing: border-box;

		>view {
			padding: 0 10rpx;
		}
	}

	.h-flex-x {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;

		&.h-flex-2 {
			>view {
				width: 50%;
			}
		}
	}
</style>