
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
```

