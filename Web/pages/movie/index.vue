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
        <el-button slot="append" @click="pageChange(true)" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-row :gutter="20">
      <el-col :span="12" v-for="x in currentList" :key="x.id">
        <nuxt-link target="_blank" :to="{ name: 'movie-id', params: { id: x.id } }">
          <GpMovie :movie="x"></GpMovie>
        </nuxt-link>
      </el-col>
    </el-row>
    <div style="text-align: center; font-size: xx-large">
      <i v-if="movieLoading" class="el-icon-loading"></i>
      ....<el-button type="text" @click="pageChange(false)">more</el-button>....
    </div>
  </div>
</template>

<script>
import { GetFileUrl } from "@/environment";
import GpMovie from "~/components/content-movie.vue";
export default {
  fetch({ store }) {
    return Promise.all([
      store.dispatch("movie/fetchMovieList"),
      // store.dispatch('movie/fetchTypeList'),
      store.dispatch("movie/fetchBannerMovies"),
    ]);
  },
  computed: {
    types() {
      return this.$store.state.movie.types.data;
    },
    movies() {
      let list = this.$store.state.movie.movies.data;
      return list;
    },
    nextPage() {
      return this.$store.state.movie.movies.nextPage;
    },
    bannerMovies() {
      return this.$store.state.movie.bannerMovies.data;
    },
  },
  components: { GpMovie },
  data() {
    return {
      movieLoading: false,
      searchType: "",
      searchKey: "",
      currentList: [],
      total: -1,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 2000);
    });
    this.currentList.push.apply(this.currentList, this.movies);
  },
  methods: {
    loginPress(e) {
      if (e.keyCode == 13) {
        this.$store.commit("movie/resetPage");
        this.currentList = [];
        this.pageChange(true);
      }
    },
    pageChange(isFirst) {
      if (this.nextPage == -1) return;
      let wheres = [];
      if (this.searchType) wheres.push({ name: "TypeId", value: this.searchType.toString(), displayType: "selectlist" });
      if (this.searchKey) wheres.push({ name: "Name", value: this.searchKey, displayType: "like" });
      this.movieLoading = true;
      this.$store.dispatch("movie/fetchMovieList", { page: isFirst ? 1 : this.nextPage, wheres: JSON.stringify(wheres) }).then((res) => {
        this.movieLoading = false;
        this.total = res.total;
        this.currentList.push.apply(this.currentList, res.data);
      });
    },
    getBannerImg(url) {
      return GetFileUrl(url);
    },
  },
  head() {
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
