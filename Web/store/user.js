const userKey = "userInfo";

//state里面存放的是变量，如果你要注册全局变量，写这里
export const state = () => ({
  userInfo: {},
});
//修改store中的变量的方法，如果你要改变变量的值，就写这（vuex中state中的值不能直接修改）
const mutations = {
  setUser (state, value) {
    if (!value || typeof (value) != "object") 
    {
      state.userInfo = {};
      localStorage.setItem(userKey, JSON.stringify({}));
      this.$cookies.set("token", "");
    }
    else
    {
      state.userInfo = value;
      localStorage.setItem(userKey, JSON.stringify(value));
      this.$cookies.set("token", value.token);
    }
  },
  clearUser (state) {
    state.userInfo = {};
    localStorage.removeItem(userKey);
  }
};
//actions提交的是mutations，相当于就是改变变量的方法的重写，但是，actions是可以进行异步操作的
const actions = {
  async setUser ({
    state,
    commit
  }, val) {
    commit('setUser', val);
  }
};

export default {
  namespaced: true, //命名空间
  state, //这里你用到了哪几个属性就写哪几个，不需要的可以注释掉
  //  getters,
  actions,
  mutations
};