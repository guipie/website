<template>
  <div class="jinsom-bbs-box" style="min-height: 300px;">
    <div class="jinsom-bbs-box-header clear">
      <div class="left">
        <li onclick="jinsom_ajax_bbs_menu(&quot;comment&quot;,this)" class="on" topic="">回复</li>
        <li onclick="jinsom_ajax_bbs_menu(&quot;new&quot;,this)" topic="">最新</li>
        <li onclick="jinsom_ajax_bbs_menu(&quot;nice&quot;,this)" topic="">精华</li>
        <li onclick="jinsom_ajax_bbs_menu(&quot;vote&quot;,this)" topic="">投票</li>
      </div>
      <div class="right">
        <el-input type="text" id="jinsom-bbs-search" placeholder="搜索内容"></el-input>
      </div>
    </div>
    <div class="jinsom-bbs-list-box">
      <div class="jinsom-bbs-list-1" v-for="i in 10" :key="i">
        <div class="left clear">
          <a href="https://jjhuashui.com/archives/author/2098" target="_blank">
            <img loading="lazy"
              src="https://jjcdn2.yangpinwang.com/wp-content/uploads/2020/07/u19906250983468619056fm11gp0-1.jpg"
              class="avatar opacity" width="50" height="50" alt="蓝风"></a>
        </div>
        <div class="right">
          <h2>
            <a href="https://jjhuashui.com/archives/80680" target="_blank">
              发帖
              <span class="cat-item-19">搞笑、动图、段子</span>
            </a>
          </h2>
          <span class="mark">
            <span class="jinsom-bbs-post-type-img">
              <i class="jinsom-icon jinsom-tupian2"></i>
            </span>
          </span>
          <div class="num"><i class="el-icon-s-comment"></i>12</div>
          <div class="jinsom-bbs-list-1-info clear">
            <div class="jinsom-bbs-list-1-info-left">
              <span>
                <a href="https://jjhuashui.com/archives/author/2098" target="_blank">
                  <i class="el-icon-user"></i>蓝风</a>
              </span>
              <span>1月前</span>
              <span><i class="el-icon-view"></i> 1.3k</span>
            </div>
            <div class="jinsom-bbs-list-1-info-right">
            </div>
          </div>
        </div>
      </div>
      <div class="el-pagination is-background" style="padding-bottom:50px;">
        <ul class="el-pager">
          <nuxt-link v-for="page in 15" :to="`?page=${page}`" :key="page">
            <li class="number" :class="page===1?'active':''">{{page}}</li>
          </nuxt-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>