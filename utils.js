/*常用函数封装 32237384@qq.com*/
//百度获取当前城市API
function showLocation(data) {
  //用户所在城市，可以获取省市县区，以及经纬度坐标
  var city = data.content.address_detail.city
  console.log(city)
}
export default {
  /*
		数组排序 
		name 排序字段 
		用法 Array.setSort('creationTime')
       */
  setSort(name) {
    return function (o, p) {
      let a, b
      if (typeof o === 'object' && typeof p === 'object' && o && p) {
        a = o[name]
        b = p[name]
        if (a === b) {
          return 0
        }
        if (typeof a === typeof b) {
          return a < b ? -1 : 1
        }
        return typeof a < typeof b ? -1 : 1
      } else {
        throw 'error'
      }
    }
  },
  /*
		获取地址栏参数
		key 需要获取的参数
		用法 getUrlStr('id')  
       */
  getUrlStr(key) {
    let url = window.location.search
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    let result = url.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  },
  /*
		获取日期函数 返回2018-06-06
		AddDayCount 天数
		getDateStr(0) //获取当前日期
		getDateStr(-10) //获取前10天日期
		getDateStr(20) //获取后20天日期
       */
  getDateStr(AddDayCount, type = 'datetime') {
    let date = new Date()
    date.setDate(date.getDate() + AddDayCount)
    return this.getDateAll(date)
  },
  getDateAll(date, type) {
    let year = date.getFullYear()
    //day获取当前几号，不足10补0
    let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    //month获取当前月份的日期，不足10补0
    let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    let hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    let minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    let seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
    let newDate = year + '-' + month + '-' + day
    if (type === 'datetime') {
      newDate += ' ' + hours + ':' + minutes + ':' + seconds
    }
    return newDate
  },
  //获取周一和周日 日期，返回两种格式时间
  getDateWeek() {
    let now = new Date()
    let nowTime = now.getTime()
    let day = now.getDay()
    let oneDayLong = 1000 * 60 * 60 * 24
    let MondayTime = nowTime - (day - 1) * oneDayLong
    let SundayTime = nowTime + (7 - day) * oneDayLong
    let monday = new Date(MondayTime)
    let sunday = new Date(SundayTime)
    return {
      first: this.getDateAll(monday),
      last: this.getDateAll(sunday),
      firstDate: monday,
      lastDate: sunday
    }
  },
  //获取月初与月末 日期，返回两种时间格式
  getDateMonth() {
    let dateFirter = new Date()
    let dateLast = new Date()
    dateFirter.setDate(1)

    let currentMonth = dateLast.getMonth()
    let nextMonth = ++currentMonth
    let nextMonthFirstDay = new Date(dateLast.getFullYear(), nextMonth, 1)
    let oneDay = 1000 * 60 * 60 * 24
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
    let cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖')
    let cnIntRadice = new Array('', '拾', '佰', '仟')
    let cnIntUnits = new Array('', '万', '亿', '兆')
    let cnDecUnits = new Array('角', '分', '毫', '厘')
    let cnInteger = '整'
    let cnIntLast = '元'
    //最大处理的数字
    let maxNum = 999999999999999.9999
    let integerNum
    let decimalNum
    let chineseStr = ''
    let parts
    if (money === '') {
      return ''
    }
    money = parseFloat(money)
    if (money >= maxNum) {
      //超出最大处理数字
      return ''
    }
    if (money === 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger
      return chineseStr
    }
    //转换为字符串
    money = money.toString()
    if (money.indexOf('.') === -1) {
      integerNum = money
      decimalNum = ''
    } else {
      parts = money.split('.')
      integerNum = parts[0]
      decimalNum = parts[1].substr(0, 4)
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      let zeroCount = 0
      let IntLen = integerNum.length
      for (let i = 0; i < IntLen; i++) {
        let n = integerNum.substr(i, 1)
        let p = IntLen - i - 1
        let q = p / 4
        let m = p % 4
        if (n === '0') {
          zeroCount++
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0]
          }
          //归零
          zeroCount = 0
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
        }
        if (m === 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q]
        }
      }
      chineseStr += cnIntLast
    }
    //小数部分
    if (decimalNum !== '') {
      let decLen = decimalNum.length
      for (let i = 0; i < decLen; i++) {
        let n = decimalNum.substr(i, 1)
        if (n !== '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i]
        }
      }
    }
    if (chineseStr === '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger
    } else if (decimalNum === '') {
      chineseStr += cnInteger
    }
    return chineseStr
  },
  /*
		显示数字小数位数
		number 要处理的数字或数字字符串
		digit 截取位数,四舍五入
		toFixed(1.1245, 3)
      */
  toFixed(number, digit) {
    if (number) {
      //也可以用第三方扩展
      if (digit) {
        return parseFloat(number).toFixed(digit)
      } else {
        return parseFloat(number)
      }
    }
  },
  /*protoType('newString')
		'abc,123.aaa'.newString() //abc123aaa
		扩展原生字符串属性，需谨慎命名
		attr 要扩展的属性
		
      */
  protoType(attr) {
    if (typeof String.prototype[attr] === 'undefined') {
      String.prototype[attr] = function () {
        let s = this
        s = s.replace(/\.|\,/g, '') //过滤逗号和点
        return s
      }
    }
  },
  //检测图片坏链
  badChain(id) {
    let _sel = $(id)
    _sel.each(function () {
      //执行遍历
      let _this = $(this)
      if (_this.attr('src') === '') {
        //判断src属性是否为空
        _this.attr('src', 'images/nopic.jpg') //设置src属性
      }
      _this.error(function () {
        //加载错误执行
        _this.attr('src', 'images/nopic.jpg')
      })
    })
  },
  //设置cookie
  setCookie(cname, cvalue, exdays = 7) {
    let exp = new Date()
    exp.setTime(exp.getTime() + exdays * 24 * 60 * 60 * 1000)
    document.cookie = cname + '=' + escape(cvalue) + '; path=/; expires=' + exp.toGMTString()
  },
  //读取cookie
  getCookie(cname) {
    let strcookie = document.cookie //获取cookie字符串
    let arrcookie = strcookie.split('; ') //分割
    //遍历匹配
    for (let i = 0; i < arrcookie.length; i++) {
      let arr = arrcookie[i].split('=')
      if (arr[0] === cname) {
        return arr[1]
      }
    }
    return ''
  },
  //删除cookie
  removeCookie(cname) {
    this.setCookie(cname, '', -1)
  },
  //设置缓存
  setCache(cname, cvalue) {
    window.localStorage.setItem(cname, JSON.stringify(cvalue))
  },
  //读取缓存
  getCache(cname) {
    return window.localStorage.getItem(cname)
  },
  //删除缓存
  removeCache() {
    window.localStorage.clear()
  },
  //判断是否是数组 返回1 整数 2正浮点 3 负浮点数
  isNumber(val) {
    let regNum = /^[1-9]\d*$/ //整数
    let regPos = /^\d+(\.\d+)?$/ //正浮点数
    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/ //负浮点数
    if (regNum.test(val)) {
      return 1
    } else if (regPos.test(val)) {
      return 2
    } else if (regNeg.test(val)) {
      return 3
    } else {
      return 0
    }
  },
  /*
		获取数组中的最大值或最小值
		type = max 最大值
		type = min 最小值
       */
  getArrayMax(array, type = max) {
    return Math[type].apply(Math, array)
  },
  //倒计时
  countDown(second) {
    let time = ''
    const checkTime = params => {
      if (params.toString().length === 1) {
        params = '0' + params
      }
      return params
    }
    if (second) {
      let s = second % 60 //秒
      let m = parseInt((second / 60) % 60) //分
      let h = parseInt(second / 3600) //时
      let interval = setInterval(function () {
        s--
        s = checkTime(s)
        m = checkTime(m)
        h = checkTime(h)
        if (s <= 0) {
          s = 59
          s = checkTime(s)
          m--
          m = checkTime(m)
          if (m <= 0) {
            m = 59
            m = checkTime(m)
            h--
            h = checkTime(h)
            if (h <= 0) {
              time = ''
              clearInterval(interval)
            }
          }
        }
        time = h + ':' + m + ':' + s
        if (time && (h > 0 || time !== '-1:59:59')) {
          //倒计时逻辑写到这里
          console.log(time)
        }
      }, 1000)
    }
  },
  //元素滚动至固定位置
  scrollElement(id, height = 0) {
    document.getElementsByClassName(id)[0].scrollTop = height
  },
  //检测是否为空对象
  checkObj(obj) {
    let state = false
    if (JSON.stringify(obj) === '{}') {
      state = true
    }
    return state
  },
  //处理发布时间格式
  formatMsgTime(timespan) {
    let dateTime = new Date(timespan)
    let year = dateTime.getFullYear()
    let month = dateTime.getMonth() + 1
    let day = dateTime.getDate()
    let hour = dateTime.getHours()
    let minute = dateTime.getMinutes()
    let second = dateTime.getSeconds()
    let now = new Date()
    let now_new = now.getTime()
    let newTimespan = dateTime.getTime()
    let milliseconds = 0
    let timeSpanStr

    milliseconds = now_new - newTimespan

    if (milliseconds <= 1000 * 60 * 1) {
      timeSpanStr = '刚刚'
    } else if (1000 * 60 * 1 < milliseconds && milliseconds < 1000 * 60 * 60) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60)) + '分钟前'
    } else if (1000 * 60 * 60 * 1 <= milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
    } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
    } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
      timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
    } else {
      timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    }
    return timeSpanStr
  },
  // uuid 生成工具
  getUuid(len = 20, radix) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    let uuid = []
    radix = radix || chars.length
    if (len) {
      for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
    } else {
      let r
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16)
          uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
        }
      }
    }

    return uuid.join('')
  },
  //滚动到顶部
  goTop(id) {
    let $goTop = $(id)
    let $footerBtns = $('.footer .footerBtns')
    let scrollHeight = 0
    $goTop.click(function () {
      $('body,html').animate(
        {
          scrollTop: '0'
        },
        500
      )
    })
    //监听浏览器滚动
    $(window).scroll(function () {
      let scrollTop = $(this).scrollTop()
      if (scrollHeight <= scrollTop) {
        $goTop.show(300)
        $footerBtns.addClass('close')
      } else {
        $goTop.hide(300)
        $footerBtns.removeClass('close')
      }
      setTimeout(function () {
        scrollHeight = scrollTop
      }, 0)
    })
  },
  /*删除数组中的某一个对象
	_arr:数组
	_obj:需删除的对象
	*/
  removeAaary(_arr, _obj) {
    let length = _arr.length
    for (let i = 0; i < length; i++) {
      if (JSON.stringify(_arr[i]) === JSON.stringify(_obj)) {
        if (i === 0) {
          _arr.shift() //删除并返回数组的第一个元素
          return _arr
        } else if (i === length - 1) {
          _arr.pop() //删除并返回数组的最后一个元素
          return _arr
        } else {
          _arr.splice(i, 1) //删除下标为i的元素
          return _arr
        }
      }
    }
  },
  /*
	文件流转base64
	file 文件流转
	callBack 回调函数
	*/
  fileToBase64(file, callBack) {
    let fd = new FileReader()
    fd.readAsDataURL(file)
    fd.onload = e => {
      callBack(e.target.result)
    }
  },
  //百度获取当前城市API
  getLocation() {
    $.getScript('http://api.map.baidu.com/location/ip?ak=skb8j0Ttecitx0qGInpCfVnHlfR5WgFV&callback=showLocation')
  },
  // 计算两个日期时间差
  getDays(startDate, endDate) {
    if (!startDate || !endDate) {
      return '-'
    }
    const formatData = str => {
      if (!str) {
        return ''
      }
      return str.substring(0, 10)
    }
    let startDateStr = formatData(startDate).split('-') //将日期字符串分隔为数组,数组元素分别为年.月.日
    //根据年 . 月 . 日的值创建Date对象
    let startDateObj = new Date(startDateStr[0], startDateStr[1] - 1, startDateStr[2])
    let endDateStr = formatData(endDate).split('-')
    let endDateObj = new Date(endDateStr[0], endDateStr[1] - 1, endDateStr[2])
    let t1 = startDateObj.getTime()
    let t2 = endDateObj.getTime()
    let dateTime = 1000 * 60 * 60 * 24 //每一天的毫秒数
    let minusDays = Math.floor((t2 - t1) / dateTime) //计算出两个日期的天数差
    let days = Math.abs(minusDays) //取绝对值
    return days
  },
  /*
	重新生成对应的数组
	array 原数组
	subGroupLength 每几条重新生成新数组
	*/
  handleList(array, subGroupLength){
	let index = 0
	const newArray = []
	while (index < array.length) {
	  newArray.push(array.slice(index, (index += subGroupLength)))
	}
	return newArray
  }
}
