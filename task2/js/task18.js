/**
*队列-数组
*queueArray =[number1,number2,............];
*/
var queueArray = new Array();

var queueShow = document.getElementById("queueShow");
var leftin = document.getElementById("leftin");
var leftout = document.getElementById("leftout");
var rightin = document.getElementById("rightin");
var rightout = document.getElementById("rightout");
//检查输入格式
function checkNum(numTemp){
	if(isNaN(numTemp)){
		alert("请输入数字！");
		return false;
	}
	return true;
}
//显示队列
function rendarArray(){
	var content ="";
	for (var i = 0; i < queueArray.length; i++) {
		content += "<span class='itemShow' id='"+i+"'>"+queueArray[i]+"</span>";
	}
	queueShow.innerHTML = content;
}
//点击各个按钮，响应事件
leftin.onclick = function(){
	var num = document.getElementsByName("number")[0].value;
	if(checkNum(num)){
		queueArray.unshift(num);
		rendarArray();
	}
	
}
rightin.onclick = function(){
	var num = document.getElementsByName("number")[0].value;
	if(checkNum(num)){
		queueArray.push(num);
		rendarArray();	
	}
	
}
leftout.onclick = function(){
	var item =queueArray.shift();
	alert(item);
	rendarArray();
}
rightout.onclick = function(){
	var item =queueArray.pop();
	alert(item);
	rendarArray();
}
function delItem(target){
	
}
//点击队列元素，将其删除
queueShow.onclick = function(event){
	var target = event?event.target:window.event.srcElement;	
	if(target.nodeName == "SPAN"){
		var index = Number(target.id);
		queueArray.splice(index,1);
		rendarArray();
	}
}