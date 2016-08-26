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

var tagInput = document.getElementByTagName("input")[0];
var hobbyString = document.getElementByTagName("textarea")[0].value;
var addButton = document.getElementById("add");


//处理tagString
EventUtil.addEvent(tagInput,keyup,function(){
	 
});
//处理hobbyString

//trim()

//数组去重

//长度小于10

//渲染