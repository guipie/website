<template>
  <el-container class="gp-container">
    <el-header>
      <GpHeader></GpHeader>
    </el-header>
    <el-row>
      <el-col :span="4">
        <div class="col1">
          .
        </div>
      </el-col>
      <el-col :span="16">
        <div class="col2">
          <nuxt />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="col3">
          .
        </div>
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
