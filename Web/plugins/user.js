import Vue from 'vue'
import loginDialog from '@/components/user/login'
const Login = {};
// 注册
Login.install = function (Vue) {
  const LoginConstructor = Vue.extend(loginDialog);
  const instance = new LoginConstructor();
  instance.$mount(document.createElement("div"));
  document.body.appendChild(instance.$el);

  Vue.prototype.$loginDialog = function () {
    instance.showLogin = true;
  };
};
Vue.use(Login);
export default ({ app }, inject) => {
  inject('loginDialog', Vue.prototype.$loginDialog)
}