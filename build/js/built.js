"use strict";
"use strict";
'use strict';

$(function () {
  // 轮播图swiper
  var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    effect: 'fade',
    autoplay: true,
    delay: 500,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

  // 监听body的滚动,当滚动的高度大于同步高度时头部进行固定定位
  $('body').on('scroll', function (event) {
    var flag = true;
    if (this.scrollTop >= 100 && this.scrollTop <= 120) {
      $('.indexWrap #header').slideUp(100);
    } else if (this.scrollTop >= 120) {
      $('.indexWrap #header').css({
        position: 'fixed',
        top: 0,
        zIndex: 1000
      });
      if (flag) {
        $('.indexWrap #header').slideDown(500);
        flag = false;
      }
    } else {
      $('.indexWrap #header').css({
        position: 'static'
      });
      $('.indexWrap #header').slideDown(0);
    }
  });

  //动态生产导航列表的数据
  var $navList = $('.serviceIndex');
  var $serviceType = $('.serviceIndex .serviceType');
  $.get('http://localhost:3000/index', function (data) {
    // 将数据填充到列表内容
    var objNav = { data: data };
    var navList = template('navList', objNav);
    $('.serviceIndex').append(navList);

    // 鼠标移入导航列表时显示相应的内容
    $navList.on('mouseenter', 'li', function () {
      $(this).children('ul').css('display', 'block');
    });
    // 鼠标离开时隐藏相应的内容
    $navList.on('mouseleave', 'li', function () {
      $(this).children('ul').css('display', 'none');
    });

    // 生成服务列表
    var objServer = { data: data };
    var serverList = template('serverList', objServer);
    $('.serverWrap').append(serverList);
  });

  // 获取热门城市相关数据
  $.get('http://localhost:3000/hotCity', function (data) {
    // 生成服务列表
    var objCity = { data: data };
    var cityList = template('cityList', objCity);
    $('.hot-city').append(cityList);
  });
});