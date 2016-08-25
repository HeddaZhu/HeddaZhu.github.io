---
layout: post_layout
title: Page build warning：Cannot use CNAMEs ending with github.io or github.com
time: 2016年08月25日 星期四
location: 天津
pulished: true
excerpt_separator: "刚接触"
---
&#160; &#160; &#160; &#160;在设计自己blog的时候，大家都会先借鉴一下[jkell模板](http://jekyllthemes.org/)吧。我的这个blog也先clone了别人的架构，接下来慢慢修改填充自己的想法。


&#160; &#160; &#160; &#160;在我每次向github的远程仓库提交更新的时候，总会收到一封邮件：

```
The page build completed successfully, but returned the following warning:

You cannot use CNAMEs ending with github.io or github.com. Instead, create a repository named HeddaZhu.github.io. See https://help.github.com/articles/setting-up-your-pages-site-repository/

For information on troubleshooting Jekyll see:

  https://help.github.com/articles/troubleshooting-jekyll-builds

If you have any questions you can contact us by replying to this email.
```


&#160; &#160; &#160; &#160;刚接触[jekyll](http://jekyll.bootcss.com/)不久，对它的构建结构和语法都不是特别熟悉。访问了邮件中的链接，我发现这并不能解决我的问题。虽然有warning但是无伤大雅，毕竟程序员不怎么care warning。But 每次更新代码，都要收到github的邮件，我是不能忍受的！！！(*>﹏<*) 

&#160; &#160; &#160; &#160;于是乎好好研究了下jekyll的目录结构以及CNAME，原来CNAME是用来绑定域名的。  

## 绑定到一级域名

1. 首先在项目根目录下创建一个叫CNAME文件，里面写上自己的以及一级域名(www.youdomain.com)
2. 在你的域名管理页或者是DNS解析的地方，增加一个记录，记录类别为CNAME(Alias)类型。i.e.在DNS中为自己的域名增加一条A记录，指向207.97.227.245（github服务器）。
3. 将项目提交到github上, wait a minute
4. baseurl应该为"/"
5. 访问自己的域名,check一下

## 绑定到二级域名

&#160; &#160; &#160; &#160;需要额外在DNS中增加一条CNAME，指向(github用户名).github.io，然后再CNAME文件中修改为自己的二级域名即可

&#160; &#160; &#160; &#160;有关这个问题的[github官方帮助文档](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)



&#160; &#160; &#160; &#160;之前clone jekyll模板的时候在项目中有个CNAME文件，刚开始不知道它的而作用就保留了。我还没有申请域名，现在看来这个文件不仅unnecessary而且是trouble maker。删除这个文件就没有警告了。O(∩_∩)O
