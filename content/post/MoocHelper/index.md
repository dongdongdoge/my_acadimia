---
title: 'Chaoxing Mooc Auto Learning'
subtitle: ''
summary: 'selenium自动化播放课程'
authors: 
- admin

tags:
- 刷课code
 
categories:
- toy

date: "2020-03-30"
lastmod: ""
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Placement options: 1 = Full column width, 2 = Out-set, 3 = Screen-width
# Focal point options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
# image:
#   placement: 1
#   caption: ''
#   focal_point: ""
#   preview_only: true

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

- 从小玩到大的哥们要泡好看的妹妹，《实验室操作》流程这门课对其造成了巨大影响，帮忙写了个小玩具。（实验室操作规范很重要不鼓励此类行为）

- greasyfork上此类工具实在很多（一键秒），但selenium一般不会被检测到有滥用行为，本着不能重复制造轮子的原则...站在别人的肩膀上...

    https://www.imzzj.com/2020/04/26/python-selenium-google-liu-lan-qi-shi-xian-zi-dong-bo-fang-chao-xing-xue-xi-tong-wang-ke.html
  
- 思路类似简单的爬虫，找到所有没上过的课，自动播放即可，selenium对iframe不友好，故执行外部js操作DOM元素

    ```python
    #auto_course.py

    from selenium import webdriver
    from selenium.webdriver.chrome.webdriver import Options
    from bs4 import BeautifulSoup
    import time

    def video(browser,urls):
        with open("play.js","r",encoding="utf-8") as f:
            js = f.read()
        for url in urls:
            browser.get(url)
            browser.execute_script(js)
            browser.find_element_by_id("auto_play").click()
            while True:
                rate = browser.execute_script("""var video = $("iframe").contents().find("iframe").contents();return video.find("#video > div.vjs-control-bar > div.vjs-progress-control.vjs-control > div").attr("aria-valuenow");""")
                if "100.00" == str(rate):
                    break
                else:
                    time.sleep(120)


    def course(browser):
        urls = []
        browser.get("https://mooc1-1.chaoxing.com/mycourse/studentcourse?courseId=216430320&clazzid=36512648&enc=c3b4dbcb651e9b58bdff9eee9aea61d4&cpi=174197011&vc=1") 
        h3 = browser.find_elements_by_class_name("clearfix")
        for i in h3:
            try:
                if i.find_element_by_class_name("orange"):
                    if "1" == i.find_element_by_class_name("orange").text:
                        urls.append(i.find_element_by_tag_name("a").get_attribute('href'))
            except Exception as e:
                pass
        return urls

    def login(browser):
        browser.get("http://i.mooc.chaoxing.com/space/index?t=1617101385349") 
        time.sleep(3)
        browser.find_element_by_id("unameId").send_keys('19520420491') 
        browser.find_element_by_id("passwordId").send_keys('FOREVER0330ZJ') 
        time.sleep(3)
        verify_code = input()
        browser.find_element_by_id('numcode').send_keys(verify_code)
        time.sleep(3)
        browser.find_element_by_class_name("zl_btn_right").click()

    def main():
        googleOptions = webdriver.ChromeOptions()
        browser = webdriver.Chrome("/usr/local/bin/chromedriver")
        login(browser)
        time.sleep(5)
        urls = course(browser)
        #print(urls)
        video(browser,urls)

    if __name__ == '__main__':
        main()

    ```

    ```javascript
    // play.js  
    // An highlighted block

    var fa = $("body");
    var btn = $("<li></li>");
    var json = {
        "background": "#31e16d",
        "height": "16px",
        "padding": "5px",
        "z-index": 999999,
        "cursor": "pointer",
        "top": "300px",
        "right": "120px",
        "position": "fixed"
    };
    btn.css(json);
    btn.html("<span id='auto_play'>开启自动播放模式</span>");
    fa.append(btn);

    btn.click(function () {

        setInterval(function () {
            //获取iframe
            var video = $("iframe").contents().find("iframe").contents();
            //播放函数
            var play = function () {
                video.find("#video > button").click();
                var jy = video.find("#video > div.vjs-control-bar > div.vjs-volume-panel.vjs-control.vjs-volume-panel-vertical > button");
                if (jy.attr("title") != "取消静音") {
                    jy.click()
                }
            }
            //如果正在加载
            var load = video.find("#loading");
            if (load.css("visibility") != "hidden") {
                return;
            }
            //获取当前进度
            var spans = video.find("#video > div.vjs-control-bar > div.vjs-progress-control.vjs-control > div").attr("aria-valuenow");
            // 如果还没播放完
            if (spans != 100) {
                play();
            }
            //如果播放结束
            if (spans == 100) {
                var bs = false;
                $(".onetoone").find(".flush").each(function () {
                    if (bs) {
                        $(this).prev("a").on('click', "#coursetree>ncells", function () {
                            console.log("已结束章节：" + $(this).prev("a").attr("title"))
                        })
                        var str = $(this).prev("a").attr("href");
                        str = str.match(/'(\S*)'/)[1];
                        var reg = new RegExp("'", "g");
                        str = str.replace(reg, "");
                        var href = str.split(",");
                        getTeacherAjax(href[0], href[1], href[2])
                        bs = false;
                    }
                    if ($(this).css("display") == "block") {
                        bs = true;
                    }
                })
            }
            $("#lfsenior").html("自动模式已开启,本章进度:" + spans + "%");
        }, 100);

    });
    ```

- MacOS中请不要头铁把 Chromedriver 放在 `/usr/bin` 下面，放在`/usr/local/bin` 能省去不少麻烦


- 验证码在线找api注册或者离线OCR均可，不再赘述

  
- 祝我朋友长长久久, hhh
---
<p style="color:red;text-align:center">(转载请注明出处)</p>



