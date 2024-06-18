//适配兼容
import debounce from './debounce';
(function (doc, win) {
    console.log('win.devicePixelRatio', win.devicePixelRatio);
    const dpr = Math.min(win.devicePixelRatio, 3),
        scale = 1 / dpr,
        resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';

    const recalCulate = function () {
        let docEle = document.documentElement,
            w = docEle.clientWidth,
            num = Math.ceil(w / 1920 * 100);  // **此时的1920就是你设计稿的尺寸
            // num = w /  100;  // **此时的1920就是你设计稿的尺寸
        let fontSize = num > 100 ? 100 : num < 30 ? 30 : num;

        docEle.style.fontSize = fontSize + 'px';
    };

    

    const debouncedRecalculate = debounce(recalCulate, 100);

    recalCulate();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvent, debouncedRecalculate, false);
})(document, window);
