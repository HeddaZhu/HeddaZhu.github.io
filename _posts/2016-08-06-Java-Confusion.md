---
layout: post_layout
title: Java代码混淆
time: 2016年08月06日 星期六
location: 天津
pulished: true
excerpt_separator: "如下图"
---
>
>**`代码混淆`**是将计算机程序的代码转换成一种功能上等价但是难于阅读和理解的形式的行为。代码混淆可以用于程序源代码，也可以用于程序编译而成的中间代码。  
Java是一种跨平台的编程语言，其源码(.java文件)被编译成与平台无关的字节码(.class文件)，然后在运行期动态链接。这样，编译后的类文件中将包含有符号表，从而使得Java程序很容易被反编译。
>

最近参与一个项目的开发，老师让我研究一下java代码的混淆与加密，毫不夸张地说这是第一次听说`代码混淆和加密`。

先说下使用的工具[ProGuard](http://proguard.sourceforge.net/):通过删除无用代码，将代码中类名、方法名、属性名用晦涩难懂的名称重命名从而达到代码混淆、压缩和优化的功能。


接下来混淆项目：

#1.源代码打包成jar文件#


选择`src`目录下的java文件，`ProGuard`只处理Java文件，`xml`类型的配置文件不会发生改变，所以注意那些应该保留类名的类,如下图：


<img src="/assets/img/Java_Confusion/0.png" alt="图片无法正常显示">

<img src="/assets/img/Java_Confusion/1.png" alt="图片无法正常显示">

**只选择Java文件**

<img src="/assets/img/Java_Confusion/2.png" alt="图片无法正常显示">

<img src="/assets/img/Java_Confusion/3.png" alt="图片无法正常显示">

#2.Proguard设置#

打开`progrard`，执行 `bin`目录下的`proguardgui.bat`  
点击左边`input/output`菜单，然后点击右边的`Add input`按钮，添加需要混淆的jar包  
然后点击`add output`,选择输出的路径和包名。  

<img src="/assets/img/Java_Confusion/4.png" alt="图片无法正常显示">

<img src="/assets/img/Java_Confusion/5.png" alt="图片无法正常显示">

下面开始添加支持库，这个地方很重要，很多同学刚开始使用这个工具的时候就是这里老是出问题。  
点击右边的`add`。

<img src="/assets/img/Java_Confusion/6.png" alt="图片无法正常显示">

<img src="/assets/img/Java_Confusion/7.png" alt="图片无法正常显示">

<img src="/assets/img/Java_Confusion/8.png" alt="图片无法正常显示">

<img src="/assets/img/Java_Confusion/9.png" alt="图片无法正常显示">

<img src="/assets/img/Java_Confusion/10.png" alt="图片无法正常显示">

<img src="/assets/img/Java_Confusion/11.png" alt="图片无法正常显示">

<img src="/assets/img/Java_Confusion/12.png" alt="图片无法正常显示">

<img src="/assets/img/Java_Confusion/13.png" alt="图片无法正常显示">

在弹出的对话框中，输入要保存的配置文件名称，最后点击`保存`.  
设置基本完成，关掉`proguard`窗口，找到刚刚保存的配置文件，开始手动修改部分配置，下面是我在原来文件上添加的：

```
-dontpreverify
-dontwarn
-ignorewarnings
#混淆过文件中不还出现因大小写而冲突的名字
-dontusemixedcaseclassname

#Serializable Ajax
-keep public class * implements java.io.Serializable{
public protected private *;
}

#不混淆action包里面的类名,字段名,方法名
#在界面上会用到这些字段和getset方法
-keepnames class cn.nku.it.action.**{
public private protected <fields>;
public <methods>;
}
#不混淆实体的字段和方法,jsp的表单里面会有这些属性的值,混淆之后,会出现无法提交表单情况
-keepnames class cn.nku.it.model.** {
public private protected <fields>;
public <methods>;
}
-keepnames class cn.nku.it.service.**{
public private protected <fields>;
public <methods>;
}
-keepnames class cn.nku.it.dao.**{}
-keepnames class cn.nku.it.filter.**{}
-keepnames class cn.nku.it.interceptor.**{}
#-keep class cn.nku.it.helper.**
#-keep class cn.nku.it.vo.query.**

-keep class cn.org.rapid_framework.**.**

#-keepnames class javacommon.base.**{}

-keep class javacommon.filter.**

-keep class javacommon.struts2.interceptor.**

#-keep class javacommon.util.**
#-keep class ueditor.**
#-keep class * extends org.springframework.orm.hibernate3.support.HibernateDaoSupport {
# public <methods>;
#}

```

手动设置完成后保存，然后重新打开`progrard`，执行`bin`目录下的`proguardgui.bat`。  
点击第一个选项`Proguard`，再点击`Load configuration`，选择我们刚才保存的`.pro`文件进行加载。

<img src="/assets/img/Java_Confusion/14.png" alt="图片无法正常显示">

然后点击`Process`，然后点击`View configuration`查看是否是已经修改过后的配置文件

<img src="/assets/img/Java_Confusion/15.png" alt="图片无法正常显示">

确认是最新修改过的配置文件，然后点击`process！`开始混淆。

<img src="/assets/img/Java_Confusion/16.png" alt="图片无法正常显示">

用`jd-gui`反编译工具看看混淆后的效果。可以看到，之前设置不混淆的类都没有更换类名，而混淆的类都自动更换为`a,b,c`等类名了。到此，整个java项目混淆就成功了，然后把混淆成功的class文件拷贝到自己的web项目中，替换原先的class文件，然后用tomcat跑项目

<img src="/assets/img/Java_Confusion/17.png" alt="图片无法正常显示">

<img src="/assets/img/Java_Confusion/18.png" alt="图片无法正常显示">

#3.配置总结#

`action包`、`service包`、`model包`，这几个包中的类都需要保留类名与方法名。  
不混淆action包里面的类名、字段名、方法名是因为在界面上会用到这些字段和方法。  
不混淆实体的字段和方法是因为jsp的表单里面会有这些属性的值,混淆之后,会出现无法提交表单情况。  
对于`service`包，若不保留类名与类成员名，则会出现`org. springframework.aop.framework.Cglib2AopProxy`错误。我并不了解spring的代理机制，也就不太清楚service与spring的关系。

dao包、filter包、interceptor包，这几个包中的类都需要保留类名。  
过滤器与拦截器已经在xml文件中配置，修改filter包、interceptor包会导致错误。

毫无疑问，怎么配置这些package是最费脑子的事，哪些类该混淆，哪些类不该混淆，都要把握好，稍不准确，整个项目就跑不起来。

最好是能对整个项目非常了解。。。。。。。。。。。。。。。。

[参考网站1](http://blog.csdn.net/zhangdaiscott/article/details/45368261)  
[参考网站2](http://www.cnblogs.com/zhouyalei/archive/2013/06/18/3142650.html)