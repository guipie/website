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
        <div class="bbs-detail-footer">
          <span v-if="articleDetail.modifyDate">
            <!-- {{ articleDetail.modifier }} -->
            {{ DateDiff(articleDetail.modifyDate) }}回复
          </span>
          <span v-else> {{ DateDiff(articleDetail.createDate) }}发帖 </span>
          <span v-for="t in Split(articleDetail.tags)" :key="t"> #{{ t }}# </span>
          <span class="replyComment" @click="alert(111)">
            <i class="el-icon-chat-square"></i>123
          </span>
          <span class="replyComment" @click="$api.news.PraiseNews(articleDetail.newsId)">
            顶
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
          <span class="replyComment" @click="comments(append, index)">
            <i class="el-icon-chat-square"></i>
          </span>
        </div>
      </el-col>
    </el-row>
    <div class="guajian">
      <el-button
        icon="el-icon-star-on"
        circle
        @click="$api.news.LikeNews(articleDetail.newsId)"
      ></el-button>
      <el-button icon="el-icon-chat-line-square" circle @click="replyTo()"> </el-button>
      <el-button icon="el-icon-share" circle></el-button>
      <nuxt-link
        :to="`/bbs/${$parent.bbsDetail.name}/${
          articleDetail.newsId
        }?refresh=${new Date().getTime()}`"
      >
        <el-button icon="el-icon-refresh-left" circle></el-button>
      </nuxt-link>
    </div>
    <ul class="el-pager">
      <nuxt-link
        v-for="page in Math.ceil(appendList.total / 6)"
        :to="`?page=${page}`"
        :key="page"
      >
        <li class="number" :class="page == currentPage ? 'active' : ''">
          {{ page }}
        </li>
      </nuxt-link>
    </ul>
    <div id="bbsReply" class="bbsReply"></div>
    <el-button
      type="primary"
      plain
      style="float: right"
      v-loading="replyLoading"
      @click="replySubmit()"
      >回复</el-button
    >

    <el-dialog :title="commentTitle" :visible.sync="commentsDialog" width="50%" center>
      <div>
        <NewsComment :type="'newsAppend'" :relationId="commentNewsId"></NewsComment>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { isBrowser } from "@/environment";
import { DateDiff, Split } from "@/assets/js/common";
import NewsComment from "@/components/content/comment";
let editor = null;
export default {
  components: { NewsComment },
  // scrollToTop: true,
  watch: {
    $route: {
      handler: function (val, oldVal) {
        scrollTo(0, 0);
      },
      // 深度观察监听
      deep: true,
    },
  },
  data() {
    return {
      replyLoading: false,
      replyModel: {},
      commentsDialog: false,
      commentNewsId: 0,
      commentTitle: "留下您的诡记.",
    };
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  watchQuery: true,
  watchQuery: ["page", "refresh"],
  async asyncData({ route, redirect, $http, store }) {
    let [articleDetail] = await Promise.all([
      $http.post("AppApi/News/" + route.params.id),
    ]);
    let currentPage = route.query.page || 1;
    if (articleDetail.newsId > 0) {
      await Promise.all([
        store.dispatch("bbs/fetchBBSNewsAppendList", {
          page: currentPage,
          sort: "CreateDate",
          rows: 6,
          wheres: JSON.stringify([{ name: "NewsId", value: articleDetail.newsId }]),
        }),
      ]);
      return { articleDetail, currentPage };
    } else redirect("/404?p=" + route.path);
  },
  computed: {
    appendList() {
      return this.$store.state.bbs.bbsNewsAppendList;
    },
  },
  mounted() {
    console.log(this.currentPage);
    if (isBrowser) {
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
      editor.config.uploadImgShowBase64 = true;
      editor.create();
    }
  },
  methods: {
    comments(append, index) {
      this.commentNewsId = append.id;
      this.commentsDialog = true;
      this.commentTitle = `在${this.getFloors(index)}楼留下您的诡记..`;
    },
    replyTo() {
      document.querySelector(".bbsReply").scrollIntoView();
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
      return (this.currentPage - 1) * 6 + index + 1;
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
