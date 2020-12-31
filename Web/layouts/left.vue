<template>
  <div>
    <!-- <i class="el-icon-s-unfold" v-show="isMobile"></i> -->
    <el-menu :default-active="activeMenu" router @open="handleOpen" @close="handleClose" :collapse="isMobile">
      <el-menu-item v-show="isMobile">
        <i class="el-icon-s-unfold" style="color: red"></i>
        <span></span>
      </el-menu-item>
      <el-menu-item index="/follow">
        <span>关注</span>
      </el-menu-item>
      <el-menu-item index="/">
        <span>推荐</span>
      </el-menu-item>
      <el-menu-item index="/all">
        <span>全部</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <span>文章</span>
      </el-menu-item>
      <el-menu-item :index="'/voice'">
        <span>音频</span>
      </el-menu-item>
      <el-menu-item :index="'/video'">
        <span>视频</span>
      </el-menu-item>
      <el-menu-item :index="'/movie'">
        <span>放映厅</span>
      </el-menu-item>
      <el-menu-item :index="'/messageboard'">
        <span>诡迹</span>
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
  color: #ffffff;
  background: #000000;
}
.el-menu-item:focus,
.el-menu-item:hover {
  color: #ffffff;
  background: #000000;
}
</style>
