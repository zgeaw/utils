
# utils

## 介绍

**utils** —— 常用函数封装




## 包含函数

```javascript
	//数组排序 
	Array.setSort('creationTime')

	//获取地址栏参数
	getUrlStr('id')

	//获取日期函数
	getDateStr(0) //获取当前日期

	//获取周一和周日 日期，返回两种格式时间
	getDateWeek()

	//获取月初与月末 日期，返回两种时间格式
	getDateMonth()

	//数字转化为中文大写
	convertCurrency(500.00) //伍佰元整

	//echart图表 通用封装
	echartInit('echartBar', ['2012', '2013'], ['1', '2', '3'])

	//显示数字小数位数
	toFixed(1.1245, 3) //1.125

	//扩展原生字符串属性，需谨慎命名
	protoType('newString')
	'abc,123.aaa'.newString() //abc123aaa	
	
	//检测图片坏链
	badChain('#hadimg') 
	
	//设置cookie
	setCookie('id', 123, 7) 
	
	//读取cookie
	getCookie('id') 
	
	//删除cookie
	removeCookie('id') 
	
	//设置缓存
	setCache('name', 'abc') 
	
	//读取缓存
	getCache('name') 
	
	//删除缓存
	removeCache() 
	
	//判断是否是数组 返回1 整数 2正浮点 3 负浮点数
	isNumber(666) 
	
	//获取数组中的最大值或最小值
	getArrayMax([1,2,3], 'max') 
	
	//元素滚动至固定位置
	scrollElement('div', 0) 
	
	//检测是否为空对象
	checkObj(Object) 
	
	//处理发布时间格式，返回 刚刚/几分钟前/几小时前/几天前
	formatMsgTime('2018-10-01 11:00:00') 
	
	//uuid 生成工具，随机生成20位数字和大小写字母组合
	getUuid() 
```

