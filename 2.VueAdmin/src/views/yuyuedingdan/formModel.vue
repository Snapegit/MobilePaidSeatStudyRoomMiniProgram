<template>
	<div>
		<el-dialog v-model="formVisible" :title="formTitle" width="80%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" label-width="$template2.back.add.form.base.labelWidth" :rules="rules">
				<el-row>
					<el-col :span="24">
						<el-form-item label="订单编号" prop="dingdanbianhao">
							<el-input class="list_inp" v-model="form.dingdanbianhao" :readonly="true" placeholder="订单编号" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="自习室名称" prop="zixishimingcheng">
							<el-input class="list_inp" v-model="form.zixishimingcheng" placeholder="自习室名称"
								 type="text" 								:readonly="!isAdd||disabledForm.zixishimingcheng?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="自习室位置" prop="zixishiweizhi">
							<el-input class="list_inp" v-model="form.zixishiweizhi" placeholder="自习室位置"
								 type="text" 								:readonly="!isAdd||disabledForm.zixishiweizhi?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="开放时间" prop="kaifangshijian">
							<el-input class="list_inp" v-model="form.kaifangshijian" placeholder="开放时间"
								 type="text" 								:readonly="!isAdd||disabledForm.kaifangshijian?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="自习室类型" prop="zixishileixing">
							<el-input class="list_inp" v-model="form.zixishileixing" placeholder="自习室类型"
								 type="text" 								:readonly="!isAdd||disabledForm.zixishileixing?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="座位号" prop="zuoweihao">
							<el-input class="list_inp" v-model="form.zuoweihao" placeholder="座位号"
								 type="text" 								:readonly="!isAdd||disabledForm.zuoweihao?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="每小时价" prop="meixiaoshijia">
							<el-input class="list_inp" v-model.number="form.meixiaoshijia" placeholder="每小时价"
								 type="number" 								:readonly="!isAdd||disabledForm.meixiaoshijia?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="开始时间" prop="kaishishijian">
							<el-date-picker
								class="list_date"
								v-model="form.kaishishijian"
								format="YYYY-MM-DD HH:mm:ss"
								value-format="YYYY-MM-DD HH:mm:ss"
								type="datetime"
								:readonly="!isAdd||disabledForm.kaishishijian?true:false"
								placeholder="请选择开始时间" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="离开时间" prop="likaishijian">
							<el-date-picker
								class="list_date"
								v-model="form.likaishijian"
								format="YYYY-MM-DD HH:mm:ss"
								value-format="YYYY-MM-DD HH:mm:ss"
								type="datetime"
								:readonly="!isAdd||disabledForm.likaishijian?true:false"
								placeholder="请选择离开时间" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="预约时长" prop="yuyueshizhang">
							<el-input class="list_inp" v-model="yuyueshizhang" :readonly="true" placeholder="预约时长" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="总费用" prop="yue">
							<el-input class="list_inp" v-model="yue" :readonly="true" placeholder="总费用" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="用户账号" prop="yonghuzhanghao">
							<el-input class="list_inp" v-model="form.yonghuzhanghao" placeholder="用户账号"
								 type="text" 								:readonly="!isAdd||disabledForm.yonghuzhanghao?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="用户姓名" prop="yonghuxingming">
							<el-input class="list_inp" v-model="form.yonghuxingming" placeholder="用户姓名"
								 type="text" 								:readonly="!isAdd||disabledForm.yonghuxingming?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="我的余额" prop="wodeyue">
							<el-input class="list_inp" v-model="form.wodeyue" placeholder="我的余额"
								 type="text" 								:readonly="!isAdd||disabledForm.wodeyue?true:false" />
						</el-form-item>
					</el-col>

				</el-row>
			</el-form>
			<template #footer v-if="isAdd||type=='logistics'||type=='reply'">
				<span class="formModel_btn_box">
					<el-button class="formModel_cancel" @click="closeClick">取消</el-button>
					<el-button class="formModel_confirm" type="primary" @click="save"
						>
						提交
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		computed,
		defineEmits
	} from 'vue'
	const context = getCurrentInstance()?.appContext.config.globalProperties;	
	const emit = defineEmits(['formModelChange'])
	//基础信息
	const tableName = 'yuyuedingdan'
	const formName = '预约订单'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
		dingdanbianhao : false,
		zixishimingcheng : false,
		zixishiweizhi : false,
		kaifangshijian : false,
		zixishileixing : false,
		zuoweihao : false,
		meixiaoshijia : false,
		kaishishijian : false,
		likaishijian : false,
		yuyueshizhang : false,
		yue : false,
		yonghuzhanghao : false,
		yonghuxingming : false,
		wodeyue : false,
	})
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')
	//表单验证
	//匹配整数
	const validateIntNumber = (rule, value, callback) => {
		if (!value) {
			callback();
		} else if (!context?.$toolUtil.isIntNumer(value)) {
			callback(new Error("请输入整数"));
		} else {
			callback();
		}
	}
	//匹配数字
	const validateNumber = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isNumber(value)) {
			callback(new Error("请输入数字"));
		} else {
			callback();
		}
	}
	//匹配手机号码
	const validateMobile = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isMobile(value)) {
			callback(new Error("请输入正确的手机号码"));
		} else {
			callback();
		}
	}
	//匹配电话号码
	const validatePhone = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isPhone(value)) {
			callback(new Error("请输入正确的电话号码"));
		} else {
			callback();
		}
	}
	//匹配邮箱
	const validateEmail = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isEmail(value)) {
			callback(new Error("请输入正确的邮箱地址"));
		} else {
			callback();
		}
	}
	//匹配身份证
	const validateIdCard = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.checkIdCard(value)) {
			callback(new Error("请输入正确的身份证号码"));
		} else {
			callback();
		}
	}
	//匹配网站地址
	const validateUrl = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isURL(value)) {
			callback(new Error("请输入正确的URL地址"));
		} else {
			callback();
		}
	}
	const rules = ref({
		dingdanbianhao: [
		],
		zixishimingcheng: [
		],
		zixishiweizhi: [
		],
		kaifangshijian: [
		],
		zixishileixing: [
		],
		zuoweihao: [
		],
		meixiaoshijia: [
			{required: true,message: '请输入',trigger: 'blur'}, 
			{ validator: validateNumber, trigger: 'blur' },
		],
		kaishishijian: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		likaishijian: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		yuyueshizhang: [
			{required: true,message: '请输入',trigger: 'blur'}, 
			{ validator: validateNumber, trigger: 'blur' },
		],
		yue: [
			{required: true,message: '请输入',trigger: 'blur'}, 
			{ validator: validateNumber, trigger: 'blur' },
		],
		yonghuzhanghao: [
		],
		yonghuxingming: [
		],
		wodeyue: [
		],
	})
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	const yuyueshizhang =computed(()=>{
		let d = form.value
		let a = 'h.kaishishijian-h.likaishijian'
		let n = a.split('-')
		let hour = getHour(d[n[0].split('h.')[1]], d[n[1].split('h.')[1]])
		form.value.yuyueshizhang = hour
		return hour
	})
	const yue =computed(()=>{
		let c = form.value
		let a = c.yuyueshizhang*c.meixiaoshijia
		form.value.yue = a?a.toFixed(2) : 0
		return a?a.toFixed(2) : 0
	})
	//methods

	// 获取时间间隔 单位小时
	const getHour = (first, last) => {
		let date1 = new Date(first)
		let date2 = new Date(last)
		let a = date1.getTime();
		let b = date2.getTime();
		var count = 0;
		for (var i = a; i < b; i += 3600 * 1000) {
			count++;
		}
		return count;
	}
	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			dingdanbianhao: getUUID(),
			zixishimingcheng: '',
			zixishiweizhi: '',
			kaifangshijian: '',
			zixishileixing: '',
			zuoweihao: '',
			meixiaoshijia: '',
			kaishishijian: '',
			likaishijian: '',
			yuyueshizhang: '',
			yue: '',
			yonghuzhanghao: '',
			yonghuxingming: '',
			wodeyue: '',
		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			form.value = res.data.data
			formVisible.value = true
		})
	}
	const crossRow = ref('')
	const crossTable = ref('')
	const crossTips = ref('')
	const crossColumnName = ref('')
	const crossColumnValue = ref('')
	//初始化
	const init=(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null)=>{
		resetForm()
			form.value.kaishishijian = context?.$toolUtil.getCurDateTime()
			form.value.likaishijian = context?.$toolUtil.getCurDateTime()
		if(formId){
			id.value = formId
			type.value = formType
		}
		if(formType == 'add'){
			isAdd.value = true
			formTitle.value = '新增' + formName
			formVisible.value = true
		}else if(formType == 'info'){
			isAdd.value = false
			formTitle.value = '查看' + formName
			getInfo()
		}else if(formType == 'edit'){
			isAdd.value = true
			formTitle.value = '修改' + formName
			getInfo()
		}
		else if(formType == 'cross'){
			isAdd.value = true
			formTitle.value = formNames
			// getInfo()
			for(let x in row){
				if(x=='dingdanbianhao'){
					form.value.dingdanbianhao = row[x];
					disabledForm.value.dingdanbianhao = true;
					continue;
				}
				if(x=='zixishimingcheng'){
					form.value.zixishimingcheng = row[x];
					disabledForm.value.zixishimingcheng = true;
					continue;
				}
				if(x=='zixishiweizhi'){
					form.value.zixishiweizhi = row[x];
					disabledForm.value.zixishiweizhi = true;
					continue;
				}
				if(x=='kaifangshijian'){
					form.value.kaifangshijian = row[x];
					disabledForm.value.kaifangshijian = true;
					continue;
				}
				if(x=='zixishileixing'){
					form.value.zixishileixing = row[x];
					disabledForm.value.zixishileixing = true;
					continue;
				}
				if(x=='zuoweihao'){
					form.value.zuoweihao = row[x];
					disabledForm.value.zuoweihao = true;
					continue;
				}
				if(x=='meixiaoshijia'){
					form.value.meixiaoshijia = row[x];
					disabledForm.value.meixiaoshijia = true;
					continue;
				}
				if(x=='kaishishijian'){
					form.value.kaishishijian = row[x];
					disabledForm.value.kaishishijian = true;
					continue;
				}
				if(x=='likaishijian'){
					form.value.likaishijian = row[x];
					disabledForm.value.likaishijian = true;
					continue;
				}
				if(x=='yuyueshizhang'){
					form.value.yuyueshizhang = row[x];
					disabledForm.value.yuyueshizhang = true;
					continue;
				}
				if(x=='yue'){
					form.value.yue = row[x];
					disabledForm.value.yue = true;
					continue;
				}
				if(x=='yonghuzhanghao'){
					form.value.yonghuzhanghao = row[x];
					disabledForm.value.yonghuzhanghao = true;
					continue;
				}
				if(x=='yonghuxingming'){
					form.value.yonghuxingming = row[x];
					disabledForm.value.yonghuxingming = true;
					continue;
				}
				if(x=='wodeyue'){
					form.value.wodeyue = row[x];
					disabledForm.value.wodeyue = true;
					continue;
				}
			}
			if(row){
				crossRow.value = row
			}
			if(table){
				crossTable.value = table
			}
			if(tips){
				crossTips.value = tips
			}
			if(statusColumnName){
				crossColumnName.value = statusColumnName
			}
			if(statusColumnValue){
				crossColumnValue.value = statusColumnValue
			}
			formVisible.value = true
		}

		context?.$http({
			url: `${context?.$toolUtil.storageGet('sessionTable')}/session`,
			method: 'get'
		}).then(res => {
			var json = res.data.data
			if(json.hasOwnProperty('yonghuzhanghao')&& context?.$toolUtil.storageGet("role")!="管理员"){
				form.value.yonghuzhanghao = json.yonghuzhanghao
				disabledForm.value.yonghuzhanghao = true;
			}
			if(json.hasOwnProperty('yonghuxingming')&& context?.$toolUtil.storageGet("role")!="管理员"){
				form.value.yonghuxingming = json.yonghuxingming
				disabledForm.value.yonghuxingming = true;
			}
			if(json.hasOwnProperty('yue')&& context?.$toolUtil.storageGet("role")!="管理员"){
				form.value.wodeyue = json.yue
				disabledForm.value.wodeyue = true;
			}
		})
	}
	//初始化
	//声明父级调用
	defineExpose({
		init
	})
	//关闭
	const closeClick = () => {
		formVisible.value = false
	}
	//富文本
	const editorChange = (e,name) =>{
		form.value[name] = e
	}
	//提交
	const save=()=>{
		var table = crossTable.value
		var objcross = JSON.parse(JSON.stringify(crossRow.value))
		let crossUserId = ''
		let crossRefId = ''
		let crossOptNum = ''
		if(type.value == 'cross'){
			if(crossColumnName.value!=''){
				if(!crossColumnName.value.startsWith('[')){
					for(let o in objcross){
						if(o == crossColumnName.value){
							objcross[o] = crossColumnValue.value
						}
					}
					//修改跨表数据
					changeCrossData(objcross)
				}else{
					crossUserId = context?.$toolUtil.storageGet('userid')
					crossRefId = objcross['id']
					crossOptNum = crossColumnName.value.replace(/\[/,"").replace(/\]/,"")
				}
			}
		}
		formRef.value.validate((valid)=>{
			if(valid){
				if(crossUserId&&crossRefId){
					form.value.crossuserid = crossUserId
					form.value.crossrefid = crossRefId
					let params = {
						page: 1,
						limit: 1000, 
						crossuserid:form.value.crossuserid,
						crossrefid:form.value.crossrefid,
					}
					context?.$http({
						url: `${tableName}/page`,
						method: 'get', 
						params: params 
					}).then(res=>{
						if(res.data.data.total>=crossOptNum){
							context?.$toolUtil.message(`${crossTips.value}`,'error')
							return false
						}else{
							context?.$http({
								url: `${tableName}/${!form.value.id ? "save" : "update"}`,
								method: 'post', 
								data: form.value 
							}).then(res=>{
								context?.$toolUtil.message(`操作成功`,'success',()=>{
									formVisible.value = false
									emit('formModelChange')
								})
							})
						}
					})
				}else{
					context?.$http({
						url: `${tableName}/${!form.value.id ? "save" : "update"}`,
						method: 'post', 
						data: form.value 
					}).then(res=>{
						context?.$toolUtil.message(`操作成功`,'success',()=>{
							formVisible.value = false
							emit('formModelChange')
						})
					})
				}
			}
		})
	}
	//修改跨表数据
	const changeCrossData=(row)=>{
		context?.$http({
			url: `${crossTable.value}/update`,
			method: 'post',
			data: row
		}).then(res=>{})
	}
