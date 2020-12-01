console.log("news.js");

const api = {
    newsApi: "AppApi/News/Index",
    detailApi: "AppApi/News/",
    typesApi: "AppApi/NewsType/Index",
    bannerNewsApi: "AppApi/WebsiteHomeConfig/GetBannerInfo"
};
//state里面存放的是变量，如果你要注册全局变量，写这里
export const state = () => ({
    news: {
        data: [],
        request: {
            order: "desc",
            page: 1,
            rows: 8,
            sort: "IsRecommend,CreateDate"
        }
    },
    bannerNews: {
        data: [],
        request: {
            wheres: JSON.stringify([{
                name: "MappingType",
                value: "资讯"
            }])
        }
    },
    detail: {},
    types: {
        data: [],
        request: {
            order: "asc",
            page: 1,
            rows: 20,
            sort: "Sequence"
        }
    },
});
//修改store中的变量的方法，如果你要改变变量的值，就写这（vuex中state中的值不能直接修改）
const mutations = {
    updateListData(state, action) {
        Object.assign(state.news, action);
    },
    updateBannerListData(state, action) {
        state.bannerNews.data = action;
    },
    updateOne(state, action) {
        state.detail = action;
    },
    updateTypeData(state, action) {
        state.types.data = action;
    },
};
//actions提交的是mutations，相当于就是改变变量的方法的重写，但是，actions是可以进行异步操作的
const actions = {
    fetchNewsList({
        commit,
        state
    }, params = {}) {
        return this.$http.post(api.newsApi, {
                ...state.news.request,
                ...params
            })
            .then(data => {
                commit('updateListData', data);
            }).catch(error => console.log(error))
    },
    fetchBannerNews({
        commit,
        state
    }) {
        return this.$http.post(api.bannerNewsApi, state.bannerNews.request)
            .then(data => {
                commit('updateBannerListData', data);
            }).catch(error => console.log(error))
    },
    fetchOneNews({
        commit
    }, newsId) {
        return this.$http.get(api.detailApi + newsId)
            .then(data => {
                commit('updateOne', data);
            }).catch(error => console.log(error))
    },
    fetchTypeList({
        commit,
        state
    }) {
        return this.$http.post(api.typesApi, state.types.request)
            .then(data => {
                commit('updateTypeData', data);
            }).catch(error => console.log(error))
    },
};
export default {
    namespaced: true, //命名空间
    state, //这里你用到了哪几个属性就写哪几个，不需要的可以注释掉
    //  getters,
    actions,
    mutations
};