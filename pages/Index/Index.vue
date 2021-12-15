<template>
	<view>
		<u-navbar :is-back="false" :border-bottom="false">
			<view class="slot-wrap">
				<view class="navbar-left">
					<view class="left-item">
						<u-button size="mini" open-type="share" :hair-line="false" hover-class="none" :custom-style="zhuanfaBtnCustomStyle">
							<u-icon name="zhuanfa" size="38"></u-icon>
						</u-button>
					</view>
				</view>
				<view class="search-wrap">
					<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
					<u-search placeholder="搜索图片" v-model="keyword" :show-action="false" height="56" :action-style="{color: '#fff'}"></u-search>
				</view>
			</view>
		</u-navbar>
		<view class="u-page">
			<u-swiper :list="swiperList" mode="rect" :effect3d="true" height="370" bg-color="#fff"></u-swiper>
			<view class="u-main-content">
				<u-notice-bar mode="vertical" border-radius="8" :more-icon="true" :list="noticeBarList"></u-notice-bar>
				<view class="newest">
					<u-section title="最新壁纸" font-size="35" sub-title="更多"></u-section>
					<view class="newest-images">
						<u-row gutter="16">
							<u-col span="4">
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/1920_886-db944071effb4e86be47ae45b85d4889.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/1920_886-db944071effb4e86be47ae45b85d4889.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
							</u-col>
							<u-col span="4">
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/2340_1080-fd5e9ab9162a430db379727b8f24d44d.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/2340_1080-fd5e9ab9162a430db379727b8f24d44d.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
							</u-col>
							<u-col span="4">
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/2340_1080-fd5e9ab9162a430db379727b8f24d44d.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/2340_1080-fd5e9ab9162a430db379727b8f24d44d.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
							</u-col>
						</u-row>
					</view>
				</view>
				<view class="popular">
					<u-section title="热门壁纸" font-size="35" color="red" sub-title="更多"></u-section>
					<view class="popular-images">
						<u-row gutter="16">
							<u-col span="4">
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/1920_886-db944071effb4e86be47ae45b85d4889.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/1920_886-db944071effb4e86be47ae45b85d4889.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
							</u-col>
							<u-col span="4">
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/2340_1080-fd5e9ab9162a430db379727b8f24d44d.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/2340_1080-fd5e9ab9162a430db379727b8f24d44d.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
							</u-col>
							<u-col span="4">
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/2340_1080-fd5e9ab9162a430db379727b8f24d44d.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
								<u-image src="https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/2340_1080-fd5e9ab9162a430db379727b8f24d44d.jpeg" mode="widthFix">
									<u-loading slot="loading"></u-loading>
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
								</u-image>
							</u-col>
						</u-row>
					</view>
				</view>
			</view>
		</view>
		<u-tabbar :list="vuex_tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [
					"https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/1200_1920-91e49728dc7640c8a1747febcb41663c.jpg",
					"https://cdn.lilu.org.cn/earth/white-dove/2021-07-23/1200_1920-8d7baf69bdb94f7e9172bca9618df3d9.jpg"
				],
				noticeBarList: [
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
				zhuanfaBtnCustomStyle: {
					borderStyle: 'none',
					padding: '0px'
				},
				keyword: ''
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.u-main-content, .newest, .popular {
		width: 96%;
		margin: 20rpx auto;
		border-radius: 10px;
	}
	.newest-images, .popular-images {
		margin: 20rpx auto;
	}
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
	.search-wrap {
		margin: 0 20rpx;
		flex: 1;
	}
	.navbar-left {
		margin-left: 22rpx;
		display: flex;
	}
	.left-item {
		margin: 0 8rpx;
		position: relative;
		display: flex;
	}
</style>
