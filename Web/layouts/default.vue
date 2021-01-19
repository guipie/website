<template>
  <el-container class="gp-container">
    <el-header>
      <gpHeader />
    </el-header>
    <el-row>
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
      <el-col :span="6" v-if="!isMobile">
        <div class="col3">
          <GpRight></GpRight>
        </div>
      </el-col>
    </el-row>
    <Bottom></Bottom>
  </el-container>
</template>

<script>
import GpHeader from "@/layouts/header.vue";
import GpLeft from "@/layouts/default-left.vue";
import GpRight from "@/layouts/default-right.vue";
import Bottom from "@/layouts/bottom.vue";
export default {
  components: {
    GpHeader,
    GpLeft, GpRight, Bottom
  },
  computed: {
    isMobile () {
      return this.$store.state.global.isMobile;
    },
  },
  methods: {
  },
};
</script>

<style>
.gp-container {
  height: 100%;
  
}
</style>
