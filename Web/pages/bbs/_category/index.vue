<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/bbs' }">论坛</el-breadcrumb-item>
      <el-breadcrumb-item>{{$parent.bbsDetail.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="jinsom-bbs-box" style="min-height: 300px">
      <div class="jinsom-bbs-box-header clear">
        <div class="left">
          <li @click='getList(1)' :class="active==1?'on':''">回复</li>
          <li @click='getList(2)' :class="active==2?'on':''">最新</li>
          <li @click='getList(3)' :class="active==3?'on':''">精华推荐</li>
        </div>
        <div class="right">
          <el-input type="text" @keyup.native.enter="getList(1)" clearable v-model="searchKey" placeholder="搜索该论坛帖子内容">
          </el-input>
        </div>
      </div>
      <div class="jinsom-bbs-list-box" v-loading="$store.getters.loading">
        <div></div>
        <div class="jinsom-bbs-list-1" v-for="post in posts.data" :key="post.newsId">
          <div class="left clear">
            <nuxt-link to="/user" target="_blank">
              <img :src="$website.GetFileUrl(post.headImageUrl)" class="avatar opacity" width="50" height="50" />
            </nuxt-link>
          </div>
          <div class="right">
            <h2>
              <nuxt-link :to="`/bbs/${$parent.bbsDetail.name}/${post.newsId}`">
                {{ post.title }}
              </nuxt-link>
              <el-link type="info" v-for="tag in getTags(post.tags)" :key="tag">#{{ tag }}#</el-link>
            </h2>
            <div class="jinsom-bbs-list-1-info clear">
              <div class="jinsom-bbs-list-1-info-left">
                <span>
                  <a href="/user" target="_blank">
                    <i class="el-icon-user"></i>{{ post.userTrueName }}</a>
                </span>
                <span> {{ DateDiff(post.modifyDate) }}</span>
                <span><i class="el-icon-view"></i>{{ parseInt(Math.random() * 1000) }}</span>
              </div>
              <div class="jinsom-bbs-list-1-info-right">
                <div class="num">
                  <i class="el-icon-s-comment"></i>
                  {{post.CommentCount||0}}
                </div>
                <div class="num">
                  <i class="el-icon-star-on"></i>
                  {{post.PraiseCount||0}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="el-pagination is-background" style="padding-bottom: 50px">
          <ul class="el-pager">
            <nuxt-link v-for="page in Math.ceil(posts.total / 5)" :to="`?page=${page}`" :key="page">
              <li class="number" :class="page ==($route.query.page||1) ? 'active' : ''">{{ page }}</li>
            </nuxt-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateDiff } from "@/plugins/common";
export default {
  name: "bbsList",
  data () {
    return {
      active: 1,
      searchKey: ""
    }
  },
  computed: {
    posts () {
      return this.$store.state.news.news;
    },
  },
  mounted () {
  },
  methods: {
    getTags (tags) {
      if (tags) return tags.split(",");
      return [];
    },
    getList (type) {
      this.active = type;
      let wheres = [{ name: "BbsId", value: this.$store.state.bbs.currentBbs.id }];
      let sort = "ModifyDate"
      let unionWheres = "[]";
      if (type == 2) sort = "CreateDate";
      if (type == 3) sort = "IsRecommend,CreateDate";
      if (this.searchKey)
        unionWheres = JSON.stringify([
          [{ name: "Title", value: this.searchKey, displayType: 'like' },
          { name: "Summary", value: this.searchKey, displayType: 'like' },
          { name: "Content", value: this.searchKey, displayType: 'like' }]
        ]);
      this.$store.dispatch("news/fetchNewsList", {
        page: 1,
        sort: sort,
        wheres: JSON.stringify(wheres),
        unionWheres: unionWheres
      })
    },
    DateDiff: DateDiff,
  },
};
</script>

<style></style>
