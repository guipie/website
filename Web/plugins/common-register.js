import Vue from 'vue'
import PreviewImage from '@/components/common/previewImg'
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
