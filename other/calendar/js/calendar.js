/*
*规划界面布局，添加处理相应事件
*@Time  2016-4-13
*/
var minYear=1901;//所显示的最小年份
var maxYear=2050;//所显示的最大年份

window.onload = function(){
	createSelectYear();  //年份下拉列表选项
 	createSelectMonth();  //月份下拉列表选项
 	createCalendarTable(new Date().getFullYear(),new Date().getMonth());//左边日历
 	setRigth(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());//右边详细信息
 	adjacentMonth();//点击'<'或'>'，显示相邻月份；点击'返回今天'，定位到当前时间
}

/**
* 创建年份下拉列表
*/
function createSelectYear(){
	//1.创建下拉列表
	getObjByClass("select-year").innerHTML='<select name="calendar-select-year" id="calendar-select-year"></select>';
	var nowTime =new Date();
	var nowYear=nowTime.getFullYear();
	var selectYear = getObjByID("calendar-select-year");
	for (var i = minYear; i <=maxYear; i++) {
			selectYear.options.add(new Option(i+"年",i));
	}
	selectYear.options[nowYear-minYear].selected = true;
	//2.点击事件
	selectYear.onchange = function(){
		var aclick=getObjByClass("calendar-aclick");
		
		createCalendarTable(getObjByID("calendar-select-year").value,getObjByID("calendar-select-month").value);
		if(!aclick){
			//说明没选,或选的当天,算出选的这个月有多少天,与原来的那个月的天数一对比,如果原来的天数大于现在的天数,那么对换
			//这里先算当前月当前天,然后算出选择的那个月总天数,然后对比,如果当前天大于选择的那个月那天,对换
		 var pervdays1=getCurrMonthLastDay(getObjByID("calendar-select-year").value,getObjByID("calendar-select-month").value);
		    	if(new Date().getDate()>pervdays1){
					setRigth(getObjByID("calendar-select-year").value,getObjByID("calendar-select-month").value,pervdays1);	
				}else{
					setRigth(getObjByID("calendar-select-year").value,getObjByID("calendar-select-month").value,new Date().getDate());
				}
		}else{
			var adate=aclick.getAttribute("date");
			var aarr=adate.split("-");
			aarr[0]=parseInt(aarr[0]);
			aarr[1]=parseInt(aarr[1]);
			aarr[2]=parseInt(aarr[2]);
			var pervdays=getCurrMonthLastDay(getObjByID("calendar-select-year").value,getObjByID("calendar-select-month").value);
			if(aarr[2]>pervdays){
				aarr[2]=pervdays;
			}
				setRigth(getObjByID("calendar-select-year").value,getObjByID("calendar-select-month").value,aarr[2]);	
			
		}
	};
}
/**
* 创建月份下拉列表
*/
function createSelectMonth(){
	//1.创建下拉列表
	var selectMonth=document.createElement('select');
	selectMonth.name="calendar-select-month";
	selectMonth.id="calendar-select-month";
	var nowTime =new Date();
	var nowMonth=nowTime.getMonth();
	for (var i = 0; i <12; i++) {
		selectMonth.options.add(new Option((i+1)+"月",i));
	}
	selectMonth.options[nowMonth].selected = true;
	var next=getObjByClass("month-next");
    var parent=next.parentNode;
    parent.insertBefore(selectMonth,next);
    //2.点击事件
    selectMonth.onchange = function(){
    	var aclick=getObjByClass("calendar-aclick");
		createCalendarTable(getObjByID("calendar-select-year").value,selectMonth.options[selectMonth.selectedIndex].value);
		if(!aclick){
			//说明没选或当天,算出这个月有多少天,与原来的那个月的天数一对比,如果原来的天数大于现在的天数,那么定位到这个月最后一天
			//这里先算当前月当前天,然后算出选择的那个月总天数,然后对比,如果当前天大于选择的那个月那天,对换
		 var pervdays1=getCurrMonthLastDay(getObjByID("calendar-select-year").value,selectMonth.options[selectMonth.selectedIndex].value);
		    	if(new Date().getDate()>pervdays1){
					setRigth(getObjByID("calendar-select-year").value,selectMonth.options[selectMonth.selectedIndex].value,pervdays1);	
				}else{
					setRigth(getObjByID("calendar-select-year").value,selectMonth.options[selectMonth.selectedIndex].value,new Date().getDate());
				}
		}else{
			var adate=aclick.getAttribute("date");
			var aarr=adate.split("-");
			aarr[0]=parseInt(aarr[0]);
			aarr[1]=parseInt(aarr[1]);
			aarr[2]=parseInt(aarr[2]);
			var pervdays=getCurrMonthLastDay(getObjByID("calendar-select-year").value,selectMonth.options[selectMonth.selectedIndex].value);
			if(aarr[2]>pervdays){
				aarr[2]=pervdays;
			}
				setRigth(getObjByID("calendar-select-year").value,selectMonth.options[selectMonth.selectedIndex].value,aarr[2]);
		}
    };
}
/**
*传入公历年月,创建相应的日历
*/
function createCalendarTable(year,month){
	var tbody= getObjByClass("content-table-body");
	tbody.innerHTML = "";
	//先得到当月第一天是星期几,然后计算要显示的前面几天(上个月最后几天).
	var firstDate = new Date(year,month,1);
	var weekday=firstDate.getDay();
	var lastMonthDays;//要显示的上个月的天数
	if(weekday!=0){
		lastMonthDays=weekday-1;
	}else{
		lastMonthDays=weekday+6;
	}
	var lastMonthLastDay = getLastMonthLastDay(year,month);
	var lastMonthFirstDay= lastMonthLastDay-lastMonthDays+1;
	var tr=document.createElement('tr');
	tr.style.borderBottom="1px solid #e3e4e6";
	for(var i=lastMonthFirstDay;i<=lastMonthLastDay;i++){
		var td=document.createElement("td");
		var a= createA(parseInt(month)==0?parseInt(year)-1:year,parseInt(month)==0?11:parseInt(month)-1,i);
		a.style.color="#BFBFC5";
		td.appendChild(a);
		td.setAttribute("class","calendar-lastMonthDays");
		tr.appendChild(td);
	}
	//当月
	var startDays=8-weekday==8?1:8-weekday;
	for(var i=1;i<=startDays;i++){
		var td=document.createElement("td");
		var b=createA(year,month,i);
		td.appendChild(b);
		tr.appendChild(td);
	}
	tbody.appendChild(tr);
	//当月最后一天
	var currMonthLastDay=getCurrMonthLastDay(year,month);
	//第二行的起点
	var secondStartDay=currMonthLastDay-(currMonthLastDay-startDays)+1;
	//当月剩余的天数
	var remains=currMonthLastDay-startDays;
	//循环次数
	var loops=Math.ceil(remains/7);//向上取整


	var nextCount=1;
	for(var i=0;i<loops;i++){
		var tr1=document.createElement('tr');
		if(i!=loops-1){
			tr1.style.borderBottom="1px solid #e3e4e6";
		}
		for(var n=1;n<=7;n++){
			var td=document.createElement('td');
			if(startDays==0){
				//要显示的下个月
				var c=createA(parseInt(month)+1==parseInt(12)?parseInt(year)+1:year,parseInt(month)+1==parseInt(12)?0:parseInt(month)+1,nextCount);
				c.style.color="#BFBFC5";
				td.appendChild(c);
				td.setAttribute("class","calendar-nextMonthDays");
				nextCount++;
				tr1.appendChild(td);
				continue;
			}else{
			startDays++;
			var d=createA(year,month,startDays);
			td.appendChild(d);
				if(startDays==currMonthLastDay){
					startDays=0;
				}
			tr1.appendChild(td);	
			}
		
		}
		tbody.appendChild(tr1);
	}
	setHolidayStyle();//weekend的样式
	setTrHeight();//table日期的行高
	setA(); //td a的事件
}
/**
* 显示前（后）一个月
*/
function adjacentMonth(){
	var lefta=getObjByClass("month-previous");
	var righta=getObjByClass("month-next");
	righta.onclick=function(){
		var monthselect=getObjByID("calendar-select-month");
		var monthvalue=parseInt(monthselect.value);
		var yearselect=getObjByID("calendar-select-year");
		var yearvalue=parseInt(yearselect.value);
		if(monthvalue==11){//进入下一年,更新
			if((yearvalue+1)<=maxYear){//查看有没有越界
				yearvalue+=1;
				monthvalue=0;
			}	
		}else{
			monthvalue+=1;
		}
		monthselect.value=monthvalue;
		yearselect.value=yearvalue;
		var aclick=getObjByClass("calendar-aclick");
		createCalendarTable(yearselect.value,monthselect.value);
		
		//如果没有找到,说明没有点击或当天
		if(!aclick){
		var pervdays1=getCurrMonthLastDay(yearselect.value,monthselect.value);
			if(new Date().getDate()>pervdays1){
				setRigth(yearselect.value,monthselect.value,pervdays1);	
			}else{
				setRigth(yearselect.value,monthselect.value,new Date().getDate());
			}
		}else{
		var adate=aclick.getAttribute("date");
		var aarr=adate.split("-");
		aarr[0]=parseInt(aarr[0]);
		aarr[1]=parseInt(aarr[1]);
		aarr[2]=parseInt(aarr[2]);
		var pervdays=getCurrMonthLastDay(aarr[0],aarr[1]);
		if(aarr[2]>pervdays){
			aarr[2]=pervdays;
		}
		setRigth(aarr[1]+1==12?aarr[0]+1:aarr[0],aarr[1]+1==12?0:aarr[1]+1,aarr[2]);	
		}
	}
	lefta.onclick=function(){
		var monthselect=getObjByID("calendar-select-month");
		var monthvalue=parseInt(monthselect.value);
		var yearselect=getObjByID("calendar-select-year");
		var yearvalue=parseInt(yearselect.value)
		if(monthvalue==0){//近入上一年
			if((yearvalue-1)>=minYear){
				yearvalue-=1;
				monthvalue=11;
			}
			
		}else{
			monthvalue-=1;
		}
		monthselect.value=monthvalue;
		yearselect.value=yearvalue;
		var aclick=getObjByClass("calendar-aclick");
		createCalendarTable(yearselect.value,monthselect.value);
		//如果没有,说明没有点击或当天
		if(!aclick){
		//这个时候向上一个月,那么	
		var pervdays1=getLastMonthLastDay(yearselect.value,monthselect.value);
			if(new Date().getDate()>pervdays1){
				setRigth(yearselect.value,monthselect.value,pervdays1);	
			}else{
				setRigth(yearselect.value,monthselect.value,new Date().getDate());
			}
		}else{
		var adate=aclick.getAttribute("date");
		var aarr=adate.split("-");
		aarr[0]=parseInt(aarr[0]);
		aarr[1]=parseInt(aarr[1]);
		aarr[2]=parseInt(aarr[2]);
		var pervdays=getLastMonthLastDay(aarr[0],aarr[1]);
			if(aarr[2]>pervdays){
				aarr[2]=pervdays;
			}
		setRigth(aarr[1]==0?aarr[0]-1:aarr[0],aarr[1]==0?11:aarr[1]-1,aarr[2]);	
		}
	}
	//点击按钮，返回今天
	var today=getObjByClass("select-today");
	today.onclick=function(){
		var monthselect=getObjByID("calendar-select-month");
		var yearselect=getObjByID("calendar-select-year");
		var date=new Date();
		monthselect.value=date.getMonth();
		yearselect.value=date.getFullYear();
		createCalendarTable(yearselect.value,monthselect.value);
		setRigth(date.getFullYear(),date.getMonth(),date.getDate());
		
	}
}
/*
*计算指定月的上个月最后一天
*/
function getLastMonthLastDay(year,month){
	//计算上个月的最后一天就是当月的0天
	var lastDay = new Date(year,month,0);
	return lastDay.getDate();
}
/*
*计算指定月的最后一天
*/
function getCurrMonthLastDay(year,month){
	var lastDay = new Date(year,parseInt(month)+1,0);
//计算当月的最后一天就是上月的0天
	if (month == 11) {
		year +=1;
		month = 0;
		lastDay = new Date(year,month,0);
	}
	
	return lastDay.getDate();
}

