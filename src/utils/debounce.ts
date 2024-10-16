const debounce = function (func: Function, wait: number) {
    let timeout: any = null;
    return function (this: any, ...args: any[]) {
        const context = this;
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
};

export default debounce;
