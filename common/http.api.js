const install = (Vue, vm) => {
	vm.$u.api={};
	
	/* 接口使用说明
	** 在script中使用： this.$u.api.接口名
	** 默认会自动log 返回的相应
	** 除了登录接口，其余都需要加token数据，否则会被拒绝
	**/
	
	//获取code
	vm.$u.api.getCode = (params = {}) => vm.$u.post('/isUsed',params);


export default {
	install
}