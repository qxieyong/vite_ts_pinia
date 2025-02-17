/**
 * 
 * @param func 需要防抖的函数
 * @param delay 时间
 * @param immediate 是否立即执行
 * @returns 
 */
function debounce<T extends (...args: any[]) => void>(func: T, delay: number = 300, immediate: boolean = false): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout> | null = null;
	return function (...args: Parameters<T>) {
		if (timer) clearTimeout(timer);

		if (immediate && !timer) {
			// 立即执行一次
			func(...args);
		}

		timer = setTimeout(() => {
			if (!immediate) {
				func(...args);
			}
			timer = null;
		}, delay);
	};
}

export default debounce;
