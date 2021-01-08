console.log("comment.js");
const commentApi = {
  commentsApi: "AppApi/Comment/Index", //评论列表
  addApi: "AppApi/Comment/Save", //评论添加
  praiseApi: "AppApi/Comment/Update/Praise/", //评论添加
};

//state里面存放的是变量，如果你要注册全局变量，写这里
export const state = () => ({
  comments: {
    data: [],
    request: {
      order: "desc",
      page: 1,
      rows: 8,
      sort: "CreateDate"
    }
  },
  addCount: 0,
  praises: []
});
//修改store中的变量的方法，如果你要改变变量的值，就写这（vuex中state中的值不能直接修改）
const mutations = {
  setComments (state, value) {
    state.comments.data = value.rows;
    state.comments.request.total = value.total;
  },
  setCommentsOne (state, one) {
    state.comments.data.unshift(one);
  },
  addCount (state) {
    state.addCount++;
  },
  addPraise (state, Id) {
    debugger
    state.praises.push(Id);
    let praiseOne = state.comments.data.find(m => m.Id == Id);
    praiseOne.Praise = praiseOne.Praise + 1;
  }
};
//actions提交的是mutations，相当于就是改变变量的方法的重写，但是，actions是可以进行异步操作的
const actions = {
  fetchReComments ({
    state
  }, parentId) {
    return new Promise((resolve, reject) => {
      return this.$http.post(commentApi.commentsApi, { ...state.comments.request, ...{ wheres: JSON.stringify([{ "name": "ParentId", "value": parentId }]) } })
        .then(data => {
          resolve(data);
        }).catch(error => reject(error))
    });
  },
  fetchRootComments ({
    commit,
    state
  }, params = []) {
    let wheres = [{ "name": "ParentId", "value": "0" }];
    if (params.length > 0)
      wheres = wheres.concat(params);
    return this.$http.post(commentApi.commentsApi, { ...state.comments.request, ...{ wheres: JSON.stringify(wheres) } })
      .then(data => {
        commit('setComments', data);
      }).catch(error => console.log(error))
  },
  addComments ({ state, commit }, params = {}) {
    if (state.addCount > 2)
      return $nuxt.$notify({
        title: '警告',
        message: '您操作过于频繁,请稍后重试...',
        type: 'warning'
      });
    commit("addCount");
    return new Promise((resolve, reject) => {
      return this.$http.post(commentApi.addApi, { MainData: params })
        .then(data => {
          resolve(data);
          commit("setCommentsOne", JSON.parse(data.data).data)
        }).catch(error => reject(error))
    });
  },
  addCommentsPraise ({ state, commit }, Id) {
    if (state.praises.includes(Id))
      return $nuxt.$notify({
        title: '警告',
        message: '您操作过于频繁,请稍后重试...',
        type: 'warning'
      });
    return new Promise((resolve, reject) => {
      return this.$http.post(commentApi.praiseApi + Id)
        .then(data => {
          resolve(data);
          commit("addPraise", Id);
        }).catch(error => reject(error))
    });
  }
};

export default {
  namespaced: true, //命名空间
  state, //这里你用到了哪几个属性就写哪几个，不需要的可以注释掉
  //  getters,
  actions,
  mutations
};