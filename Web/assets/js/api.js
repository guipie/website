/**
 * 文章内容相关接口 
 */
export const likeNews = (newsId) => this.$http.post("AppApi/Like/" + newsId);//收藏喜欢文章/帖子
export const praiseNews = (newsId) => this.$http.post("AppApi/Praise/" + newsId);//点赞文章/帖子