//创建a标签
function createA(year,month,date){
	//获取当前公历日期的农历信息
	var a=document.createElement("a");
	var lunar = calendar.solarToLunar(year,parseInt(month)+1,date);
	var content = '<span class="table-solar-date">'+date+'</span>';
	var solarFtv = festival.getSolarFtv(year,parseInt(month)+1,date);//公历节日
	var lunarFtv = festival.getLunarFtv(lunar.lYear,lunar.lMonth,lunar.lDay);//农历节日
	if(lunarFtv){
		content += '<span class="table-lunar-term">'+lunarFtv+'<span>';
	}else if (solarFtv) {
		if (solarFtv.length > 3) {
			a.setAttribute("title",solarFtv);
			content += '<span class="table-lunar-term">'+solarFtv.substr(0,3)+'..<span>';
		}else{
			content += '<span class="table-lunar-term">'+solarFtv+'<span>';
		}
		
	}else{
		if(lunar.isTerm){//24节气
			content += '<span class="table-lunar-term">'+lunar.Term+'<span>';
		}else{
			content += '<span class="table-lunar-date">'+lunar.IDayCn+'<span>';
		}
	}
	
	a.href="javascript:;";
	a.innerHTML=content;
	a.style.textDecoration="none";
	a.setAttribute("date",year+"-"+month+"-"+date);
	return a;
}
//给tbody中的td中的A设置事件，上个月的天数,这个月的天数,下个月的天数三种对应的事件
//这里还有个功能就是判断当前的A中日期是不是数据库中有带状态的日期,如果是就给相当的样式
function setA(){
	var tbody=getObjByClass("content-table-body");
	var arr=tbody.getElementsByTagName("a");
	for(var i=0;i<arr.length;i++){
		var date=arr[i].getAttribute("date");
		var datearr=date.split("-");
			if(arr[i].parentNode.className=="calendar-lastMonthDays"&&parseInt(datearr[0])>=minYear){
			arr[i].setAttribute("onclick","javascript:lastA("+datearr[0]+","+datearr[1]+","+datearr[2]+",this);javascript:stopBubble(this);")
			}else if(arr[i].parentNode.className=="calendar-nextMonthDays"&&parseInt(datearr[0])<=maxYear){
				arr[i].setAttribute("onclick","javascript:nextA("+datearr[0]+","+datearr[1]+","+datearr[2]+",this);javascript:stopBubble(this);")	
			}else{
			arr[i].setAttribute("onclick","javascript:setRigth("+datearr[0]+","+datearr[1]+","+datearr[2]+");javascript:stopBubble(this);");
			}
		// for(var n=0;n<jjrmodelidlist.length;n++){
		// 	if(formatByDate(jjrmodeltimelist[n])==formatByDate(date)){
		// 		if(jjrmodelztlist[n]==1){ //1上班
		// 			var span=document.createElement('span');
		// 			span.setAttribute("class","aboluo-td-a-ban");
		// 			arr[i].style.background="#f5f5f5";
		// 			arr[i].setAttribute("ztid",jjrmodelidlist[n]);
		// 			arr[i].setAttribute("jjrzt",jjrmodelztlist[n]);
		// 			span.innerHTML="班";
		// 			arr[i].appendChild(span);
		// 		}else if(jjrmodelztlist[n]==2){ //2休息
		// 			var span=document.createElement('span');
		// 			span.setAttribute("class","aboluo-td-a-xiu");
		// 			arr[i].setAttribute("ztid",jjrmodelidlist[n]);
		// 			arr[i].setAttribute("jjrzt",jjrmodelztlist[n]);
		// 			arr[i].style.background="#fff0f0";
		// 			span.innerHTML="休";
		// 			arr[i].appendChild(span);
		// 		}else if(jjrmodelztlist[n]==0){ // 这里为了保证操作过的节假日的唯一性,不给样式只设置a的ztid
		// 			arr[i].setAttribute("ztid",jjrmodelidlist[n]);
		// 			arr[i].setAttribute("jjrzt",jjrmodelztlist[n]);
		// 		}
		// 	}
		// }	
	}
}
/*
*设计右边栏
*/
function setRigth(year,month,day){
	//先清空
	getObjByClass("calendar-right-date").innerHTML="";
	getObjByClass("calendar-right-lunar").innerHTML="";
	// year=year.toString();
	// month=month.toString();
	// day=day.toString();
	//设置rigthdiv的marginleft;
	// var rigthdiv=getObjByClass("aboluo-rightdiv");
	// var w=getObjByClass("aboluo-w-700");
	// rigthdiv.style.marginLeft=(w.offsetWidth*0.7+4)+"px";  //设置margin-left

	//显示yyyy-mm-dd week
	var span=document.createElement('span');
	//var date=setdateinfo(year,month,day);
	span.innerHTML=formatByYMD(year,month,day);
	var span1=document.createElement('span');
	var date = new Date(year,month,day);
	var week=getWeek(date.getDay());
	span1.innerHTML=week;
	var rightDate=getObjByClass("calendar-right-date");
	rightDate.appendChild(span);
	rightDate.appendChild(span1);
	//显示day
	var rightDay=getObjByClass("calendar-right-day");
	rightDay.innerHTML=day;
	//实际在得到长宽时不能用style.height，得用.offsetHeight,但是设置的时候要用style.height=...
	rightDay.style.lineHeight=rightDay.offsetHeight+"px"; 
    
    // 显示农历
     var lunar = calendar.solarToLunar(parseInt(year),parseInt(month)+1,parseInt(day));
	var rightLundar = getObjByClass("calendar-right-lunar");
	var rightLundarContent = '<span>'+lunar.IMonthCn+lunar. IDayCn+'</span><br/>';
	rightLundarContent += '<span>'+lunar.gzYear+'年&nbsp;【'+lunar.Animal+'】</span><br/>';
	rightLundarContent += '<span>'+lunar.gzMonth+'月&nbsp;'+lunar.gzDay+'日</span>';
	rightLundar.innerHTML = rightLundarContent;
	setAClickStyle(year,month,day);
}
/**
*设置周末样式
*/
function setHolidayStyle(){
	var rows=getObjByClass("content-table-body").rows;
	for(var i=0;i<rows.length;i++){
		for(var j=0;j<rows[i].cells.length;j++){
			var cell=rows[i].cells[j];
			var a=rows[i].cells[j].childNodes[0];
			var adate=a.getAttribute("date");
			var arr=adate.split("-");
			var date=new Date();
			var year=date.getFullYear();
			var month=date.getMonth();
			var day=date.getDate();
			if(arr[0]==year && arr[1]==month && arr[2]==day){//今天
				cell.setAttribute("class","calendar-tdcurrToday");
				a.setAttribute("class","calendar-currToday");
			}
			if(j>=rows[i].cells.length-2 ){//周末
				if(cell.getAttribute("class")!="calendar-nextMonthDays" && cell.getAttribute("class")!="calendar-lastMonthDays"){
					a.style.color="red";
				}
			}
		}
	}
}
/**
*设置tr的高度
*/
function setTrHeight(){
	var table=getObjByClass("calendar-table");
	var thead=getObjByClass("content-table-head");
	var tbody=getObjByClass("content-table-body");
	var tbodyheight=table.offsetHeight-thead.offsetHeight;
	var rows=tbody.getElementsByTagName('tr');
	for(var i=0;i<rows.length;i++){
		rows[i].style.height=(tbodyheight/rows.length-2)+"px";
		var tds=rows[i].getElementsByTagName("td");
		for(var j=0;j<tds.length;j++){
			var a=tds[j].childNodes[0];
			a.style.width=(tds[j].offsetWidth-10)+"px";
			a.style.height=(tds[j].offsetHeight-7)+"px";
			a.style.lineHeight=(tds[j].offsetHeight-7)+"px";
		}
	}
}
//点击显示的日期，设置样式
function setAClickStyle(year,month,day){
	var a=getObjByClass("calendar-aclick");
	if (a) {
		a.className="";
	}
		
		var date=new Date();
		var year1=date.getFullYear();
		var month1=date.getMonth();
		var day1=date.getDate();
		if(year1==year && month==month1 && day1==day){
		}else{
			var tbody=getObjByClass("content-table-body");
			var arr=tbody.getElementsByTagName("a");
			for(var i=0;i<arr.length;i++){
				var date=arr[i].getAttribute("date");
				var datearr=date.split("-");
				if(datearr[0]==year && datearr[1]==month && datearr[2]==day){
					arr[i].setAttribute("class","calendar-aclick");
				}
			}
		}

}
//点击上个月的显示日期跳转月份
function lastA(year,month,day){
	createCalendarTable(year,month);  //创建对应的table(日期)
	setRigth(year,month,day);    //设置右边明细栏内容
	updateSelect(year,month);    //改变年月select选项
}

