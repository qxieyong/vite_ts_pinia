/**
 * 节流函数
 * @param func 需要节流的函数
 * @param interval 间隔时间
 * @param immediate 是否立即执行
 * @returns
 */
/* eslint-disable-next-line space-before-function-paren */
function throttle<T extends (..._args: any[]) => void>(func: T, interval = 300, immediate = true): (..._args: Parameters<T>) => void {
	let lastTime = 0;
	let timer: ReturnType<typeof setTimeout> | null = null;

	return function (..._args: Parameters<T>) {
		const now = Date.now();

		if (immediate && lastTime === 0) {
			func(..._args);
			lastTime = now;
			return;
		}

		if (now - lastTime > interval) {
			func(..._args);
			lastTime = now;
		} else if (!timer) {
			timer = setTimeout(
				() => {
					func(..._args);
					lastTime = Date.now();
					timer = null;
				},
				interval - (now - lastTime)
			);
		}
	};
}

export default throttle;
