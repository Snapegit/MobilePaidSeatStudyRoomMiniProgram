<template>
	<div class="home_view">
		<div class="projectTitle">欢迎使用 {{projectName}}</div>
		<div class="count_list">
			<el-collapse-transition v-if="btnAuth('yuyuedingdan','首页总数')">
				<el-card v-show="countTypeList.closeyuyuedingdanCountType" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								预约订单
							</div>
							<div class="card_head_right">
								<el-icon @click="countTypeClick('hiddenyuyuedingdanCountType')" class="showIcons"
									:class="countTypeList.hiddenyuyuedingdanCountType?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="countTypeClick('closeyuyuedingdanCountType')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
							
						</div>
					</template>
					<el-collapse-transition>
						<div class="count_item" v-show="countTypeList.hiddenyuyuedingdanCountType">
							<div class="count_title">预约订单总数</div>
							<div class="count_num">{{yuyuedingdanCount}}</div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>
		<div class="card_list">
			<el-collapse-transition v-if="btnAuth('yuyuedingdan','首页统计')">
				<el-card v-show="cardTypeList.closeyuyuedingdanChartType1" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								预约订单
							</div>
							<div class="card_head_right">
								<el-icon @click="cardTypeClick('hiddenyuyuedingdanChartType1')" class="showIcons"
									:class="cardTypeList.hiddenyuyuedingdanChartType1?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="cardTypeClick('closeyuyuedingdanChartType1')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenyuyuedingdanChartType1">
							<div id="yuyuedingdanyuyueshizhangEchart1" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('yuyuedingdan','首页统计')">
				<el-card v-show="cardTypeList.closeyuyuedingdanChartType2" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								预约订单
							</div>
							<div class="card_head_right">
								<el-icon @click="cardTypeClick('hiddenyuyuedingdanChartType2')" class="showIcons"
									:class="cardTypeList.hiddenyuyuedingdanChartType2?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="cardTypeClick('closeyuyuedingdanChartType2')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenyuyuedingdanChartType2">
							<div id="yuyuedingdanyueEchart2" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>
	</div>
</template>

<script setup>
	import {
		inject,
		nextTick,
		ref,
		getCurrentInstance
	} from 'vue';
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const projectName = context.$project.projectName
	const countTypeList = ref({
	})
	const getCountList=()=>{
		countTypeList.value.closeyuyuedingdanCountType = true
		countTypeList.value.hiddenyuyuedingdanCountType = true
		if(btnAuth('yuyuedingdan','首页总数')){
			getyuyuedingdanCount()
		}
	}
	const yuyuedingdanCount = ref(0)
	const getyuyuedingdanCount = () => {
		context?.$http({
			url:'yuyuedingdan/count',
			method: 'get'
		}).then(res=>{
			yuyuedingdanCount.value = res.data.data
		})
	}
	const countTypeClick = (e) => {
		countTypeList.value[e] = !countTypeList.value[e]
	}
	const init=()=>{
		getCountList()
		getCardList()
	}
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	let echarts = inject("echarts")
	const cardTypeClick = (e) =>{
		cardTypeList.value[e] = !cardTypeList.value[e]
		setTimeout(()=>{
			getCardList()
		},1000)
	}
	const cardTypeList = ref({
		closeyuyuedingdanChartType1: true,
		hiddenyuyuedingdanChartType1: true,
		closeyuyuedingdanChartType2: true,
		hiddenyuyuedingdanChartType2: true,
	})
	const getCardList = () => {
		if(btnAuth('yuyuedingdan','首页统计')){
			getyuyuedingdanChart1()
		}
		if(btnAuth('yuyuedingdan','首页统计')){
			getyuyuedingdanChart2()
		}
	}
	const getyuyuedingdanChart1 = () => {
		nextTick(()=>{
			var yuyueshizhangEchart1 = echarts.init(document.getElementById("yuyuedingdanyuyueshizhangEchart1"),'macarons');
			context?.$http({
				url: `yuyuedingdan/value/yonghuzhanghao/yuyueshizhang`,
				method: "get",
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let pArray = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].yonghuzhanghao);
				    yAxis.push(parseFloat((res[i].total)));
				    pArray.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].yonghuzhanghao
				    })
				}
				var option = {};
                option = {
                    title: {
                        text: '学习时间统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel: {
                            rotate: 40
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
				yuyueshizhangEchart1.clear()
				// 使用刚指定的配置项和数据显示图表。
				yuyueshizhangEchart1.setOption(option);
				//根据窗口的大小变动图表
				yuyueshizhangEchart1.resize();
			})
		})
	}
	const getyuyuedingdanChart2 = () => {
		nextTick(()=>{
			var yueEchart2 = echarts.init(document.getElementById("yuyuedingdanyueEchart2"),'macarons');
			context?.$http({
				url: `yuyuedingdan/value/zixishimingcheng/yue`,
				method: "get",
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let pArray = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].zixishimingcheng);
				    yAxis.push(parseFloat((res[i].total)));
				    pArray.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].zixishimingcheng
				    })
				}
				var option = {};
                option = {
                    title: {
                        text: '收入统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel: {
                            rotate: 40
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
				// 使用刚指定的配置项和数据显示图表。
				yueEchart2.clear()
				yueEchart2.setOption(option);
				//根据窗口的大小变动图表
				yueEchart2.resize();
			})
		})
	}
	init()
