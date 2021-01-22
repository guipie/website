<template>
  <div class="jinsom-bbs-box" style="min-height: 300px">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/bbs' }">论坛</el-breadcrumb-item>
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
      <div class="jinsom-bbs-list-1" v-for="post in posts.data" :key="post.newsId">
        <div class="left clear">
          <nuxt-link to="/user" target="_blank">
            <img
              :src="$website.GetFileUrl(post.headImageUrl)"
              class="avatar opacity"
              width="50"
              height="50"
            />
          </nuxt-link>
        </div>
        <div class="right">
          <h2>
            <nuxt-link :to="'/bbs/post/' + post.newsId" target="_blank">
              {{ post.title }}
            </nuxt-link>
            <el-link type="info" v-for="tag in getTags(post.tags)" :key="tag"
              >#{{ tag }}#</el-link
            >
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
                  <i class="el-icon-user"></i>{{ post.userTrueName }}</a
                >
              </span>
              <span> {{ DateDiff(post.modifyDate) }}</span>
              <span
                ><i class="el-icon-view"></i>{{ parseInt(Math.random() * 1000) }}</span
              >
            </div>
            <div class="jinsom-bbs-list-1-info-right"></div>
          </div>
        </div>
      </div>
      <div class="el-pagination is-background" style="padding-bottom: 50px">
        <ul class="el-pager">
          <nuxt-link
            v-for="page in Math.ceil(posts.total / 10)"
            :to="`?page=${page}`"
            :key="page"
          >
            <li class="number" :class="page === 1 ? 'active' : ''">{{ page }}</li>
          </nuxt-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { DateDiff } from "@/plugins/common";
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
      return this.$store.state.news.news;
    },
  },
  mounted() {},
  methods: {
    getTags(tags) {
      if (tags) return tags.split(",");
      return [];
    },
    DateDiff: DateDiff,
  },
};
</script>

<style></style>
