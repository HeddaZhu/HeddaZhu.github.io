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
var bubbleSort = document.getElementById("bubbleSort");
//检查输入格式
function checkNum(numTemp){
	if(isNaN(numTemp)){
		alert("请输入数字！");
		return false;
	}
	if(numTemp<10||numTemp>100){
		alert("请输入10-100之间的数");
		return false;
	}
	return true;
}
//显示队列
function rendarArray(){
	var content ="";
	queueShow.innerHTML ="";
	for (var i = 0; i < queueArray.length; i++) {
		content += "<div class='itemShow' id='"+i+"' style= 'height:"+queueArray[i]*5+"px'>"+queueArray[i]+"</div>";
	}
	queueShow.innerHTML = content;
	
}
//点击各个按钮，响应事件
leftin.onclick = function(){

	var num = document.getElementsByName("number")[0].value;
	if(checkNum(num)){
		if (queueArray.length == 60) {
			alert(num);
			return;
		}
		queueArray.unshift(num)
		rendarArray();
	}
	
}
rightin.onclick = function(){
	var num = document.getElementsByName("number")[0].value;
	if(checkNum(num)){
		if (queueArray.length == 60) {
			alert(num);
			return;
		}
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

//点击队列元素，将其删除
queueShow.onclick = function(event){
	var target = event?event.target:window.event.srcElement;	
	if(target.nodeName == "DIV"&&target.parentNode.nodeName == "DIV"){
		var index = Number(target.id);
		queueArray.splice(index,1);
		rendarArray();
	}
}
//点击“排序按钮”，进行冒泡排序并显示
bubbleSort.onclick = function(){
	if (queueArray.length ==0) {
		alert("请先输入元素！");
		return;
	}
	var tmp = 0;
	for (var i = 0; i < queueArray.length-1; i++) {
		for (var j = 0; j < queueArray.length - 1- i; j++) {
			//注意queueArray数组里是数字字符串
			if (Number(queueArray[j]) >Number(queueArray[j+1])) {
				tmp = queueArray[j];
				queueArray[j] = queueArray[j+1];
				queueArray[j+1] = tmp;
			}
		}
	}
	rendarArray();
}