<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    hhhhhhhhhhhhhhhhhhhhh
  </div>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style></style>
