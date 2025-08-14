import i18n from "@/utils/language";

import ElMessage from "./ElementUIMsg";
const { t } = i18n.global;
const copy = (val: string) => {
	if (navigator.clipboard) {
		navigator.clipboard
			.writeText(val)
			.then(_res => {
				ElMessage.success(t("copySuccess"));
			})
			.catch(_e => {
				ElMessage.error(t("copyFailed"));
			});
	} else {
		const input: HTMLInputElement = document.createElement("input");
		input.value = val;
		document.body.appendChild(input);
		input.select();
		document.execCommand("Copy");
		document.body.removeChild(input);
		ElMessage.success(t("copySuccess"));
	}
};

export default copy;
