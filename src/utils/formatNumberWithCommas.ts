function formatNumberWithCommas(number: string | number) {
	// 将数字转换为字符串，并使用正则表达式在每三位数字之间插入逗号

	const strNumber = number.toString();
	if (strNumber.includes(".")) {
		const integerPart = strNumber.split(".")[0];
		return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + strNumber.split(".")[1];
	} else {
		return strNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}

export default formatNumberWithCommas;
