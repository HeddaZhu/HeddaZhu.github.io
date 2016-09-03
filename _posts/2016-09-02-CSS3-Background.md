---
layout: post_layout
title: CSS3入门之背景
time: 2016年09月02日 星期五
location: 天津
pulished: true
excerpt_separator: "三个主要属性"
description: "css3入门"
---
css3 主要模块：

+ 选择器
+ 盒模型
+ [背景](#ChapterBackground)和[边框](http://heddazhu.github.io/2016/09/01/CSS3.html#Chapter1)
+ 图像值与替代内容
+ 文字特效
+ 2D/3D转换
+ 动画
+ 多列布局
+ 用户界面        ......

## <span id="ChapterBackground">二、CSS3背景</span>

background属性：

属性|描述
---------|------------
background|简写属性，在这个属性中设置所有属性值
background-clip|设定背景区
background-image|为一个元素指定一个或多个背景图片
background-origin|指定背景图片的位置
background-size|指定背景图片的大小


三个主要属性：

+ [background-size](#backgroundSize)
+ [background-origin](#backgroundOrigin)
+ [background-clip](#backgroundClip)


### <span id="backgroundSize">background-size</span>

属性值：
 lengths, percentages, 或者使用`contain`  `cover`

没有使用background-size

```css
#example1 {
    border: 1px solid black;
    background:url(img_flwr.gif);
    background-repeat: no-repeat;
    padding:15px;
}


```
结果如下：

<img src="/assets/img/CSS3/background_size_1.png" alt="图像无法显示">

&#160; &#160; &#160; &#160;

使用background-size

```css
#example2 {
    border: 1px solid black;
    background:url(img_flwr.gif);
    background-size: 100px 80px;
    background-repeat: no-repeat;
    padding:15px;
}
```
<img src="/assets/img/CSS3/background_size_2.png" alt="图像无法显示">

&#160; &#160; &#160; &#160;

contain and cover：    
将属性值设置为`contain`，则图片会尽可能地铺满背景，但是图片不会超出内容区，因此有时候有的背景区没有图片。

将属性值设置为`cover`，则图片会完全铺满背景，图片有可能会超出内容区，因此有时候图片的某部分因超出内容区而不可见。

```css
#div1 {
    background: url(img_flower.jpg);
    background-size: contain;
    background-repeat: no-repeat;
}
```

<img src="/assets/img/CSS3/backgroud_size_contain.png" alt="图片无法正常显示">


```css 
#div2 {
    background: url(img_flower.jpg);
    background-size: cover;
    background-repeat: no-repeat;
} 
````

<img src="/assets/img/CSS3/backgroud_size_cover.png" alt="图片无法正常显示">

&#160;

全背景图

```css
html {
    background: url(img_flower.jpg) no-repeat center fixed;
    background-size: cover;
} 
```



### <span id="backgroundOrigin">background-origin</span>

三个属性值：

+ border-box   背景图从左上角的边框开始(边框会盖住图片)
+ padding-box  （默认值）背景图从左上角padding区开始
+ content-box   背景图从左上角的内容区开始

```csss
#example1 {
    border: 10px solid black;
    padding: 35px;
    background: url(img_flwr.gif);
    background-repeat: no-repeat;
}

#example2 {
    border: 10px solid black;
    padding: 35px;
    background: url(img_flwr.gif);
    background-repeat: no-repeat;
    background-origin: border-box;
}

#example3 {
    border: 10px solid black;
    padding: 35px;
    background: url(img_flwr.gif);
    background-repeat: no-repeat;
    background-origin: content-box;
}
```

<img src="/assets/img/CSS3/background_origin_paddingbox.png" alt="图片无法正常显示">

<img src="/assets/img/CSS3/background_origin_borderbox.png" alt="图片无法正常显示">

<img src="/assets/img/CSS3/background_origin_contentbox.png" alt="图片无法正常显示">

&#160;

### <span id="backgroundClip">background-clip</span>

三个属性值：

+ border-box   （默认值）背景一直到边框的外边缘
+ padding-box   背景一直到padding的外边缘
+ content-box   背景到内容区的外边缘

```css
#example1 {
    border: 10px dotted black;
    padding:35px;
    background: yellow;
}

#example2 {
    border: 10px dotted black;
    padding:35px;
    background: yellow;
    background-clip: padding-box;
}

#example3 {
    border: 10px dotted black;
    padding:35px;
    background: yellow;
    background-clip: content-box;
}

```
<img src="/assets/img/CSS3/backgroud_clip_borderbox.png" alt="图片无法正常显示">

<img src="/assets/img/CSS3/backgroud_clip_paddingbox.png" alt="图片无法正常显示">

<img src="/assets/img/CSS3/backgroud_clip_contentbox.png" alt="图片无法正常显示">

&#160;

多个背景图

```css
#example1 {
    background-image: url(img_flwr.gif), url(paper.gif);
    background-position: right bottom, left top;
    background-repeat: no-repeat, repeat;
} 
```
```css

#example1 {
    background: url(img_flwr.gif) right bottom no-repeat, url(paper.gif) left top repeat;
}
```

&#160;

浏览器支持：

<img src="/assets/img/CSS3/background_browerSupport.png" alt="图片无法正常显示">

[w3cschools镜像](http://w3schools.bootcss.com/css/background_browerSupport.html)
