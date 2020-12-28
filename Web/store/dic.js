console.log("dic.js");
const api = {
  dicApi: "AppApi/Dic/GetDicByKey"
};

//state里面存放的是变量，如果你要注册全局变量，写这里
export const state = () => ({
  commentType: [],
});
//修改store中的变量的方法，如果你要改变变量的值，就写这（vuex中state中的值不能直接修改）
const mutations = {
  setCommentType (state, value) {
    if (value && value.length > 0)
      state.commentType = value[0].data;
  }
};
//actions提交的是mutations，相当于就是改变变量的方法的重写，但是，actions是可以进行异步操作的
const actions = {
  fetchCommentTypes ({
    commit, state
  }, params = {}) {
    return this.$http.get(api.dicApi, { ...params, key: "commentType" })
      .then(data => {
        commit('setCommentType', data);
      }).catch(error => console.log(error))
  }
};

export default {
  namespaced: true, //命名空间
  state, //这里你用到了哪几个属性就写哪几个，不需要的可以注释掉
  //  getters,
  actions,
  mutations
};