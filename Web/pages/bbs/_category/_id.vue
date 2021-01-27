<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/bbs' }">论坛</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/bbs/${$parent.bbsDetail.name}` }">
        {{ $parent.bbsDetail.name }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ articleDetail.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="bbs-detail">
      <el-col :span="6" class="bbs-detail-left">
        <div class="avatar">
          <el-avatar :size="60" :src="$website.GetFileUrl(articleDetail.headImageUrl)">
          </el-avatar>
          <div>{{ articleDetail.userTrueName }}</div>
        </div>
      </el-col>
      <el-col :span="18" class="bbs-detail-right">
        <div class="bbs-detail-content" v-html="articleDetail.content"></div>
        <div class="bbs-detail-footer" style="font-size: 16px; color: #000">
          <span :title="articleDetail.createDate">
            {{ DateDiff(articleDetail.createDate) }}
          </span>
          <span v-for="t in Split(articleDetail.tags)" :key="t"> #{{ t }}# </span>
          <span class="replyComment" @click="alert(111)">
            <i class="el-icon-chat-square"></i>123
          </span>
        </div>
      </el-col>
    </el-row>
    <el-row
      v-for="(append, index) in appendList.data"
      :key="append.id"
      class="bbs-detail"
    >
      <el-col :span="6" class="bbs-detail-left">
        <div class="avatar">
          <el-avatar :size="60" :src="$website.GetFileUrl(append.headImageUrl)">
          </el-avatar>
          <div>{{ append.userTrueName }}</div>
        </div>
      </el-col>
      <el-col :span="18" class="bbs-detail-right">
        <div class="bbs-detail-content" v-html="append.content"></div>
        <div class="bbs-detail-footer">
          <span>{{ append.createDate }}</span>
          <span>{{ getFloors(index) }}楼</span>
          <span class="replyComment" @click="alert(111)">
            <i class="el-icon-chat-square"></i>123
          </span>
        </div>
      </el-col>
    </el-row>
    <div class="guajian">
      <el-button icon="el-icon-star-on" circle></el-button>
      <el-button icon="el-icon-chat-line-square" circle @click="replyTo()"> </el-button>
      <el-button icon="el-icon-share" circle></el-button>
      <nuxt-link :to="`/bbs/${$parent.bbsDetail.name}/${articleDetail.newsId}`">
        <el-button icon="el-icon-refresh-left" circle></el-button>
      </nuxt-link>
    </div>
    <ul class="el-pager">
      <nuxt-link
        v-for="page in Math.ceil(appendList.total / 6)"
        :to="`?page=${page}`"
        :key="page"
      >
        <li class="number" :class="page == ($route.query.page || 1) ? 'active' : ''">
          {{ page }}
        </li>
      </nuxt-link>
    </ul>
    <div id="bbsReply"></div>
    <el-button
      type="primary"
      plain
      style="float: right"
      v-loading="replyLoading"
      @click="replySubmit()"
      >回复</el-button
    >
  </div>
</template>
<script>
import { DateDiff, Split } from "@/assets/js/common";
let editor = null;
export default {
  scrollToTop: true,
  data() {
    return {
      replyLoading: false,
      replyModel: {},
    };
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  watchQuery: true,
  watchQuery: ["page"],
  async asyncData({ route, redirect, $http, store }) {
    let [articleDetail] = await Promise.all([
      $http.post("AppApi/News/" + route.params.id),
    ]);
    if (articleDetail.newsId > 0) {
      await Promise.all([
        store.dispatch("bbs/fetchBBSNewsAppendList", {
          page: route.query.page || 1,
          sort: "CreateDate",
          rows: 6,
          wheres: JSON.stringify([{ name: "NewsId", value: articleDetail.newsId }]),
        }),
      ]);
      return { articleDetail };
    } else redirect("/404?p=" + route.path);
  },
  computed: {
    appendList() {
      return this.$store.state.bbs.bbsNewsAppendList;
    },
  },
  mounted() {
    if (process.browser) {
      let E = require("wangeditor");
      editor = new E("#bbsReply");
      editor.config.zIndex = 10;
      editor.config.showFullScreen = false;
      editor.config.menus = [
        "bold",
        "head",
        "link",
        "italic",
        "underline",
        "video",
        "image",
      ];
      editor.create();
    }
  },
  methods: {
    replyTo() {
      editor.config.onblur();
    },
    replySubmit() {
      this.replyModel.NewsId = this.articleDetail.newsId;
      this.replyModel.Content = editor.txt.html();
      if (!this.replyModel.Content) return this.$message.warning("内容必填..");
      this.replyLoading = true;
      this.$http
        .post("AppApi/NewsAppend/Add", { MainData: this.replyModel })
        .then((res) => {
          this.replyLoading = false;
          if (res.status) editor.txt.clear();
        })
        .catch((err) => {
          console.log(err);
          this.replyLoading = false;
        });
    },
    getFloors(index) {
      return ((this.$route.query.page || 1) - 1) * 6 + (index + 1);
    },
    DateDiff: DateDiff,
    Split: Split,
  },
};
</script>

<style>
.el-pager li {
  margin: 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 40px;
  border-radius: 2px;
}
.el-pager li:not(.disabled).active {
  background-color: #070707;
  color: #fff;
}
.el-pager li.active {
  color: #070707;
  cursor: not-allowed;
}
</style>
