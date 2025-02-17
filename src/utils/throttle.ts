/**
 * 
 * @param func 需要节流的函数
 * @param interval 间隔时间
 * @param immediate 是否立即执行
 * @returns 
 */
function throttle<T extends (...args: any[]) => void>(func: T, interval: number = 300, immediate: boolean = true): (...args: Parameters<T>) => void {
	let lastTime = 0;
	let timer: ReturnType<typeof setTimeout> | null = null;

	return function (...args: Parameters<T>) {
		const now = Date.now();

		if (immediate && lastTime === 0) {
			func(...args);
			lastTime = now;
			return;
		}

		if (now - lastTime > interval) {
			func(...args);
			lastTime = now;
		} else if (!timer) {
			timer = setTimeout(
				() => {
					func(...args);
					lastTime = Date.now();
					timer = null;
				},
				interval - (now - lastTime)
			);
		}
	};
}

export default throttle;
