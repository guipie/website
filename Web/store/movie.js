console.log("movie.js");
const api = {
    moviesApi: "AppApi/Movie/Index",
    detailApi: "AppApi/Movie/PlayOne/",
    typesApi: "AppApi/MovieType/Index",
    bannerMoviesApi: "AppApi/WebsiteHomeConfig/GetBannerInfo"
};
//state里面存放的是变量，如果你要注册全局变量，写这里
export const state = () => ({
    movies: {
        data: [],
        request: {
            order: "asc",
            page: 1,
            rows: 8,
            sort: "Sequence"
        }
    },
    bannerMovies: {
        data: [],
        request: {
            wheres: JSON.stringify([{
                name: "MappingType",
                value: "影视"
            }])
        }
    },
    detail: {},
    playList: [],
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
        Object.assign(state.movies, action);
    },
    updateBannerListData(state, action) {
        state.bannerMovies.data = action;
    },
    updateOne(state, action) {
        state.detail = action;
        state.playList = action.playList;
    },
    updateTypeData(state, action) {
        state.types.data = action;
    },
    resetPage(state) {
        state.movies.nextPage = 1;
    },
};
//actions提交的是mutations，相当于就是改变变量的方法的重写，但是，actions是可以进行异步操作的
const actions = {
    fetchMovieList({
        commit,
        state
    }, params = {}) {
        return new Promise((resolve, reject) => {
            return this.$http.post(api.moviesApi, {
                    ...state.movies.request,
                    ...params
                })
                .then(data => {
                    commit('updateListData', data);
                    resolve(data)
                }).catch(error => {
                    console.log(error);
                    reject();
                })
        });
    },
    fetchBannerMovies({
        commit,
        state
    }) {
        return this.$http.post(api.bannerMoviesApi, state.bannerMovies.request)
            .then(data => {
                commit('updateBannerListData', data);
            }).catch(error => console.log(error))
    },
    fetchMovie({
        commit
    }, movieId) {
        return this.$http.get(api.detailApi + movieId)
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