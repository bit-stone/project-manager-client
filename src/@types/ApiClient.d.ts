declare module "ApiClient" {
  import { PluginFunction } from "vue";
  export const install: PluginFunction<{}>;

  interface ApiClientInterface {
    install: PluginFunction<{}>;
    apiCall: (url: string, method?: string, data?: any) => any;
  }

  declare module "vue/types/vue" {
    interface VueConstructor {
      $apiCall: ApiClientInterface["apiCall"];
    }
  }
}
