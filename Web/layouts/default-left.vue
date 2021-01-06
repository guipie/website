<template>
  <div>
    <!-- <i class="el-icon-s-unfold" v-show="isMobile"></i> -->
    <el-menu router :default-active="activeMenu" @open="handleOpen" @close="handleClose" :collapse="isMobile">
      <el-menu-item v-show="isMobile">
        <i class="el-icon-s-unfold" style="color: red"></i>
        <span></span>
      </el-menu-item>
      <el-menu-item index="follow">
        <span>关注</span>
      </el-menu-item>
      <el-menu-item index="/">
        <span>推荐</span>
      </el-menu-item>
      <el-menu-item index="all">
        <span>全部</span>
      </el-menu-item>
      <el-menu-item index="gp">
        <span>诡闻</span>
      </el-menu-item>
      <el-menu-item index="articles">
        <span>文章</span>
      </el-menu-item>
      <el-menu-item index="voice">
        <span>音频</span>
      </el-menu-item>
      <el-menu-item index="video">
        <span>视频</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style></style>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      activeMenu: "/"
    };
  },
  mounted () {
  },
  computed: {
    isMobile () {
      return this.$store.state.global.isMobile;
    },
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu {
  padding-top: 30%;
  border-right: none;
  background: rgba(66, 66, 66, 0);
}
.el-menu-item.is-active {
  color: #182026;
  /* background: #000000; */
  font-size: large;
  font-weight: 700;
}
.el-menu-item:focus,
.el-menu-item:hover {
  color: #000000;
  font-weight: 700;
  background: #ffffff;
}
</style>
