console.log("bbs.js");
const api = {
  bbsRecommendList: "AppApi/NewsType/recommend",
  bbsList: "AppApi/NewsType/index",
  bbsPostList: ""
};
//state里面存放的是变量，如果你要注册全局变量，写这里
export const state = () => ({
  bbsRecommend: [],
  bbs: {
    data: [],
    request: {
      order: "asc",
      page: 1,
      rows: 20,
      sort: "Sequence,ModifyDate"
    }
  },
  bbsPost: []
});
//修改store中的变量的方法，如果你要改变变量的值，就写这（vuex中state中的值不能直接修改）
const mutations = {
  setBBSRecommend (state, value) {
    state.bbsRecommend = value;
  },
  setBBS (state, value) {
    state.bbs.data = value.data;
    state.bbs.total = value.total
  }
};
//actions提交的是mutations，相当于就是改变变量的方法的重写，但是，actions是可以进行异步操作的
const actions = {
  fetchBBSRecommend ({
    commit
  }) {
    this.$http.get(api.bbsRecommendList)
      .then(data => {
        commit('setBBSRecommend', data);
      }).catch(error => console.log(error))
  },
  fetchBBS ({
    commit,
    state
  }, params = {}) {
    this.$http.post(api.bbsList, {
      ...state.bbs.request,
      ...params
    }).then(data => {
      commit('setBBS', data);
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