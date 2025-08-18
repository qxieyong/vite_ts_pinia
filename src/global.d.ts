// src/global.d.ts
import type { Message } from "@/utils/ElementUIMsg";

declare module "vue" {
	interface ComponentCustomProperties {
		$message: Message;
	}
}
