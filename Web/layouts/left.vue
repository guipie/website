<template>
  <div>
    <!-- <i class="el-icon-s-unfold" v-show="isMobile"></i> -->
    <el-menu router @open="handleOpen" @close="handleClose" :collapse="isMobile">
      <el-menu-item v-show="isMobile">
        <i class="el-icon-s-unfold" style="color: red"></i>
        <span></span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span>社区</span>
      </el-menu-item>
      <el-menu-item :index="'/video'">
        <i class="el-icon-video-camera-solid"></i>
        <span>视频</span>
      </el-menu-item>
      <el-menu-item :index="'/movie'">
        <i class="el-icon-film"></i>
        <span>放映厅</span>
      </el-menu-item>
      <el-menu-item :index="'/messageboard'">
        <i class="el-icon-s-comment"></i>
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
