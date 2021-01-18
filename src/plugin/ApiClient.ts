import Vue, { PluginFunction } from "vue";
import { VueConstructor } from "vue/types/umd";
import router from "@/router";
import store from "@/store";

interface ApiClientInterface {
  install: PluginFunction<{}>;
  apiCall: (url: string, method?: string, data?: any) => any;
}

class ApiClient implements ApiClientInterface {
  install(instance: VueConstructor<Vue>) {
    instance.apiCall = this.apiCall;
  }

  async apiCall(url: string, method?: string, data?: any) {
    if (!method) {
      method = "GET";
    }
    if (!data) {
      data = null;
    } else {
      data = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: data
      });
      const responseData = await response.json();
      if (responseData.needsLogin === true) {
        store.commit("userLogout");
        if (router.currentRoute.path != "/login") {
          router.push("/login");
          return {
            success: false,
            message: "Login-Fehler"
          };
        }
      } else {
        return responseData;
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: "request failed"
      };
    }
  }
}

export default new ApiClient();
