declare module "Plugin" {
  import { PluginFunction } from "vue";
  import { ToastInterface } from "@/plugin/ToastPlugin";

  export const install: PluginFunction<{}>;

  declare module "vue/types/vue" {
    interface VueConstructor {
      apiCall: ApiClientInterface["apiCall"];
      toastSay: ToastInterface["toastSay"];
      toastInfo: (message: string) => void;
      toastWarning: (message: string) => void;
      toastSuccess: (message: string) => void;
      toastError: (message: string) => void;
    }
  }
}
