import ElMessage from './ElementUIMsg';
import i18n from '@/utils/language';
const { t } = i18n.global;
const copy = (val: string) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(val).then(_res => {
            ElMessage.success(t("header.inviteCopy"));
        }).catch(_e => {
            ElMessage.error(t("global.error"));
        })
    } else {
        let input: HTMLInputElement = document.createElement('input');
        input.value = val;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        document.body.removeChild(input);
        ElMessage.success(t("header.inviteCopy"));
    }
};

export default copy;
