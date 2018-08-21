'use strict';

$(function () {
  // 获取服务列表
  $.get('http://localhost:3000/service', function (data) {
    var serverObj = { data: data };
    var serverList = template('serverList', serverObj);
    $('.serverCenter').append(serverList);
  });

  // 监听body的滚动,当滚动的高度大于同步高度时头部进行固定定位
  $('body').on('scroll', function (event) {
    var flag = true;
    if (this.scrollTop >= 100 && this.scrollTop <= 120) {
      $('.facilitatorWrap #header').slideUp(100);
    } else if (this.scrollTop >= 120) {
      $('.facilitatorWrap #header').css({
        position: 'fixed',
        top: 0,
        zIndex: 1000
      });
      if (flag) {
        $('.facilitatorWrap #header').slideDown(500);
        flag = false;
      }
    } else {
      $('.facilitatorWrap #header').css({
        position: 'static'
      });
      $('.facilitatorWrap #header').slideDown(0);
    }
  });

  // 获取热门城市相关数据
  $.get('http://localhost:3000/hotCity', function (data) {
    // 生成服务列表
    var objCity = { data: data };
    var cityList = template('cityList', objCity);
    $('.hot-city').append(cityList);
  });
});