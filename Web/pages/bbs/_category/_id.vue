<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/bbs' }">论坛</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/bbs/${ $parent.bbsDetail.name}` }">
        {{ $parent.bbsDetail.name}}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{this.articleDetail.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row v-for="i in 10" :key="i" class="bbs-detail">
      <el-col :span="6" class="bbs-detail-left">
        <div>
          <el-avatar :size="60" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png">
          </el-avatar>
          <div>
            我真的好想你啊
          </div>
        </div>
      </el-col>
      <el-col :span="18" class="bbs-detail-right">
        ddd
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async asyncData ({ route, redirect, $http }) {
    let [articleDetail] = await Promise.all([$http.post("AppApi/News/" + route.params.id)]);
    if (articleDetail.newsId > 0)
      return { articleDetail };
    else
      redirect("/404?p=" + route.path);
  },
  mounted () {
    console.log(this.articleDetail)
  },
}
</script>

<style>
</style>