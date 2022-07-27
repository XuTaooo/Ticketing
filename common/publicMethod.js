let publicMethod = {
	getNowDate: function() {
		let now = new Date();
		let year = now.getFullYear();
		let month = now.getMonth() + 1;//getMonth()获取的是上个月，需要+1
		let day = now.getDate();
		let hour = now.getHours();
		let minute = now.getMinutes();
		let second = now.getSeconds();
		let nowTime = year + '年' + this.addZero(month) + '月' + this.addZero(day) + '日  ' + this.addZero(hour) +
			':' + this.addZero(minute) + ':' + this.addZero(second);
		return nowTime
	},
	getNowTime: function(e) {
		let now = new Date(e);
		let year = now.getFullYear();
		let month = now.getMonth() + 1;//getMonth()获取的是上个月，需要+1
		let day = now.getDate();
		let hour = now.getHours();
		let minute = now.getMinutes();
		let second = now.getSeconds();
		let nowTime = year + '-' + this.addZero(month) + '-' + this.addZero(day) + '  ' + this.addZero(hour) +
			':' + this.addZero(minute) + ':' + this.addZero(second);
		return nowTime
	},
	addZero(e) {
		return e < 10 ? ('0' + e) : e;
	}
}

export default publicMethod
