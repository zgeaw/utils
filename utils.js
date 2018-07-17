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
        let year = date.getFullYear();
        //day获取当前几号，不足10补0
        let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        //month获取当前月份的日期，不足10补0
        let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);        
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let newDate = year + '-' + month + '-' + day;
        if(type == 'datetime'){
           newDate +=  ' ' + hours + ':' + minutes + ':' + seconds;
        }
        return newDate;
    },
    //获取周一和周日 日期，返回两种格式时间
    getDateWeek() {
        let now = new Date();
        let nowTime = now.getTime();
        let day = now.getDay();
        let oneDayLong = 1000 * 60 * 60 * 24;
        let MondayTime = nowTime - (day - 1) * oneDayLong;
        let SundayTime = nowTime + (7 - day) * oneDayLong;
        let monday = new Date(MondayTime);
        let sunday = new Date(SundayTime);
        return {
            first: this.getDateAll(monday),
            last: this.getDateAll(sunday),
            firstDate: monday,
            lastDate: sunday
        }
    },
    //获取月初与月末 日期，返回两种时间格式
    getDateMonth() {
        let dateFirter = new Date();
        let dateLast = new Date();
        dateFirter.setDate(1);

        let currentMonth = dateLast.getMonth();
        let nextMonth = ++currentMonth;
        let nextMonthFirstDay = new Date(dateLast.getFullYear(), nextMonth, 1);
        let oneDay = 1000 * 60 * 60 * 24;
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
        let cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        let cnIntRadice = new Array('', '拾', '佰', '仟');
        let cnIntUnits = new Array('', '万', '亿', '兆');
        let cnDecUnits = new Array('角', '分', '毫', '厘');
        let cnInteger = '整';
        let cnIntLast = '元';
        //最大处理的数字
        let maxNum = 999999999999999.9999;
        let integerNum;
        let decimalNum;
        let chineseStr = '';
        let parts;
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
            let zeroCount = 0;
            let IntLen = integerNum.length;
            for (let i = 0; i < IntLen; i++) {
                let n = integerNum.substr(i, 1);
                let p = IntLen - i - 1;
                let q = p / 4;
                let m = p % 4;
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
            let decLen = decimalNum.length;
            for (let i = 0; i < decLen; i++) {
                let n = decimalNum.substr(i, 1);
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
    },
    /*
    	echart图表 通用封装
    	id 要渲染的id
    	xAxis 坐标轴数组
    	datas 渲染的数据
    	echartInit('echartBar', ['2012', '2013'], ['1', '2', '3'])
    */
    echartInit(id, xAxis, datas) {
	    let elm = echarts.init(document.getElementById(id));
	    const opt = (xAxis, datas) => {
            title: {
                text: '标题'
            },
            color: ['#5b9bd5', '#ed7d31', '#a5a5a5', '#ffc000'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                splitNumber: 3
            },
            yAxis: {
                type: 'category',
                data: xAxis
            },
            series: [{
                data: datas.list,
                type: 'bar'
            }]
        }
	    elm.setOption(opt(xAxis, datas));
	    window.addEventListener('resize', () => {
	        elm.resize()
	    })
	},
	/*
		显示数字小数位数
		number 要处理的数字或数字字符串
		digit 截取位数,四舍五入
		toFixed(1.1245, 3)
	 */
	toFixed(number, digit){
		if(number){
			//也可以用第三方扩展
			if(digit){				
				return parseFloat(number).toFixed(digit)
			}else{
				return parseFloat(number)
			}
		}
	},
	/*protoType('newString')
		'abc,123.aaa'.newString() //abc123aaa
		扩展原生字符串属性，需谨慎命名
		attr 要扩展的属性
		
	 */
	protoType(attr){
		 if(typeof String.prototype[attr] == 'undefined'){
            String.prototype[attr] = function(){
                let s = this;				
                s = s.replace(/\.|\,/g, '');//过滤逗号和点
                return s;
            }
        }
	},
	//检测图片坏链
	badChain(id) {
		let _sel = $(id);
		_sel.each(function() {//执行遍历
			let _this = $(this);
			if (_this.attr('src') == '') {//判断src属性是否为空
				_this.attr("src", "images/nopic.jpg");//设置src属性
			}
			_this.error(function() {//加载错误执行
				_this.attr("src", "images/nopic.jpg");
			});
		});
	},
	//设置cookie
	setCookie(cname, cvalue, exdays) {
		let exp = new Date();
		exp.setTime(exp.getTime() + exdays*24*60*60*1000);
		document.cookie = cname + "="+ escape (cvalue) + ";expires=" + exp.toGMTString();
	},
	//读取cookie
	getCookie(cname){
		let name = cname + "=";
		let ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
		}
		return "";	
	},
	//删除cookie
	removeCookie(cname){
		this.setCookie(cname, "", -1)
	},
	//设置缓存
	setCache(cname, cvalue){
		window.localStorage.setItem(cname, JSON.stringify(cvalue))
	},
	//读取缓存
	getCache(cname){
		return window.localStorage.getItem(cname)
	},
	//删除缓存
	removeCache(){
		window.localStorage.clear()
	},
	//判断是否是数组 返回1 整数 2正浮点 3 负浮点数
	isNumber(val){
		let regNum = /^[1-9]\d*$/; //整数
		let regPos = /^\d+(\.\d+)?$/; //正浮点数
		let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if(regNum.test(val)){			
			return 1;
		}else if(regPos.test(val)){			
			return 2;
		}else if(regNeg.test(val)){			
			return 3;
		}else{
			return 0;
		}
	}
}