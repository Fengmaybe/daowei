"use strict";$(function(){$.get("http://localhost:3000/item",function(e){var t=template("server-project",e);$(".target-comment").append(t)}),$("body").on("scroll",function(e){var t=!0;100<=this.scrollTop&&this.scrollTop<=120?$(".commentsWrap #header").slideUp(100):120<=this.scrollTop?($(".commentsWrap #header").css({position:"fixed",top:0,zIndex:1e3}),t&&($(".commentsWrap #header").slideDown(500),t=!1)):($(".commentsWrap #header").css({position:"static"}),$(".commentsWrap #header").slideDown(0))});for(var t=$(".comment-categroy .comment-categroy-wrap a"),a=0,e=function(e){t[e].onclick=function(){t[a].classList.remove("active"),$(this).addClass("active"),a=e}},n=0;n<t.length;n++)e(n);function v(e){var t=new Date(e);return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()}$.get("http://localhost:3000/item",function(e){var t=template("server-detail",e);$(".serverCenter").append(t);var a=template("company",e);$(".company-description").append(a)}),$.get("http://localhost:3000/comment",function(o){var t=0;console.log("评论的总条数",o.length);var a=parseInt(o.length/10)-3;console.log("分隔出来的数量",a);for(var e=o.splice(10*t,10),n=0;n<e.length;n++)e[n].createtime=v(e[n].createtime);var c=template("commentList",{data:e});$(".commentsUl").append(c);var i=new Array(a).fill("1"),s=template("pageList",{dataArr:i});$(".pageList").append(s);var r=$(".pageList .paging-item");function l(e){$(".commentsUl").empty(),d&&d.remove();for(var t=0;t<r.length;t++)r[t].style.display="inline-block";for(var a=o.slice(10*e,10*e+10),n=0;n<newData.length;n++)a[n].createtime=v(a[n].createtime);var c=template("commentList",{data:a});$(".commentsUl").append(c)}r[t].classList.add("on-checked");for(var p=function(e){r[e].onclick=function(){r[t].classList.remove("on-checked"),r[e].classList.add("on-checked"),l(t=e),h(t)}},m=0;m<r.length;m++)p(m);$(".pre").click(function(){var e=t;--t<0?t=0:(r[e].classList.remove("on-checked"),r[t].classList.add("on-checked"),l(t),h(t))}),$(".next").click(function(){var e=t;a<=++t&&(t=0),r[e].classList.remove("on-checked"),r[t].classList.add("on-checked"),l(t),h(t)});var d=void 0;function h(e){if(4<=e){var t=$(".pageList").children().eq(4);(d=$("<span>...</span>")).css({display:"inline-block",fontSize:"14px",width:"10px",height:"30px",textAlign:"center",marginRight:"-3px"}),d.insertBefore(t);var a=e-4;7<=a&&(a=7);for(var n=0;n<a;n++)r[n+3].style.display="none"}}}),$.get("http://localhost:3000/hotCity",function(e){var t=template("cityList",{data:e});$(".hot-city").append(t)})});