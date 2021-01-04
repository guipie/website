<template>
  <el-container class="gp-container">
    <el-header>
      <gpHeader />
    </el-header>
    <el-row>
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
  </el-container>
</template>

<script>
import GpHeader from "@/layouts/header.vue";
export default {
  components: {
    GpHeader
  },
  computed: {
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