//点击下个月的显示日期跳转月份
function nextA(year,month,day){
	createCalendarTable(year,month);
	setRigth(year,month,day);
	updateSelect(year,month);
}
 //改变年月下拉列表select的值
function updateSelect(year,month){
	var selectmonth=getObjByID("calendar-select-month");
	var selectyear=getObjByID("calendar-select-year");
	selectmonth.value=month;
	selectyear.value=year;
}
/**
*将日期转换为yyyy-mm-dd格式
*/
function formatByYMD(year,month,day){
	year=year.toString();
	month=(parseInt(month)+1).toString();
	day=day.toString();
	return year+"-"+(month.length<2?'0'+month:month)+"-"+(day.length<2?'0'+day:day);
}
function formatByDate(date){
	date=date.substring(0,10);
	var daxx=date.toString().split("-");
	return daxx[0]+"-"+(daxx[1].length<2?'0'+daxx[1]:daxx[1])+"-"+(daxx[2].length<2?'0'+daxx[2]:daxx[2]);
}
/**
*阻止冒泡
*/
function stopBubble(e){
	if(e && e.stopPropagation){// 别的浏览器
		e.stopPropagation();
	}else{ //IE
		window.event.cancelBubble=true;
	}
}
/*
*返回星期几符串
*/
function getWeek(index){
	var weekxq=new Array();
	weekxq[0]="星期日";
	weekxq[1]="星期一";
	weekxq[2]="星期二";
	weekxq[3]="星期三";
	weekxq[4]="星期四";
	weekxq[5]="星期五";
	weekxq[6]="星期六";
	return weekxq[index];
}
//通过id获取对象
function getObjByID(id){
	return document.getElementById(id);
}
//通过class获取对象(若有同名则返回第一个)
function getObjByClass(className){
	
	if(document.getElementsByClassName){//现在很多浏览器都支持
		return document.getElementsByClassName(className)[0];	
	}
	var targets= targets ||  document.getElementsByTagName("*");
	for(var k in targets){
		var target=targets[k];
		if(target.className==className){
			return target;
		}
	}
	return "";
}