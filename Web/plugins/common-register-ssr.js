import Vue from 'vue'
import { File_Domain } from "@/environment"
var websiteVue = {
  install (Vue) {
    Vue.prototype.$website = {
      GetFileUrl (url) {
        if (url)
          return (url || "").startsWith("http") ? url : File_Domain + url;
        return "";
      }
    }
  }
}
Vue.use(websiteVue);