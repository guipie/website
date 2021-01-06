<template>
  <div>
    <section class="page-component content">
      <h2 id="icon-tu-biao">官方论坛</h2>
      <el-row>
        <el-col :span="8" v-for="o in 5" :key="o">
          <el-card :body-style="{ padding: '0px' }">
            <img src="/zanwei.gif" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">基本描述信息哈哈哈</time>
                <el-button type="text" class="button">详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <h3 id="tu-biao-ji-he">热门论坛</h3>
      <ul class="icon-list">
        <li v-for="i in 20" :key="i">
          <span>
            <i class="el-icon-platform-eleme"></i><span class="icon-name">el-icon-platform-eleme{{i}}</span>
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  layout: "empty"
}
</script>
<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.page-component .content {
  padding-top: 50px;
}
.page-component .content > ul.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border: 1px solid #eaeefb;
  border-radius: 4px;
}
</style>