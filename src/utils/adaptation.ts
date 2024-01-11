//适配兼容
(function (doc, win) {
    console.log('win.devicePixelRatio',win.devicePixelRatio)
    // var docEle = doc.documentElement;
    const dpr = Math.min(win.devicePixelRatio, 3),
        scale = 1 / dpr,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';   //orientationchange 屏幕方向变化

    var recalCulate = function () {
        var docEle = document.documentElement,
            w = docEle.clientWidth,
            num = (w > 1920 ? 1920 : w) / 1920;       // **此时的1920就是你设计稿的尺寸
        let fontSize = num * 100 > 70 ? 70 : num * 100 < 30 ? 30 : num * 100; 
        docEle.style.fontSize = fontSize.toFixed(1) + 'px';
    };
    recalCulate();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvent, recalCulate, false);
})(document, window);