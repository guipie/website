const getters = {
    token: state => "Bearer " + state.user.userInfo.token,
    movies: state => state.movie.movies.data
}
export default getters;