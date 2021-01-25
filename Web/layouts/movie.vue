<template>
  <el-container class="gp-container">
    <el-header>
      <gpHeader />
    </el-header>
    <el-row class="container">
      <el-col :span="6">
        .
      </el-col>
      <el-col :span="12">
        <nuxt />
      </el-col>
      <el-col :span="6">
        .
      </el-col>
    </el-row>
    <Bottom></Bottom>
  </el-container>
</template>

<script>
import GpHeader from "@/layouts/header.vue";
import Bottom from "@/layouts/bottom.vue";
export default {
  components: {
    GpHeader, Bottom
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style>
</style>
