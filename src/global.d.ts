// src/global.d.ts
import type { Message } from "@/utils/ElementUIMsg";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $message: Message;
  }
}
