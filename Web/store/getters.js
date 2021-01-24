const getters = {
  token: state => "Bearer " + state.user.userInfo.token,
  movies: state => state.movie.movies.data,
  loading: state => state.global.requestLoad
}
export default getters;