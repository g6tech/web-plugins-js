/**
 * Date Plugin - Plugin 2.6.0
 *
 * @author : Alberto Cerqueira
 * @email : alberto.cerqueira1990@gmail.com
 * 
 * @author : G6 | Technology
 * @email : alberto@g6-tech.com
 */
var date =  {
	
	patterns: ({
		br_s_h: "dd/mm/yyyy",
		br_c_h: "dd/mm/yyyy hh:mm:ss"
	}),
	
	units: {
		second: 1000, 
		minute: 60000, 
		hour: 3600000, 
		day : 86400000, 
		month: 2592000000, 
		year: 31536000000
	},
	
	isBlank: (function(value) {
		return value == "" || value == "null" || value == "undefined" || typeof value == undefined || value == undefined || typeof value == null || value == null;
	}),

	clone: (function (d) {
		return new Date(d);
	}),
	
	create: (function(u) {
		if (!this.isBlank(u) && !isNaN(u.year) && !isNaN(u.month) && !isNaN(u.day)) {
			return new Date(u.year, u.month, u.day);
		} else if (!this.isBlank(u) && !isNaN(u.year) && !isNaN(u.month) && !isNaN(u.day) && !isNaN(u.hour) && !isNaN(u.minute) && !isNaN(u.second) && !isNaN(u.millisecond)) {
			return new Date(u.year, u.month, u.day, u.hours, u.minutes, u.seconds, u.millisecond);
		} else if (!this.isBlank(u) && !isNaN(u.timestamp)) {
			return new Date(u.timestamp);
		} else {
			return new Date();
		}
	}),
	
	getInput: (function (i) {
		if (i['dd/mm/yyyy']) {
			var s = i['dd/mm/yyyy'].split('/');
			i.day = s[0]; 
			i.month = s[1]; 
			i.year = s[2];
		} else if (i['dd/mm/yyyy hh:mm:ss']) {
			var s = i['dd/mm/yyyy hh:mm:ss'];
			i.day = s.substring(0, 2);
			i.month = s.substring(3, 5);
			i.year = s.substring(6, 10);
			i.hour = s.substring(11, 13);
			i.minute = s.substring(14, 16);
			i.millisecond = s.substring(17);
		} else if (i['mm/dd/yyyy']) {
			var s = i['mm/dd/yyyy'].split('/');
			i.month = s[0];
			i.day = s[1];
			i.year = s[2];
		} else if (i['yyyy/mm/dd']) {
			var s = i['yyyy/mm/dd'].split('/');
			i.year = s[0];
			i.month = s[1];
			i.day = s[2];
		} else if (i['yyyymmdd']) {
			var s = i['yyyymmdd'] + "";
			i.year = s.substring(0, 4);
			i.month = s.substring(4, 6);
			i.day = s.substring(6);
		}
		return {
			day: parseInt(i.day, 10),
			month: parseInt(i.month, 10) - 1,
			year: parseInt(i.year, 10),
			hour: parseInt(i.hour, 10),
			minute: parseInt(i.minute, 10),
			millisecond: parseInt(i.millisecond, 10)
		};
	}),
	
	today: (function(f) {
		var date = new Date();
		var s = date.toISOString().split("T");
		var d = s[0].split("-");
		
		var day = d[2];
		if (f == 'ddmmyyyy') {
			return day + "" + d[1] + "" + d[0];
		} else if (f == 'mmddyyyy') {
			return d[1] + "" + day + "" + d[0];
		} else if (f == 'yyyymmdd') {
			return d[0] + "" + d[1] + "" + day;
		} else if (f == 'yyyymmddhhmmss') {
			var h = s[1].split(".")[0].split(":");
			return d[0] + "" + d[1] + "" + day + "" + h[0] + "" + h[1] + "" + h[2];
		} else if (f == 'dd/mm/yyyy') {
			return day + "/" + d[1] + "/" + d[0];
		} else if (f == 'dd/mm/yyyy hh:mm:ss') {
			return day + "/" + d[1] + "/" + d[0] + " " + s[1].split(".")[0];
		} else if (f == 'mm/dd/yyyy') {
			return d[1] + "/" + day + "/" + d[0];
		} else if (f == 'yyyy/mm/dd') {
			return d[0] + "/" + d[1] + "/" + day;
		} else if (f == 'yyyy/mm/dd hh:mm:ss') {
			return d[0] + "/" + d[1] + "/" + day + " " + s[1].split(".")[0];
		} else {
			return day + "/" + d[1] + "/" + d[0]; // default
		}
	}),

	time: (function(t) {
		if (!isNaN(t.hour) && !isNaN(t.minute) && !isNaN(t.second) && !isNaN(t.millisecond)) {
			return t.hour + ":" + t.minute + ":" + t.second + ":" + t.millisecond;
		} else if (!isNaN(t.hour) && !isNaN(t.minute) && !isNaN(t.second)) {
			return t.hour + ":" + t.minute + ":" + t.second;
		} else if (!isNaN(t.timestamp)) {
			var date = new Date(t.timestamp);
			
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			if (minute < 10) {
				minute = "0" + minute;
			}
			if (second < 10) {
				second = "0" + second;
			}
			return hour + ":" + minute + ":" + second;
		} else {
			return "00:00:00";
		}
	}),
	
	isValid: (function (i) {
		var fi = this.getInput(i);
		for (var index in fi) {
			if (isNaN(fi[index])) {
				return false;
			}
 		} 
		var testDate = new Date(fi.year, fi.month, fi.day), 
			testDateString = testDate.getFullYear().toString() + testDate.getMonth().toString() + testDate.getDate().toString(), 
			inputString = fi.year.toString() + fi.month.toString() + fi.day.toString();

		return (testDateString === inputString);	
	}),

	getNew: (function (i) {
		var fi = this.getInput(i);
		return new Date(fi.year, fi.month, fi.day);
	}),
	
	getFirstDayAndLastDayOfMonth: (function (i) {
		var date = this.create(i);
		var year = date.getFullYear();
		var month = date.getMonth();
		var firstDay = new Date(year, month, 1);
		var lastDay = new Date(year, month + 1, 0);
		
		if (!this.isBlank(i) && !this.isBlank(i.format)) {
			var getformatFirstDay = {};
			getformatFirstDay[i.format] = firstDay;
			
			var getformatLastDay = {};
			getformatLastDay[i.format] = lastDay;
			
			return {
				firstDay: this.getFormat(getformatFirstDay),
				lastDay: this.getFormat(getformatLastDay)
			};
		} else {
			return {
				firstDay: firstDay,
				lastDay: lastDay
			};
		}
	}),

	zeroDay: (function (date) {
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		return date;
	}),

	getToday: (function () {
		return this.zeroDay(new Date());
	}),

	add: (function (i) {
		var date = null;
		if (!this.isBlank(i.format)) {
			var getinput = {};
			getinput[i.format] = i.date;
			date = this.create(this.getInput(getinput));
		} else {
			date = i.date;
		}
		
		date.setTime(date.getTime() + (parseInt(i.value, 10) * this.units[i.unit]));
		
		if (!this.isBlank(i.format)) {
			var getformat = {};
			getformat[i.format] = date;
			return this.getFormat(getformat);
		}
	}),
	
	diffDays: (function (d1, d2) {
		var cd1 = this.zeroDay(this.clone(d1)), 
			cd2 = this.zeroDay(this.clone(d2)), 
			diff = cd1.getTime() - cd2.getTime();
		
		if (diff === 0) {
			return 0;	
		}
		return Math.round(diff / this.units.day);				
	}),

	isOverAge: (function (date, age) {
		c = this.getToday();
		c.setDate(date.getDate());
		c.setMonth(date.getMonth());
		c.setFullYear(date.getFullYear() + age);
		if (this.getToday().getTime() < c.getTime()) {
			return false;
		}
		return true;
	}),

	getFormat: (function(f) {
		var s = "";
		var d = "";
		if (f['ddmmyyyy']) {
			s = f['ddmmyyyy'];
		} else if (f['mmddyyyy']) {
			s = f['mmddyyyy'];
		} else if (f['yyyymmdd']) {
			s = f['yyyymmdd'];
		} else if (f['yyyymmddhhmmss']) {
			s = f['yyyymmddhhmmss'];
		} else if (f['dd/mm/yyyy']) {
			s = f['dd/mm/yyyy'];
		} else if (f['dd/mm/yyyy hh:mm:ss']) {
			s = f['dd/mm/yyyy hh:mm:ss'];
		} else if (f['mm/dd/yyyy']) {
			s = f['mm/dd/yyyy'];
		} else if (f['mm/dd/yyyy hh:mm:ss']) {
			s = f['mm/dd/yyyy hh:mm:ss'];
		} else if (f['yyyy/mm/dd']) {
			s = f['yyyy/mm/dd'];
		}
		
		var day = s.getDate();
		var month = (s.getMonth() + 1);
		var year = s.getFullYear();
		if (month < 10) {
			month = "0" + month;
		}
		if (day < 10) {
			day = "0" + day;
		}
		
		var hour = s.getHours();
		var minute = s.getMinutes();
		var second = s.getSeconds();
		if (minute < 10) {
			minute = "0" + minute;
		}
		if (second < 10) {
			second = "0" + second;
		}
		
		if (f['ddmmyyyy']) {
			d = day + "" + month + "" + year;
		} else if (f['mmddyyyy']) {
			d = month + "" + day + "" + year;
		} else if (f['yyyymmdd']) {
			d = year + "" + month + "" + day;
		} else if (f['yyyymmddhhmmss']) {
			d = year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
		} else if (f['dd/mm/yyyy']) {
			d = day + "/" + month + "/" + year;
		} else if (f['dd/mm/yyyy hh:mm:ss']) {
			d = day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
		} else if (f['mm/dd/yyyy']) {
			d = month + "/" + day + "/" + year;
		} else if (f['mm/dd/yyyy hh:mm:ss']) {
			d = month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second;
		} else if (f['yyyy/mm/dd']) {
			d = year + "/" + month + "/" + day;
		}
		return d;
	})
};