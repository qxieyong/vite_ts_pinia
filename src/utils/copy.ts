// import { Toast } from 'vant';
// import { ElMessage } from 'element-plus';
import ElMessage from './ElementUIMsg';
import i18n from '@/utils/language';
const { t } = i18n.global;
const copy = (val: string) => {
    let input: HTMLInputElement = document.createElement('input');
    input.value = val;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
    ElMessage.success({ message: `copy success`, duration: 1500 });
    // ElMessage.success({ message: '复制成功！', duration: 1000 });
    // alert('复制成功');
};

export default  copy;
