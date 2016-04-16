/**
*节假日
*@Time 2016-4-15
*/
var festival = {
	//公历节日
	sFtv :["0101 元旦",
		"0214 情人节",
		"0308 妇女节",
		"0312 植树节",
		"0315 消费者权益日",
		"0401 愚人节",
		"0501 劳动节",
		"0504 青年节",
		"0512 护士节",
		"0601 儿童节",
		"0701 建党节",
		"0801 建军节",
		"0910 教师节",
		"1001 国庆节",
		"1006 老人节",
		"1024 联合国日",
		"1224 平安夜",
		"1225 圣诞节"],
	//农历节日
	lFtv : ["0101 春节",
		"0115 元宵节",
		"0505 端午节",
		"0707 七夕节",
		"0715 中元节",
		"0815 中秋节",
		"0909 重阳节",
		"1208 腊八节",
		"1224 小年"],
	/**
	*根据公历年月日，得到公历节日
	*/	
	getSolarFtv:function(year,month,day){
		var sFtv = festival.sFtv;
		for (var i=0;i<sFtv.length;i++){	//公历节日
			if (parseInt(sFtv[i].substr(0,2))==month){
				if (parseInt(sFtv[i].substr(2,4))==day){
					return sFtv[i].substr(5);
				}
			}
		}
		if (month==5){	//母亲节
			var week = new Date(year,parseInt(month)-1,1).getDay();
			var matherDay;
			if(week == 0){
				matherDay = 8;
			}else{
				matherDay = 8+(7-week); 
			}
			if(day == matherDay){
				return "母亲节";
			}
			
		}
	    if (month==6){	//父亲节
			var week = new Date(year,parseInt(month)-1,1).getDay();
			var matherDay;
			if(week == 0){
				matherDay = 15;
			}else{
				matherDay = 15+(7-week); 
			}
			if(day == matherDay){
				return "父亲节";
			}
		}
		return "";
	},
	/**
	*根据农历年月日，得到农历节日
	*/
	getLunarFtv:function(year,month,day){
		var lFtv = festival.lFtv;
		for (var i=0;i<lFtv.length;i++){	//农历节日
			if (parseInt(lFtv[i].substr(0,2))==month){
				if (parseInt(lFtv[i].substr(2,4))==day){
					return lFtv[i].substr(5);
				}
			}
		}
		return "";
	}
	
};