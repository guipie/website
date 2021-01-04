<template>
  <div class="container">
    <div style="width: 100%; height: 100%">
      <el-backtop :bottom="60"></el-backtop>
    </div>
    <el-carousel class="carousel" type="card" height="200px">
      <el-carousel-item v-for="item in bannerMovies" :key="item.mappingId">
        <nuxt-link :to="'/movie/' + item.mappingId">
          <h3 class="carousel-h3">{{ item.description || item.title }}</h3>
          <el-image :src="getBannerImg(item.bannerImg)"></el-image>
        </nuxt-link>
      </el-carousel-item>
    </el-carousel>
    <div class="search" @keypress="loginPress">
      <!-- <el-cascader
        v-model="searchType"
        :show-all-levels="false"
        :options="types"
        :props="{ checkStrictly: true }"
        style="width: 100%"
        placeholder="影视类别"
        clearable
      ></el-cascader> -->
      <el-input v-model="searchKey" clearable placeholder="100万影视尽情搜索..">
        <el-button slot="append" @click="pageChange(1)" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-row :gutter="20">
      <el-col :span="12" v-for="x in movies" :key="x.id">
        <nuxt-link target="_blank" :to="{ name: 'movie-id', params: { id: x.id } }">
          <GpMovie :movie="x"></GpMovie>
        </nuxt-link>
      </el-col>
    </el-row>
    <div v-if="movieLoading" style="text-align: center; font-size: xx-large">
      <i class="el-icon-loading"></i>........
    </div>
    <el-pagination :hide-on-single-page="total==0" @current-change="pageChange" v-if="total>0"
      :current-page.sync="currentPage" background layout="prev, pager, next" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { GetFileUrl } from "@/environment";
import GpMovie from "~/components/moviePlayer/movie_item.vue";
export default {
  layout: function (context) {
    return 'default-movie'
  },
  fetch ({ store }) {
    return Promise.all([
      // store.dispatch('movie/fetchTypeList'),
      store.dispatch("movie/fetchBannerMovies"),
    ]);
  },
  computed: {
    types () {
      return this.$store.state.movie.types.data;
    },
    movies () {
      let list = this.$store.state.movie.movies.data;
      return list;
    },
    total () {
      return this.$store.state.movie.movies.total;
    },
    bannerMovies () {
      return this.$store.state.movie.bannerMovies.data;
    },
  },
  components: { GpMovie },
  data () {
    return {
      movieLoading: false,
      movieUrl: "/movie?t=" + new Date().getTime(),
      searchType: "",
      searchKey: "",
      currentPage: 1
    };
  },
  mounted () {
    this.query();
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 2000);
    });
    this.searchKey = this.$route.query.s;
    this.searchType = this.$route.query.type;
  },
  methods: {
    query () {
      this.movieLoading = true;
      let wheres = [];
      let { type, s, page } = this.$route.query;
      this.currentPage = parseInt(page || 1);
      if (type) wheres.push({ name: "TypeId", value: type, displayType: "selectlist" });
      if (s) wheres.push({ name: "Name", value: s, displayType: "like" });
      this.$store.dispatch("movie/fetchMovieList", {
        ...{
          order: "desc",
          page: this.currentPage,
          rows: 10,
          sort: "IsRecommend,ModifyDate"
        }, ...{ wheres: JSON.stringify(wheres) }
      }).then(res => {
        this.movieLoading = false;
      }).catch(err => {
        this.movieLoading = false;
      })
    },
    loginPress (e) {
      if (e.keyCode == 13 && this.searchKey)
        this.pageChange(1);
    },
    pageChange (current) {
      let url = this.movieUrl + '&page=' + current;
      if (this.searchKey)
        url += "&s=" + this.searchKey;
      if (this.searchType)
        url += "&type=" + this.searchType;
      window.location = url;
    },
    getBannerImg (url) {
      return GetFileUrl(url);
    },
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: "诡瞥影视,恐怖灵异电影,最新更新,在线观看,迅雷下载",
        },
        {
          hid: "description",
          name: "description",
          content: "全网最全最新的影视,高清在线观看,迅雷下载,种子播放",
        },
      ],
    };
  },
};
</script>
<style>
.search {
  padding: 0%;
  margin: 0%;
}
.search input {
  background-color: #000;
}
</style>
