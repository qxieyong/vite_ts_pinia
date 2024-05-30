const isMobile = () => {
	const flag = navigator.userAgent.match(
		// eslint-disable-next-line max-len
		/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
	);
	return flag;
};

export default isMobile;
