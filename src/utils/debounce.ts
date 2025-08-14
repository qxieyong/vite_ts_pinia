/**
 * 防抖函数
 * @param func 需要防抖的函数
 * @param delay 时间
 * @param immediate 是否立即执行
 * @returns
 */
/* eslint-disable-next-line space-before-function-paren */
function debounce<T extends (..._args: any[]) => void>(func: T, delay = 300, immediate = false): (..._args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout> | null = null;
	return function (..._args: Parameters<T>) {
		if (timer) clearTimeout(timer);

		if (immediate && !timer) {
			// 立即执行一次
			func(..._args);
		}

		timer = setTimeout(() => {
			if (!immediate) {
				func(..._args);
			}
			timer = null;
		}, delay);
	};
}

export default debounce;
