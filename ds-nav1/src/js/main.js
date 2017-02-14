/**
 * Created by feilm220 on 2017/2/8.
 */
require("../css/main.less")

var $ = require("jquery")

window.onload = function () {
    //var lis = document.querySelector(".ds-nav");
    var lis = $(".ds-nav").children();
    $.each(lis, function (i, n) {
        //console.log(n);
        $(n).mouseenter(function (e) {
            console.log($(n));

        });
        $(n).mouseleave(function (e) {
            console.log($(n));
        })
    });
}