</script>
<style lang="scss" scoped>
	// 表单
	.formModel_form{
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 30px;
		margin: 0;
		background: #fff;
		// form item
		:deep(.el-form-item) {
			margin: 0 0 20px 0;
			display: flex;
			//label
			.el-form-item__label {
			 background: none;
			 display: block;
			 width: 150px;
			 min-width: 150px;
			 text-align: right;
			}
			// 内容盒子
			.el-form-item__content {
				display: flex;
				width: calc(100% - 120px);
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				// 输入框
				.list_inp {
					border: 1px solid #ddd;
					border-radius: 4px;
					padding: 0 10px;
					width: auto;
					line-height: 36px;
					box-sizing: border-box;
					min-width: 350px;
					height: 36px;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
						padding: 0;
					}
					.is-focus {
						box-shadow: none !important;
					}
				}
				//日期选择器
				.list_date {
					border: 1px solid #ddd;
					border-radius: 4px;
					width: auto;
					line-height: 36px;
					box-sizing: border-box;
					min-width: 350px;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
					}
				}
			}
		}
	}
	// 按钮盒子
	.formModel_btn_box {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		.formModel_cancel {
			border: 0;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 24px;
			margin: 0 20px 0 0;
			outline: none;
			color: #fff;
			background: #846fc8;
			width: auto;
			font-size: 14px;
			min-width: 100px;
			height: 36px;
		}
		.formModel_cancel:hover {
			background: #846fc890;
		}
		
		.formModel_confirm {
			border: 0;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 24px;
			margin: 0 20px 0 0;
			outline: none;
			color: #fff;
			background: #1c9c93;
			width: auto;
			font-size: 14px;
			min-width: 100px;
			height: 36px;
		}
		.formModel_confirm:hover {
			background: #1c9c9390;
		}
	}
</style>