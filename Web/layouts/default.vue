<template>
  <el-container class="gp-container">
    <el-header>
      <gpHeader />
    </el-header>
    <el-row :gutter="20">
      <el-col :span="6" v-if="!isMobile">
        <div class="col1">
          <GpLeft></GpLeft>
        </div>
      </el-col>
      <el-col :span="isMobile ? 24 : 12">
        <div class="col2">
          <nuxt />
        </div>
      </el-col>
      <el-col :span="7" v-if="!isMobile">
        <div class="col3"></div>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import GpHeader from "@/layouts/header.vue";
import GpLeft from "@/layouts/left.vue";
import GpRight from "@/layouts/right.vue";
export default {
  components: {
    GpHeader,
    GpLeft, GpRight
  },
  computed: {
    isMobile () {
      return this.$store.state.global.isMobile;
    },
  },
};
</script>

<style>
.gp-container {
  height: 100%;
}
.el-header {
  padding: 0%;
  background-color: #000000;
}
.col1 {
  float: right;
  color: #ffffff;
}
</style>
