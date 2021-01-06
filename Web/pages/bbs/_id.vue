<template>
  <div>
    <div class="jinsom-bbs-header-info" style="padding-top: 100px;background-image: url(/zanwei.gif)">
      <div class="jinsom-bbs-header-info-avatar">
        <a
          href="https://jjhuashui.com/archives/category/%e6%90%9e%e7%ac%91%e3%80%81%e5%8a%a8%e5%9b%be%e3%80%81%e6%ae%b5%e5%ad%90">
          <img loading="lazy" src="/zanwei.gif" class="avatar opacity" alt="搞笑、动图、段子" />
        </a>
      </div>
      <div class="jinsom-bbs-header-info-btn clear">
        <a href="https://jjhuashui.com/archives/category/%e6%90%9e%e7%ac%91%e3%80%81%e5%8a%a8%e5%9b%be%e3%80%81%e6%ae%b5%e5%ad%90"
          class="name">搞笑、动图、段子</a>
        <span class="opacity follow">
          <i class="jinsom-icon jinsom-guanzhu"></i>关注
        </span>
        <!-- <i class="jinsom-icon jinsom-liaotian"></i> 群聊 -->
        <span class="jinsom-bbs-follow-info">
          <span>关注：<b class="num">22</b></span>
          <span>内容：<b>10</b></span>
        </span>
        <el-button type="primary" style="float: right;">发表</el-button>
      </div>
      <div class="jinsom-bbs-header-info-desc clear">
        大家可以发有意思的搞笑的东西哦
      </div>
    </div>
    <div class="jinsom-bbs-box" style="min-height: 300px;">
      <div class="jinsom-bbs-box-header clear">
        <div class="left"> 
          <li onclick="jinsom_ajax_bbs_menu(&quot;comment&quot;,this)" class="on" topic="">回复</li>
          <li onclick="jinsom_ajax_bbs_menu(&quot;new&quot;,this)" topic="">最新</li>
          <li onclick="jinsom_ajax_bbs_menu(&quot;nice&quot;,this)" topic="">精华</li>
          <li onclick="jinsom_ajax_bbs_menu(&quot;vote&quot;,this)" topic="">投票</li>
        </div>
        <div class="right">
          <input type="text" id="jinsom-bbs-search" placeholder="搜索内容">
          <i onclick="jinsom_ajax_bbs_search()" class="jinsom-icon jinsom-sousuo1"></i>
        </div>
      </div>
      <div class="jinsom-bbs-list-box" data-no-instant="">
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
                <span class="cat-item-19">搞笑、动图、段子<i></i></span>发帖</a>
            </h2>
            <span class="mark">
              <span class="jinsom-bbs-post-type-img"><i class="jinsom-icon jinsom-tupian2"></i></span></span>

            <div class="num"><i class="jinsom-icon jinsom-pinglun2"></i> 0</div>
            <div class="jinsom-bbs-list-1-info clear">
              <div class="jinsom-bbs-list-1-info-left">
                <span>
                  <i class="jinsom-icon jinsom-my_light"></i> <a href="https://jjhuashui.com/archives/author/2098"
                    target="_blank">蓝风</a></span>
                <span>1月前</span>
                <span><i class="jinsom-icon jinsom-liulan1"></i> 1.3k</span>
                <span>来自 电脑端</span>
              </div>
              <div class="jinsom-bbs-list-1-info-right">
              </div>
            </div><!-- jinsom-bbs-list-1-info -->
          </div>
        </div>
        <div class="jinsom-more-posts default" data="2" onclick="jinsom_ajax_bbs(this,&quot;comment&quot;)">加载更多</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",
  head: {
    link: [
      { rel: 'stylesheet', href: require('@/assets/styles/bbs.css') }
    ],
  },
  methods: {
    goBack () {
      console.log('go back');
    }
  }
}
</script>

<style>
</style>