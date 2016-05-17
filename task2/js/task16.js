/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var refresh = false;//是否需要重新渲染表格
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	refresh = false;
	var city = document.getElementById("aqi-city-input");
	var PMIndex = document.getElementById("aqi-value-input");
	//检查输入
	if (!(/^[A-Za-z\u4e00-\u9fa5 ]+$/.test(city.value.trim()))) {
		alert("请输入正确的城市名，城市名应为中英文字符");
		return;
	}
	if(!(/^[0-9]*[1-9][0-9]*$/.test(PMIndex.value.trim()))){
		alert("空气质量指数应该为正整数");
		return;
	}
	aqiData[city.value.trim()] = Number(PMIndex.value.trim());
	refresh = true;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var content = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for (var cityKey in aqiData) {
		content += "<tr><td>"+cityKey+"</td><td>"+aqiData[cityKey]+"</td><td><button>删除</button></td></tr>";
	}
	var aqi_table = document.getElementById("aqi-table");
	aqi_table.innerHTML = cityKey? content:"";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  if (refresh){
  	renderAqiList();
  }
  
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
  var parentTr = target.parentNode.parentNode;
  var city = parentTr.children[0].childNodes[0].nodeValue;
  delete aqiData[city];
  renderAqiList();
}
/**
* 跨浏览器事件响应程序
*/
var EventUtil = {
	addEvent: function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if (element.attachEvent) {
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+click] = handler;
		}
	},
	getEvent:function(event){
		return event?event:window.event;
	},
	getTarget:function(event){
		return event.target||event.srcElement;

	}
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var add_btn = document.getElementById("add-btn");
  EventUtil.addEvent(add_btn,"click",addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var aqi_table = document.getElementById("aqi-table");
  EventUtil.addEvent(aqi_table,"click",function(event){
  	 event = EventUtil.getEvent(event);
  	 if(EventUtil.getTarget(event).nodeName === "BUTTON"){
  	 	delBtnHandle(EventUtil.getTarget(event));
  	 }

  });
}

init();
