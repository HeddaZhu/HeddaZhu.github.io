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

EventUtil.addEvent(window,"load",function(){
  var gotop = document.getElementById("gotop");
  var pH=document.documentElement.clientHeight;
  var timer=null;
  var scrollTop;
  window.onscroll=function(){
    scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    if(scrollTop>=pH){
      gotop.style.display='block';
    }else{
      gotop.style.display='none';
    }
    
  };
  gotop.onclick=function(){
    clearInterval(timer);
    timer=setInterval(function(){
      var now=scrollTop;
      var speed=(0-now)/10;
      speed=speed>0?Math.ceil(speed):Math.floor(speed);
      if(scrollTop==0){
        clearInterval(timer);
      }
      document.documentElement.scrollTop=scrollTop+speed;
      document.body.scrollTop=scrollTop+speed;
    }, 30);
  }


});