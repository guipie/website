<template>
  <el-card shadow="hover" class="movie-card">
    <el-image placeholder="加载中..." :src="movie.imgUrl" fit="cover" lazy>
      <div slot="placeholder" id="placeholder">
        <span class="dot"><i class="el-icon-loading"></i>....</span>
      </div>
      <div slot="error">
        <i class="el-icon-picture-outline"></i>
        图片丢了，直接看吧.
      </div>
    </el-image>
    <div>
      {{ movie.name }}
      <span class="tag">({{ movie.newestSet }})</span>
    </div>
  </el-card>
</template>
<script>
export default {
  props: {
    movie: Object
  },
  mounted() {
  }
}
</script> 
<style>
.movie-card {
  background-color: #000;
  color: #fff;
}
.movie-card .el-image {
  width: 100%;
}
.movie-card img {
  width: 100%;
  height: 200px;
}
.movie-card span {
  /* 这个单词的意思是如果文字显示不开自动换行 */
  /* white-space: normal; */
  /* 1.这个单词的意思是如果文字显示不开也必须强制一行内显示 */
  white-space: nowrap;
  /* 2.溢出的部分隐藏起来 */
  overflow: hidden;
  /* 3. 文字溢出的时候用省略号来显示 */
  text-overflow: ellipsis;
}
#placeholder {
  min-width: 160px;
  min-height: 200px;
}
.tag {
  font-size: small;
  color: red;
}
</style>