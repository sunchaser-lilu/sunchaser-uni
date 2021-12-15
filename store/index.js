import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/**
let lifeData = {};

try {
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
} catch(e) {
	
}
**/
// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
// let saveStateKeys = ['vuex_user', 'vuex_token'];
let saveStateKeys = [];

// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}

/**
	{
		// 非凸起按钮未激活的图标，可以是uView内置图标名或自定义扩展图标库的图标
		// 或者png图标的【绝对路径】，建议尺寸为80px * 80px
		// 如果是中间凸起的按钮，只能使用图片，且建议为120px * 120px的png图片
		iconPath: "home",
		// 激活(选中)的图标，同上
		selectedIconPath: "home-fill",
		// 显示的提示文字
		text: '首页',
		// 红色角标显示的数字，如果需要移除角标，配置此参数为0即可
		count: 2,
		// 如果配置此值为true，那么角标将会以红点的形式显示
		isDot: true,
		// 如果使用自定义扩展的图标库字体，需配置此值为true
		// 自定义字体图标库教程：https://www.uviewui.com/guide/customIcon.html
		customIcon: false,
		// 如果是凸起按钮项，需配置此值为true
		midButton: false,
		// 点击某一个item时，跳转的路径，此路径必须是pagees.json中tabBar字段中定义的路径
		pagePath: '', // 1.5.6新增，路径需要以"/"开头
	}
**/
let tabbar = [
				{
					iconPath: "home",
					selectedIconPath: "home-fill",
					text: '首页',
					count: 0,
					isDot: false,
					pagePath: "/pages/Index/Index"
				},
				{
					iconPath: "grid",
					selectedIconPath: "grid-fill",
					text: '分类',
					count: 0,
					isDot: false,
					pagePath: "/pages/Category/Category"
				},
				{
					iconPath: "moments",
					selectedIconPath: "moments-circel-fill",
					text: '动态',
					count: 0,
					isDot: false,
					pagePath: "/pages/Find/Find"
				},
				{
					iconPath: "plus-circle",
					selectedIconPath: "plus-circle-fill",
					text: '工具',
					midButton: false,
					count: 0,
					isDot: false,
					pagePath: "/pages/Publish/Publish"
				},
				{
					iconPath: "account",
					selectedIconPath: "account-fill",
					text: '我的',
					count: 0,
					isDot: false,
					pagePath: "/pages/Account/Account"
				}
			];

const store = new Vuex.Store({
	// 下面这些值仅为示例，使用过程中请删除
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		// vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {name: '明月'},
		// vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		// vuex_version: '1.0.1',
		vuex_tabbar: tabbar
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(nameArr.length >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store