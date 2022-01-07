//轮播图功能
//1.鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮
//2.点击右侧按钮一次，图片往左播放一张，以此类推，左侧按钮同理
//3.图片播放的同时，下面小圆圈模块跟随一起变化
//4.点击小圆圈，可以播放相应图片
//5.鼠标不经过轮播图，轮播图也会自动播放图片
//6.鼠标经过，轮播图模块，自动播放停止
//因为等页面加载完才能调用Js文件于是要写Load
//1.左右按钮显示
window.addEventListener('load', function() {
    //  console.log(alert('1'));
    var foc = document.querySelector('.focus');
    var arrow1 = document.querySelector('.arrow-1');
    var arrow2 = document.querySelector('.arrow-2');
    // console.log(foc);
    //鼠标经过
    foc.addEventListener('mouseenter', function() {
            arrow1.style.display = 'block';
            arrow2.style.display = 'block';
            clearInterval(timer);
            timer = null; //清除定时器
        })
        //鼠标离开
    foc.addEventListener('mouseleave', function() {
            arrow1.style.display = 'none';
            arrow2.style.display = 'none';
            var timer = setInterval(function() {
                //手动调用点击事件
                arrow2.click();
            }, 1000);
        })
        //动态生成小圆圈 有几张生成几个圆圈
    var ul = foc.querySelector('ul');
    var ol = document.querySelector('.circle');
    console.log(ul.children, length);
    var focusWidth = foc.offsetWidth;
    for (var i = 0; i < ul.children.length - 1; i++) {
        //创一个li
        var li = document.createElement('li');
        //记录索引号
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //ul移动距离
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            console.log(focusWidth);
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].classname = 'current';
    //右侧按钮实现
    var num = 0;
    var circle = 0;
    //节流阀的实现
    var flag = true;
    arrow2.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            console.log(num * focusWidth);
            //无缝滚动

            //8.点击右侧按钮。小圆圈跟随一起变化，可以声明一个变量控制小圆圈的播放
            circle++;
            if (circle == 4) {
                circle = 0;
            }
            circleChange();

        }
    });

    arrow1.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            console.log(num * focusWidth);
            //无缝滚动


            //8.点击右侧按钮。小圆圈跟随一起变化，可以声明一个变量控制小圆圈的播放
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //10.自动播放轮播图
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow2.click();
    }, 3000);

})