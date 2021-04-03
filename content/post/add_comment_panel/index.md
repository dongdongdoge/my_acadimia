---
title: 'Add Third-party Comments Provider for Hugo-Academic  (New Version)'
subtitle: ''
summary: '为新版academic posts添加留言板'
authors: 
- admin

tags:
- blog features
 
categories:
- blog

date: "2020-04-01"
lastmod: ""
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Placement options: 1 = Full column width, 2 = Out-set, 3 = Screen-width
# Focal point options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
image:
  placement: 1
  caption: ''
  focal_point: ""
  preview_only: true

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

- 新版hugo academic（wowchemy 5.0+构建）与之前的布局有很大不同，theme/layouts.partial 没了，网络上能找到的方法都不能用（wowchem官方扩展的文档也没更新...）

- 内置的comments provider就两个 commento与disqus，不是被墙就是广告太多，影响观感

- 轻量级留言板 -- utteranc.es，利用github issue特性构建留言板，效果不错

    ![](./featured.png)

- 上js...
  
    ```javascript
    var r = /\/post\/[a-zA-Z]+/.test(window.location.pathname)
    if (r) {
        (function(){
            var utterances = document.createElement('script');
            utterances.type = 'text/javascript';
            utterances.async = true;
            utterances.setAttribute('issue-term','pathname')
            utterances.setAttribute('theme','github-light')
            utterances.setAttribute('repo','dongdongdoge/utterances')
            utterances.crossorigin = 'anonymous';
            utterances.src = 'https://utteranc.es/client.js';
            document.body.appendChild(utterances);
        })();
    }
    ```

---
<p style="color:red;text-align:center">(转载请注明出处)</p>



