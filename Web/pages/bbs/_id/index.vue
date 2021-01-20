<template>
  <div class="jinsom-bbs-box" style="min-height: 300px">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="jinsom-bbs-box-header clear">
      <div class="left">
        <li onclick='jinsom_ajax_bbs_menu("comment",this)' class="on" topic="">回复</li>
        <li onclick='jinsom_ajax_bbs_menu("new",this)' topic="">最新</li>
        <li onclick='jinsom_ajax_bbs_menu("nice",this)' topic="">精华</li>
        <li onclick='jinsom_ajax_bbs_menu("vote",this)' topic="">投票</li>
      </div>
      <div class="right">
        <el-input type="text" id="jinsom-bbs-search" placeholder="搜索内容"></el-input>
      </div>
    </div>
    <div class="jinsom-bbs-list-box">
      <div class="jinsom-bbs-list-1" v-for="post in posts" :key="post.newsId">
        <div class="left clear">
          <nuxt-link to="/user" target="_blank">
            <img
              loading="lazy"
              src="https://jjcdn2.yangpinwang.com/wp-content/uploads/2020/07/u19906250983468619056fm11gp0-1.jpg"
              class="avatar opacity"
              width="50"
              height="50"
              alt="蓝风"
            />
          </nuxt-link>
        </div>
        <div class="right">
          <h2>
            <a href="https://jjhuashui.com/archives/80680" target="_blank">
              发帖
              <span class="cat-item-19">搞笑、动图、段子</span>
            </a>
          </h2>
          <span class="mark">
            <span class="jinsom-bbs-post-type-img">
              <i class="jinsom-icon jinsom-tupian2"></i>
            </span>
          </span>
          <div class="num"><i class="el-icon-s-comment"></i>12</div>
          <div class="jinsom-bbs-list-1-info clear">
            <div class="jinsom-bbs-list-1-info-left">
              <span>
                <a href="https://jjhuashui.com/archives/author/2098" target="_blank">
                  <i class="el-icon-user"></i>蓝风</a
                >
              </span>
              <span>1月前</span>
              <span><i class="el-icon-view"></i> 1.3k</span>
            </div>
            <div class="jinsom-bbs-list-1-info-right"></div>
          </div>
        </div>
      </div>
      <div class="el-pagination is-background" style="padding-bottom: 50px">
        <ul class="el-pager">
          <nuxt-link v-for="page in 15" :to="`?page=${page}`" :key="page">
            <li class="number" :class="page === 1 ? 'active' : ''">{{ page }}</li>
          </nuxt-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  fetch({ store, route }) {
    let wheres = [{ name: "BbsId", value: route.params.id }];
    return Promise.all([
      store.dispatch("news/fetchNewsList", {
        page: 1,
        sort: "CreateDate",
        wheres: JSON.stringify(wheres),
      }),
    ]);
  },
  computed: {
    posts() {
      debugger;
      return this.$store.state.news.news;
    },
  },
  mounted() {},
};
</script>

<style></style>
