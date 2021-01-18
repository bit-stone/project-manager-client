import Vue, { PluginFunction } from "vue";
import { VueConstructor } from "vue/types/umd";
import ToastComponent from "./Toast.vue";
import store from "@/store";

export enum ToastMessageType {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error"
}

export interface Toast {
  message: string;
  type?: ToastMessageType;
  duration?: number;
}

export interface ToastInterface {
  install: PluginFunction<{}>;
  toastSay: (toastData: Toast) => void;
}

class ToastPlugin implements ToastInterface {
  instance?: VueConstructor<Vue>;

  install(instance: VueConstructor<Vue>, options?: any) {
    instance.toastSay = this.toastSay;
    instance.toastWarning = this.toastWarning;
    instance.toastInfo = this.toastInfo;
    instance.toastSuccess = this.toastSuccess;
    instance.toastError = this.toastError;
    Vue.component("Toast", ToastComponent);
  }

  toastSay(toastData: Toast) {
    if (!toastData.type) {
      toastData.type = ToastMessageType.info;
    }
    if (!toastData.duration) {
      toastData.duration = 5000;
    }

    store.commit("toastAdd", { toastData });
  }

  toastInfo(message: string) {
    this.toastSay({
      message,
      type: ToastMessageType.info,
      duration: 3500
    });
  }

  toastWarning(message: string) {
    this.toastSay({
      message,
      type: ToastMessageType.warning,
      duration: -1
    });
  }

  toastSuccess(message: string) {
    this.toastSay({
      message,
      type: ToastMessageType.success,
      duration: 3500
    });
  }

  toastError(message: string) {
    this.toastSay({
      message,
      type: ToastMessageType.error,
      duration: -1
    });
  }
}

export default new ToastPlugin();
