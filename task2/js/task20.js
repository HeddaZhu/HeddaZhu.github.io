/**
*队列-数组
*queueArray =[String1,String2,............];
*/
var queueArray = new Array();

var queueShow = document.getElementById("queueShow");
var leftin = document.getElementById("leftin");
var leftout = document.getElementById("leftout");
var rightin = document.getElementById("rightin");
var rightout = document.getElementById("rightout");
var query = document.getElementById("query");
var reset = document.getElementById("reset");

//显示队列
function rendarArray(){
	var content ="";
	queueShow.innerHTML ="";
	for (var i = 0; i < queueArray.length; i++) {
		content += "<div class='itemShow' id='"+i+"'>"+queueArray[i]+"</div>";
	}
	queueShow.innerHTML = content;
	
}
//点击各个按钮，响应事件
leftin.onclick = function(){

	var inputString = document.getElementsByTagName("textarea")[0].value.trim();
	var arrWord = inputString.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
	    if (e != null && e.length > 0) {
	        return true;
	    } else {
	        return false;
	    }
	});

	queueArray = queueArray.concat(arrWord);
	rendarArray();	

	
}
rightin.onclick = function(){
	var inputString = document.getElementsByTagName("textarea")[0].value.trim();
	var arrWord = inputString.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
	    if (e != null && e.length > 0) {
	        return true;
	    } else {
	        return false;
	    }
	});

	queueArray = arrWord.concat(queueArray);
	rendarArray();	
	
}
leftout.onclick = function(){
	var item =queueArray.shift();
	alert("删除字符串:"+item);
	rendarArray();
}
rightout.onclick = function(){
	var item =queueArray.pop();
	alert("删除字符串:"+item);
	rendarArray();
}

//点击队列元素，将其删除
queueShow.onclick = function(event){
	var target = event?event.target:window.event.srcElement;	
	if(target.nodeName == "DIV"&&target.parentNode.nodeName == "DIV"){
		var index = Number(target.id);
		queueArray.splice(index,1);
		rendarArray();
	}
}
//查询
query.onclick = function(){
	var queryString = document.getElementsByTagName("input")[0].value.trim();
	for(var i=0;i<queueArray.length;i++){
		if(queueArray[i].search(queryString)>-1){
			document.getElementById(i).style.backgroundColor = "blue";
		}else{
			document.getElementById(i).style.backgroundColor = "red";
		}
	}
}

//重置
reset.onclick = function(){
	queueArray = [];
	rendarArray();
}
