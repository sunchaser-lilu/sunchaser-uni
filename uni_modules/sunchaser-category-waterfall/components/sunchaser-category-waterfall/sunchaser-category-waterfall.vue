<template>
	<view class="category-waterfall-item" @tap="onTap">
		<view>
			<image class="category-image" :src="params.url" mode="widthFix" @load="emitHeight" @error="emitHeight">
				<view class="category-name">{{params.name}}</view>
			</image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"sunchaser-category-waterfall",
		props:{
			params: {
				type: Object,
				default() {
					return {}
				}
			},
			tag: {
				type:String | Number,
				default:''
			},
			index: {
				type:Number,
				default:-1
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			// 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
			emitHeight(e) {
				const query = uni.createSelectorQuery().in(this);
				query.select('.category-waterfall-item').boundingClientRect(data => {
					let height = Math.floor(data.height);
					this.$emit("height", height,this.$props.tag);
				}).exec();
			},
			onTap() {
				this.$emit("click", this.$props.index, this.$props.tag);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category-waterfall-item {
		padding: 0rpx;
		background-color: #fff;
		font-size: 28rpx;
		color: #666;
		margin-bottom: 10rpx;
		
		.category-image {
			display: block;
			width: 100%;
			// 默认设置一个图片的大约值
			height: 350rpx;
			border-radius: 5rpx;
		}
	}
	
	.category-name {
		float: right;
		margin: -65rpx 15rpx 0 0;
		color: #FFFFFF;
		font-size: 17px;
	}
</style>
