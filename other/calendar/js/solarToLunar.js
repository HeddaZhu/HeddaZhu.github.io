/**
*公历转换为农历
*@Time 2016-4-15
*/
var calendar = {
 
 /**
 *1900-2100农历信息表（这个是大家用的最多的）
 * 1 - 4位: 表示当年有无闰年，有的话，为闰月的月份，没有的话，为0。
 * 5 -16位：为除了闰月外的正常月份是大月还是小月，1为30天，0为29天。
 *         从1月到12月对应的是第16位到第5位。
 * 17-20位：表示闰月是大月还是小月，仅当存在闰月的情况下有意义。
 */
 lunarInfo:[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
 0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
 0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
 0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
 0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
 0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
 0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
 0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
 0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
 0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
 0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
 0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
 0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
 0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
 0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
 0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
 0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
 0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
 0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
 0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
 0x0d520],//2100
 
 /**
 * 天干表
 */
 Gan:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],
 
 /**
 * 地支表 
 */
 Zhi:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],
 
 /**
 * 生肖表
 */
 Animals:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],
 
 /**
 * 节气表
 */
 solarTerm:["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"],
 
 
 /**
 * 节气表(1900-2100)
 */
 sTermInfo:[ '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',
 '97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
 '97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa',
 '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
 'b027097bd097c36b0b6fc9274c91aa','9778397bd19801ec9210c965cc920e','97b6b97bd19801ec95f8c965cc920f',
 '97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2','9778397bd197c36c9210c9274c91aa',
 '97b6b97bd19801ec95f8c965cc920e','97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
 '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec95f8c965cc920e','97bcf97c3598082c95f8e1cfcc920f',
 '97bd097bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e',
 '97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
 '97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
 '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',
 '97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
 '97bcf97c359801ec95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
 '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
 '9778397bd097c36b0b6fc9210c8dc2','9778397bd19801ec9210c9274c920e','97b6b97bd19801ec95f8c965cc920f',
 '97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
 '97b6b97bd19801ec95f8c965cc920f','97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
 '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e','97bd07f1487f595b0b0bc920fb0722',
 '7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
 '97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
 '97b6b97bd19801ec9210c965cc920e','97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
 '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf7f1487f531b0b0bb0b6fb0722',
 '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
 '97bcf7f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
 '97b6b97bd19801ec9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
 '9778397bd097c36b0b6fc9210c91aa','97b6b97bd197c36c9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722',
 '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
 '97b6b7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
 '9778397bd097c36b0b70c9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
 '7f0e397bd097c35b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
 '7f0e27f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
 '97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
 '9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
 '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
 '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
 '97b6b7f0e47f531b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
 '9778397bd097c36b0b6fc9210c91aa','97b6b7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
 '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','977837f0e37f149b0723b0787b0721',
 '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c35b0b6fc9210c8dc2',
 '977837f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
 '7f0e397bd097c35b0b6fc9210c8dc2','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
 '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','977837f0e37f14998082b0787b06bd',
 '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
 '977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
 '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
 '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
 '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
 '977837f0e37f14998082b0723b06bd','7f07e7f0e37f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
 '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b0721',
 '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f595b0b0bb0b6fb0722','7f0e37f0e37f14898082b0723b02d5',
 '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f531b0b0bb0b6fb0722',
 '7f0e37f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
 '7f0e37f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
 '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35',
 '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
 '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f149b0723b0787b0721',
 '7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0723b06bd',
 '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722','7f0e37f0e366aa89801eb072297c35',
 '7ec967f0e37f14998082b0723b06bd','7f07e7f0e37f14998083b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
 '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14898082b0723b02d5','7f07e7f0e37f14998082b0787b0721',
 '7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
 '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
 '665f67f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
 '7f0e36665b66a449801e9808297c35','665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
 '7f07e7f0e47f531b0723b0b6fb0721','7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
 '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],
 
 
 /**
 * 数字转中文 
 */
 nStr1:['日','一','二','三','四','五','六','七','八','九','十'],
 
 
 /**
 * 日期转农历
 */
 nStr2:['初','十','廿','卅'],
 
 
 /**
 * 月份转农历
 */
 nStr3:['正','二','三','四','五','六','七','八','九','十','冬','腊'],
 
 
 /**
 * 农历年的总天数
 */
 lYearDays:function(y) {
 var i, sum = 348;
 for(i=0x8000; i>0x8; i>>=1) { sum += (calendar.lunarInfo[y-1900] & i)? 1: 0; }
 return(sum+calendar.leapDays(y));
 },
 
 
 /**
 * 农历年闰月,若没有闰月 则返回0
 */
 leapMonth:function(y) { 
 return(calendar.lunarInfo[y-1900] & 0xf);
 },
 
 
 /**
 * 农历年闰月的天数 若没有闰月则返回0
 */
 leapDays:function(y) {
 if(calendar.leapMonth(y)) { 
 return((calendar.lunarInfo[y-1900] & 0x10000)? 30: 29); 
 }
 return(0);
 },
 
 
 /**
 * 农历年某月（非闰月）的总天数
 */
 monthDays:function(y,m) {
 if(m>12 || m<1) {return -1}//月份参数从1至12，参数错误返回-1
 return( (calendar.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
 },
 
 /**
 * 天干地支
 *@ parame offset相对于甲子的偏移量
 */
 toGanZhi:function(offset) {
 return(calendar.Gan[offset%10]+calendar.Zhi[offset%12]);
 },
 
 
 /**
 * 公历年第n(1-24)个节气的公历日期
 */
 getTerm:function(y,n) {
 if(y<1900 || y>2100) {return -1;}
 if(n<1 || n>24) {return -1;}
 var _table = calendar.sTermInfo[y-1900];
 var _info = [
 parseInt('0x'+_table.substr(0,5)).toString(),
 parseInt('0x'+_table.substr(5,5)).toString(),
 parseInt('0x'+_table.substr(10,5)).toString(),
 parseInt('0x'+_table.substr(15,5)).toString(),
 parseInt('0x'+_table.substr(20,5)).toString(),
 parseInt('0x'+_table.substr(25,5)).toString()
 ];
 var _calday = [
 _info[0].substr(0,1),
 _info[0].substr(1,2),
 _info[0].substr(3,1),
 _info[0].substr(4,2),
 
 _info[1].substr(0,1),
 _info[1].substr(1,2),
 _info[1].substr(3,1),
 _info[1].substr(4,2),
 
 _info[2].substr(0,1),
 _info[2].substr(1,2),
 _info[2].substr(3,1),
 _info[2].substr(4,2),
 
 _info[3].substr(0,1),
 _info[3].substr(1,2),
 _info[3].substr(3,1),
 _info[3].substr(4,2),
 
 _info[4].substr(0,1),
 _info[4].substr(1,2),
 _info[4].substr(3,1),
 _info[4].substr(4,2),
 
 _info[5].substr(0,1),
 _info[5].substr(1,2),
 _info[5].substr(3,1),
 _info[5].substr(4,2),
 ];
 return parseInt(_calday[n-1]);
 },
 
 
 /**
 * 农历数字月份通俗表示
 */
 toChinaMonth:function(m) { // 月 => \u6708
 if(m>12 || m<1) {return -1} //若参数错误 返回-1
 var s = calendar.nStr3[m-1];
 s+= "\u6708";//加上月字
 return s;
 },
 
 
 /**
 * 农历日期数字表示
 */
 toChinaDay:function(d){ 
 var s;
 switch (d) {
 case 10:
 s = '\u521d\u5341'; break;
 case 20:
 s = '\u4e8c\u5341'; break;
 break;
 case 30:
 s = '\u4e09\u5341'; break;
 break;
 default :
 s = calendar.nStr2[Math.floor(d/10)];
 s += calendar.nStr1[d%10];
 }
 return(s);
 },
 
 
 /**
 * 年份转生肖
 */
 getAnimal: function(y) {
 return calendar.Animals[(y - 4) % 12]
 },
 
 
 /**
 * 传入公历年月日获得详细的公历、农历信息
 */
 solarToLunar:function (y,m,d) { //参数区间1900.1.31~2100.12.31
 if(y<1900 || y>2100) {return -1;}//年份限定、上限
 if(y==1900&&m==1&&d<31) {return -1;}//下限
 if(!y) { //参数为空--当天
 var objDate = new Date();
 }else {
 var objDate = new Date(y,parseInt(m)-1,d)
 }
 var i, leap=0, temp=0;
 //修正ymd参数
 var y = objDate.getFullYear(),m = objDate.getMonth()+1,d = objDate.getDate();
 var offset = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
 for(i=1900; i<2101 && offset>0; i++) { temp=calendar.lYearDays(i); offset-=temp; }
 if(offset<0) { offset+=temp; i--; }
 
 //是否今天
 var isTodayObj = new Date(),isToday=false;
 if(isTodayObj.getFullYear()==y && isTodayObj.getMonth()+1==m && isTodayObj.getDate()==d) {
 isToday = true;
 }
 //星期几
 var nWeek = objDate.getDay(),cWeek = calendar.nStr1[nWeek];
 if(nWeek==0) {nWeek =7;}//数字表示周几顺应天朝周一开始的惯例
 //农历年
 var year = i;
 
 var leap = calendar.leapMonth(i); //闰哪个月
 var isLeap = false;
 
 //效验闰月
 for(i=1; i<13 && offset>0; i++) {
 //闰月
 if(leap>0 && i==(leap+1) && isLeap==false){ 
 --i;
 isLeap = true; temp = calendar.leapDays(year); //计算农历闰月天数
 }
 else{
 temp = calendar.monthDays(year, i);//计算农历普通月天数
 }
 //解除闰月
 if(isLeap==true && i==(leap+1)) { isLeap = false; }
 offset -= temp;
 }
 
 if(offset==0 && leap>0 && i==leap+1)
 if(isLeap){
 isLeap = false;
 }else{ 
 isLeap = true; --i;
 }
 if(offset<0){ offset += temp; --i; }
 //农历月
 var month = i;
 //农历日
 var day = offset + 1;
 
 //天干地支处理
 var sm = m-1;
 var term3 = calendar.getTerm(year,3); //该农历年立春日期
 var gzY = calendar.toGanZhi(year-4);//普通按年份计算，下方尚需按立春节气来修正
 
 //依据立春日进行修正gzY
 if(sm<2 && d<term3) {
 gzY = calendar.toGanZhi(year-4);
 }else {
 gzY = calendar.toGanZhi(year-4);
 }
 
 //月柱 1900年1月小寒以前为 丙子月(60进制12)
 var firstNode = calendar.getTerm(y,(m*2-1));//返回当月「节」为几日开始
 var secondNode = calendar.getTerm(y,(m*2));//返回当月「节」为几日开始
 
 //依据12节气修正干支月
 var gzM = calendar.toGanZhi((y-1900)*12+m+11);
 if(d>=firstNode) {
 gzM = calendar.toGanZhi((y-1900)*12+m+12);
 }
 
 //传入的日期的节气与否
 var isTerm = false;
 var Term = null;
 if(firstNode==d) {
 isTerm = true;
 Term = calendar.solarTerm[m*2-2];
 }
 if(secondNode==d) {
 isTerm = true;
 Term = calendar.solarTerm[m*2-1];
 }
 //日柱 当月一日与 1900/1/1 相差天数
 var dayCyclical = Date.UTC(y,sm,1,0,0,0,0)/86400000+25567+10;
 var gzD = calendar.toGanZhi(dayCyclical+d-1);
 
 return {'lYear':year,'lMonth':month,'lDay':day,'Animal':calendar.getAnimal(year),'IMonthCn':(isLeap?"\u95f0":'')+calendar.toChinaMonth(month),'IDayCn':calendar.toChinaDay(day),'cYear':y,'cMonth':m,'cDay':d,'gzYear':gzY,'gzMonth':gzM,'gzDay':gzD,'isToday':isToday,'isLeap':isLeap,'nWeek':nWeek,'ncWeek':"\u661f\u671f"+cWeek,'isTerm':isTerm,'Term':Term};
 }
};