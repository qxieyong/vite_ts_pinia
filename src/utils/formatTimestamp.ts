import i18n from '@/utils/language';
const { t } = i18n.global;
/**
 * @param 时间戳获取日期
 * @param {number} mss 毫秒数
 * @param {boolean} isDate 是否需要年月日
*/
const formatTimestamp = (mss: number, isDate: boolean = true) => {
    //将毫秒转化成年月日时分秒
    let timdedetail = mss;//假如是10位毫秒需要乘1000
    //获取年份
    let year = new Date(timdedetail).getFullYear();
    //获取月份
    let month: number | string = new Date(timdedetail).getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    //获取日
    let date: number | string = new Date(timdedetail).getDate();
    if (date < 10) {
        date = "0" + date;
    }
    //获取小时
    let h1 = new Date(timdedetail).getHours() < 10 ? '0' + new Date(timdedetail).getHours() : new Date(timdedetail).getHours();
    //获取分钟
    let m1 = new Date(timdedetail).getMinutes() < 10 ? '0' + new Date(timdedetail).getMinutes() : new Date(timdedetail).getMinutes();
    //获取秒
    let s1 = new Date(timdedetail).getSeconds() < 10 ? '0' + new Date(timdedetail).getSeconds() : new Date(timdedetail).getSeconds();
    //组合格式为年-月-日 时：分：秒（2021-07-05 21:21:21）
    let starttime
    if (isDate) {
        starttime = year + "-" + month + "-" + date + " " + h1 + ":" + m1 + ":" + s1;
    } else {
        starttime = h1 + ":" + m1 + ":" + s1;
    }
    return starttime;
}



/**
 * @param 计算两个时间之间的时间差 多少天时分秒
 * @param {number} startTime 开始时间 毫秒数
 * @param {any[]} langTime 时间内容
*/
function intervalTime(startTime: number, langTime: any[]) {
    const [day, hour, minute, sec] = langTime;

    let endTime = new Date().getTime(); //结束时间
    let time = endTime - startTime; //时间差的毫秒数
    //计算出相差天数
    let days = Math.floor(time / (24 * 3600 * 1000));
    //计算出小时数

    let leave1 = time % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000));

    //计算相差秒数

    let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000);

    if (days > 0) {
        return days + day.value
    } else if (hours > 0) {
        return hours + hour.value + ' ' + minutes + minute.value + ' ' + seconds + sec.value
    } else if (minutes > 0) {
        return minutes + minute.value + ' ' + seconds + sec.value
    } else {
        return seconds + sec.value
    }
}




export { formatTimestamp, intervalTime }