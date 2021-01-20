import Vue from 'vue'
import PreviewImage from '@/components/common/previewImg'
import { File_Domain } from "@/environment"
const Preview = {};
// 注册
Preview.install = function (Vue) {
  const PreviewConstructor = Vue.extend(PreviewImage);
  const instance = new PreviewConstructor();
  instance.$mount(document.createElement("div"));
  document.body.appendChild(instance.$el);

  /**
   * 挂载在vue原型上
   * @param {Array} urls 需要预览的图片数组
   */
  Vue.prototype.$openPreviews = function (urls = []) {
    instance.showPreview = true;
    instance.previewImages = urls;
  };
  Vue.prototype.$openPreview = function (url) {
    instance.showPreview = true;
    instance.previewImages = [url];
  };
};
Vue.use(Preview);
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
