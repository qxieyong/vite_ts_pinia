import { ComponentCustomProperties } from "vue";
import Message from "@/utils/ElementUIMsg";


declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $message: Message;
  }
}
