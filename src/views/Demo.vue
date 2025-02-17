<template>
	<div>
		<el-button type="primary">Primary</el-button>
		<i-ep-CircleCheckFilled />
		<i-ep-EditPen />
		<p @click="test">11</p>
	</div>
</template>

<script lang="ts" setup>
import { ComponentInternalInstance, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import useStore from "@/store";

import debounce from "@/utils/debounce";
import throttle from "@/utils/throttle";

const { user } = useStore();
const { t } = useI18n();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// proxy?.$message.success("成功");


// const test = debounce(() => console.log("防抖执行"), 500, false);
const test = throttle(() => console.log("节流执行"), 5000, false);

</script>

<style scoped lang="scss"></style>
