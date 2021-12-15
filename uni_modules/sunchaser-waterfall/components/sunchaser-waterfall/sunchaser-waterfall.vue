<template>
	<view class="waterfall-item" @tap="onTap">
		<image class="waterfall-image" :src="params.url" mode="widthFix" @load="emitHeight" @error="emitHeight"></image>
	</view>
</template>

<script>
	export default {
		name: "sunchaser-waterfall",
		props: {
			params: {
				type: Object,
				default() {
					return {}
				}
			},
			tag: {
				type: String | Number,
				default: ''
			},
			index: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			// 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
			emitHeight(e) {
				const query = uni.createSelectorQuery().in(this);
				query.select('.waterfall-item').boundingClientRect(data => {
					let height = Math.floor(data.height);
					this.$emit("height", height, this.$props.tag);
				}).exec();
			},
			onTap() {
				this.$emit("click", this.$props.index, this.$props.tag);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.waterfall-item {
		padding: 0rpx;
		background-color: #fff;
		font-size: 28rpx;
		color: #666;
		margin-bottom: 10rpx;
		
		.waterfall-image {
			display: block;
			width: 100%;
			// 默认设置一个图片的大约值
			height: 350rpx;
			border-radius: 5rpx;
		}
	}
</style>
