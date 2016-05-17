/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
//跨浏览器事件处理程序
var EventUtil = {
  addEvent:function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
      element.addEvent("on"+type,handler);
    }else{
      element["on"+type] = handler;
    }
  },
  getEvent:function(event){
    return event?event:window.event;
  },
  getTarget:function(event){
    return event.target||event.srcElement;
  }
}
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  //alert("in renderChart");
  var content = "",color ="";
  for (var date in chartData) {
    color = "#"+Math.floor(Math.random()*0xffffff).toString(16);
    content += "<div title="+pageState.nowSelectCity+":"+date+":"+chartData[date]+" style='height:"+chartData[date]+"px;background-color:"+color+"'></div>";
  }
  document.getElementsByClassName("aqi-chart-wrap")[0].innerHTML = content;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var gra_time = document.getElementsByName("gra-time");
  var graTimeSelect = "";
  for(var i=0;i<gra_time.length;i++){
    if(gra_time[i].checked){
      graTimeSelect = gra_time[i].value;
      break;
    }
  }
  
  if (graTimeSelect != pageState.nowGraTime) {
    pageState.nowGraTime = graTimeSelect;
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
  }

  
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if(pageState.nowSelectCity != this.value){
    pageState.nowSelectCity = this.value;
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();  
  }
  
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var gra_time = document.getElementById("form-gra-time");
  EventUtil.addEvent(gra_time,"click",function(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if(target.nodeName =="INPUT"){
      graTimeChange();
    }
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var city_select = document.getElementById("city-select");
  var content = "";
  var initial = false;
  for(var cityKey in aqiSourceData){
    if (!initial) {//记录初始页面城市选项
      pageState.nowSelectCity = cityKey;
      initial = true;
    }
    content +="<option>"+cityKey+"</option>";
  }
  city_select.innerHTML = content;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  EventUtil.addEvent(city_select,"change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = {};
  var nowData = aqiSourceData[pageState.nowSelectCity]
  switch(pageState.nowGraTime){
    case "day":
      chartData = nowData;break;
    case "week":
      var weekIndex = 1,dayTotal=0,dataTotal = 0;
      for (var date in nowData) {
        dayTotal ++;
        dataTotal += nowData[date];
        if (new Date(date).getDay() == 0) {
          chartData['第'+weekIndex+'周'] = Math.floor(dataTotal/dayTotal);
          weekIndex ++;
          dayTotal = 0;
          dataTotal=0;
        }
      }
      //最后一周不满
      if (dataTotal != 0) {
        chartData['第'+weekIndex+'周'] = Math.floor(dataTotal/dayTotal);
      }
    break;
    case "month":
      var monthIndex = -1,dayTotal=0,dataTotal = 0;
      for (var date in nowData) {
        if (monthIndex < 0) {
          monthIndex = new Date(date).getMonth();
        }
        dayTotal ++;
        dataTotal += nowData[date];
        if(new Date(date).getMonth() != monthIndex){
          chartData[(monthIndex+1)+'月'] = Math.floor(dataTotal/dayTotal);
          monthIndex ++;
          dayTotal = 0;
          dataTotal =0; 
        }
      }
      //最后一个月不满
      if (dataTotal > 0) {
        chartData[(monthIndex+1)+'月'] = Math.floor(dataTotal/dayTotal);
      }
    break;

  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();