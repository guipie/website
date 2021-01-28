/**
 * 文章内容相关接口 
 */
export default axios => ({
  LikeNews (newsId) { return axios.post("AppApi/News/Like/" + newsId) },//收藏喜欢文章/帖子
  PraiseNews (newsId) { return axios.post("AppApi/News/Praise/" + newsId) }//点赞文章/帖子
});