---
layout: post_layout
title: CSS3中的box-sizing与clac()
time: 2016年08月22日 星期一
location: 天津
pulished: true
excerpt_separator: "语法"
---
&#160; &#160; &#160; &#160;关于盒模型，在 IE6以前的版本中，IE盒模型跟其它浏览器不同，将 border 与 padding 都包含在 width 之内。而另外一些浏览器则与它相反，是不包括border和padding的。

# 1.box-sizing

&#160; &#160; &#160; &#160;有时候，如果对页面中的大区域进行设置时，将border、padding计算到width和height之内，反而更灵活。但W3C的 CSS2.1规范却规定了他们并不能被包含其中。考虑到这个问题，css3中引入了一个新的属性：`box-sizing`，它具有`content-box`和`border-box`两个值。

### box-sizing:content-box

&#160; &#160; &#160; &#160;浏览器对盒模型的解释遵从我们之前认识到的 W3C 标准，当它定义width和height时，它的宽度不包括border和padding。

### box-sizing:border-box

&#160; &#160; &#160; &#160;浏览器对盒模型的解释与 IE6之前的版本相同，当它定义width和height时，border和padding则是被包含在宽高之内的。内容的宽和高可以通过定义的“width”和 “height”减去相应方向的“padding”和“border”的宽度得到。内容的宽和高必须保证不能为负，必要时将自动增大该元素border box的尺寸以使其内容的宽或高最小为0。

语法：

```css
.elm{
	box-sizing:border-box;
	-moz-box-sizing:border-box; /* Firefox */
	-webkit-box-sizing:border-box; /* Safari */
}
```

#### 示例：盒子被撑破

```html
<body>
	<div></div>
</body>
```
```css
*{
	margin: 0px;
	padding: 0px;
}
body{
	background-color: #FFF;
}
div{
	width: 100%;
	height: 50px;
	border: 5px solid red;
	padding: 10px;
}
```
<img src="/assets/img/CSS3/boxsizing_0.png" alt="效果图">

可以看到浏览器中出现了横向滚动条。

&#160; &#160; &#160; &#160;为了解决撑破容器的问题，以前我们只能去计算div的宽度，用容器宽度减去padding和border的值，但有时候，不知道元素的总宽度，比如说是自适应的布局，只知道一个百分值，但其他的值又是px之类的值，就shi这了。随着CSS3的出现，其中利用box-sizing来改变元素的盒模型类型实使实现效果。


```css
div{
	box-sizing: border-box;
	width: 100%;
	height: 50px;
	border: 5px solid red;
	padding: 10px;
}
```
<img src="/assets/img/CSS3/boxsizing_1.png" alt="效果图">
没有横向滚动条

# 2.calc()

&#160; &#160; &#160; &#160;使用`calc()`方法更是方便。

### What is calc()?

&#160; &#160; &#160; &#160;`calc()`从字面我们可以把他理解为一个函数function。其实calc是英文单词calculate(计算)的缩写，是css3的一个新增的功能，用来指定元素的长度。比如说，你可以使用calc()给元素的border、margin、pading、font-size和width等属性设置动态值。为何说是动态值呢?因为我们使用的表达式来得到的值。不过calc()最大的好处就是用在流体布局上，可以通过calc()计算得到元素的宽度。


&#160; &#160; &#160; &#160;`calc()`能给元素做计算，可以给一个div元素，使用`百分比` `em` `px``rem`单位值计算出其宽度或者高度，比如说`width:calc(50% + 2em)`，这样一来你就不用考虑元素DIV的宽度值到底是多少，而把这个annoying的任务交由浏览器去计算。

### calc()语法

&#160; &#160; &#160; &#160;`calc()`语法非常简单，就像我们小时候学加 （+）、减（-）、乘（*）、除（/）一样，使用数学表达式来表示：

```css
.elm {
  width: calc(expression);/*其中expression是一个表达式，用来计算长度的表达式。*/
}
```

### calc()的运算规则

&#160; &#160; &#160; &#160;calc()使用通用的数学运算规则，但是也提供更智能的功能：

+ 使用“+”、“-”、“*” 和 “/”四则运算；
+ 可以使用百分比、px、em、rem等单位；
+ 可以混合使用各种单位进行计算；
+ 表达式中有“+”和“-”时，其前后必须要有空格，如"widht: calc(12%+5em)"这种没有空格的写法是错误的；
+ 表达式中有“*”和“/”时，其前后可以没有空格，但建议留有空格。

### 浏览器的兼容性

&#160; &#160; &#160; &#160;浏览器对calc()的兼容性还算不错，在IE9+、FF4.0+、Chrome19+、Safari6+都得到较好支持，同样需要在其前面加上各浏览器厂商的识别符，不过可惜的是，移动端的浏览器还没仅有“firefox for android 14.0”支持，其他的全军覆没。

```css
.elm {
	/*Firefox*/
	-moz-calc(expression);
	/*chrome safari*/
	-webkit-calc(expression);
	/*Standard */
	calc();
 }
```
 



&#160; &#160; &#160; &#160;接上面例子。。。。。。

&#160; &#160; &#160; &#160;知道总宽度是100%，在这个基础上减去boder的宽度（5px * 2 = 10px）,在减去padding的宽度（10px * 2 = 20px），即"100% - (10px + 5px) * 2 = 30px" ，最终得到的值就是div的width值：

```css
div{
	height: 50px;
	border: 5px solid red;
	padding: 10px;
	width: 90%;/*不支持calc()的浏览器*/
	width:-moz-calc(100% - (10px + 5px) * 2);
	width:-webkit-calc(100% - (10px + 5px) * 2);
	width: calc(100% - (10px + 5px) * 2);
}
```

<img src="/assets/img/CSS3/boxsizing_2.png" alt="效果图">


&#160; &#160; &#160; &#160;[百度前端技术学院任务八：响应式网格（栅格化）布局](http://ife.baidu.com/task/detail?taskId=8)，做这个任务用到了，学习一下。最后的[代码地址](https://github.com/HeddaZhu/HeddaZhu.github.io/tree/master/task1/task8.html)和演示[demo](https://heddazhu.github.io/task1/task8.html)。

学习网站：

+ [CSS3的calc()使用](http://www.w3cplus.com/css3/how-to-use-css3-calc-function.html)
+ [css3教程：box-sizing属性](http://www.rainleaves.com/html/1740.html)
+ [最后元素清除浮动](https://css-tricks.com/snippets/css/clear-fix/)
