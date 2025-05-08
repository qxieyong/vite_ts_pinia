import { ComponentCustomProperties } from "vue";
import Message from "@/utils/ElementUIMsg";
import { Router, createRouter } from 'vue-router'

declare module "@vue/runtime-core" {
	interface ComponentCustomProperties {
		$message: typeof Message;
	}
}