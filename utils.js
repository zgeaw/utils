/*常用函数封装 32237384@qq.com*/
export default {
	/*
		数组排序 
		name 排序字段 
		用法 Array.setSort('creationTime')
	*/
	setSort(name) {
		return function(o, p){
			let a, b;
			if (typeof o === "object" && typeof p === "object" && o && p) {
				a = o[name];
				b = p[name];
				if (a === b) {
					return 0;
				}
				if (typeof a === typeof b) {
					return a < b ? -1 : 1;
				}
				return typeof a < typeof b ? -1 : 1;
			}
			else {
				throw ("error");
			}
		}
	},
	/*
		获取地址栏参数
		key 需要获取的参数
		用法 getUrlStr('id')  
	*/
	getUrlStr(key) {
		let url = window.location.search;
		let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		let result = url.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	/*
		获取日期函数 返回2018-06-06
		AddDayCount 天数
		getDateStr(0) //获取当前日期
		getDateStr(-10) //获取前10天日期
		getDateStr(20) //获取后20天日期
	*/
    getDateStr(AddDayCount){
        let date = new Date(); 
        date.setDate(date.getDate() + AddDayCount);
        return this.getDateAll(date)
    },
    getDateAll (date, type) {
        var year = date.getFullYear();
        //day获取当前几号，不足10补0
        var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        //month获取当前月份的日期，不足10补0
        var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);        
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var newDate = year + '-' + month + '-' + day;
        if(type == 'datetime'){
           newDate +=  ' ' + hours + ':' + minutes + ':' + seconds;
        }
        return newDate;
    },
    //获取周一和周日 日期，返回两种格式时间
    getDateWeek() {
        var now = new Date();
        var nowTime = now.getTime();
        var day = now.getDay();
        var oneDayLong = 1000 * 60 * 60 * 24;
        var MondayTime = nowTime - (day - 1) * oneDayLong;
        var SundayTime = nowTime + (7 - day) * oneDayLong;
        var monday = new Date(MondayTime);
        var sunday = new Date(SundayTime);
        return {
            first: this.getDateAll(monday),
            last: this.getDateAll(sunday),
            firstDate: monday,
            lastDate: sunday
        }
    },
    //获取月初与月末 日期，返回两种时间格式
    getDateMonth() {
        var dateFirter = new Date();
        var dateLast = new Date();
        dateFirter.setDate(1);

        var currentMonth = dateLast.getMonth();
        var nextMonth = ++currentMonth;
        var nextMonthFirstDay = new Date(dateLast.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        dateLast = new Date(nextMonthFirstDay - oneDay)
        return {
            first: this.getDateAll(dateFirter),
            last: this.getDateAll(dateLast),
            firstDate: dateFirter,
            lastDate: dateLast
        }
    },
    //数字转化为中文大写
    convertCurrency(money) {
        var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        var cnIntRadice = new Array('', '拾', '佰', '仟');
        var cnIntUnits = new Array('', '万', '亿', '兆');
        var cnDecUnits = new Array('角', '分', '毫', '厘');
        var cnInteger = '整';
        var cnIntLast = '元';
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        var integerNum;
        var decimalNum;
        var chineseStr = '';
        var parts;
        if (money == '') {
            return '';
        }
        money = parseFloat(money);
        if (money >= maxNum) {
            //超出最大处理数字
            return '';
        }
        if (money == 0) {
            chineseStr = cnNums[0] + cnIntLast + cnInteger;
            return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf('.') == -1) {
            integerNum = money;
            decimalNum = '';
        } else {
            parts = money.split('.');
            integerNum = parts[0];
            decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
            var zeroCount = 0;
            var IntLen = integerNum.length;
            for (var i = 0; i < IntLen; i++) {
                var n = integerNum.substr(i, 1);
                var p = IntLen - i - 1;
                var q = p / 4;
                var m = p % 4;
                if (n == '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        chineseStr += cnNums[0];
                    }
                    //归零
                    zeroCount = 0;
                    chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    chineseStr += cnIntUnits[q];
                }
            }
            chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum != '') {
            var decLen = decimalNum.length;
            for (var i = 0; i < decLen; i++) {
                var n = decimalNum.substr(i, 1);
                if (n != '0') {
                    chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                }
            }
        }
        if (chineseStr == '') {
            chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
            chineseStr += cnInteger;
        }
        return chineseStr;
    }
}