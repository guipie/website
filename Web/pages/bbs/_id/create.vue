<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/bbs' }">论坛</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/bbs/${$parent.bbsId}` }">
        jskldj
      </el-breadcrumb-item>
      <el-breadcrumb-item>发帖</el-breadcrumb-item>
    </el-breadcrumb>
    <NewsCreate :bbsId="new Number($parent.bbsId)"></NewsCreate>
  </div>
</template>

<script>
import NewsCreate from "@/components/content/create";
export default {
  layout: function (context) {
    return "empty";
  },
  components: { NewsCreate },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: "创建论坛贴子-诡瞥社区",
        },
        {
          hid: "description",
          name: "description",
          content: "优质恐怖灵异论坛,尽在诡瞥社区.",
        },
      ],
    };
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style></style>