</script>
<style lang="scss">
	.projectTitle{
		padding: 20px 0;
		margin: 20px 0 20px;
		font-weight: bold;
		display: flex;
		width: 100%;
		font-size: 30px;
		justify-content: center;
		align-items: center;
		height: auto;
	}

	.showIcons {
		transition: transform 0.3s;
		margin-right: 10px;
	}

	.showIcons1 {
		transform: rotate(-180deg);
	}
	
	// 总数盒子
	.count_list{
		padding: 0 0 20px;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		// 总数card
		.card_view {
			border: 1px solid #ddd;
			box-shadow: 0px 0px 0px rgba(0,0,0,.12);
			margin: 0 1% 10px;
			flex: 1;
			width: 100%;
			box-sizing: border-box;
			height: auto;
			// card头部
			.el-card__header {
				border: 1px solid #ddd;
				background: linear-gradient(90deg, rgba(28,156,147,.1) 0%, rgba(132,113,199,.1) 100%);
				width: 100%;
				border-width: 0 0 1px;
				// 头部盒子
				.index_card_head {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					height: 10px;
					// 标题
					.card_head_title {
						color: #666;
						font-size: 14px;
					}
					// 按钮盒子
					.card_head_right {
						display: flex;
						align-items: center;
						// 按钮
						.el-icon {
							cursor: pointer;
							color: #aaa;
							font-size: 20px;
						}
					}
				}
			}
			// body
			.el-card__body {
				padding: 0;
				// body盒子
				.count_item{
					padding: 30px;
					text-align: center;
					// 总数标题
					.count_title{
						color: #333;
						font-size: 16px;
						line-height: 2;
					}
					// 总数数字
					.count_num{
						color: #c00;
						font-size: 30px;
						line-height: 2;
					}
				}
			}
		}
	}
	// 首页盒子
	.home_view {
		padding: 0px 30px;
		margin: 88px 0 0;
		background: url(http://clfile.zggen.cn/20240203/dbc8b5149f284e5e86989e5e938abb79.png) no-repeat center top / 100% 100% !important;
		width: 100%;
		min-height: 100vh;
		height: auto;
	}
	// 统计图盒子
	.card_list {
		padding: 0 0 20px;
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		// 统计图card
		.card_view {
			border: 1px solid #ddd;
			box-shadow: 0px 0px 0px rgba(0,0,0,.12);
			margin: 0 1% 30px;
			width: 48%;
			box-sizing: border-box;
			height: auto;
			// 头部
			.el-card__header {
				border: 1px solid #ddd;
				background: linear-gradient(90deg, rgba(28,156,147,.1) 0%, rgba(132,113,199,.1) 100%);
				width: 100%;
				border-width: 0 0 1px;
				// 头部盒子
				.index_card_head {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					height: 10px;
					// 标题
					.card_head_title {
						color: #f00;
						font-size: 14px;
					}
					// 按钮盒子
					.card_head_right {
						display: flex;
						align-items: center;
						// 按钮
						.el-icon{
							cursor: pointer;
							color: #aaa;
							font-size: 20px;
						}
					}
				}
			}
			// body
			.el-card__body {
				padding: 0;
				// body盒子
				.card_item{
					padding: 30px;
					text-align: center;
				}
			}
		}
	}
</style>
