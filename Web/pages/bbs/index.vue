<template>
  <div>
    <section class="page-component content">
      <h2 id="icon-tu-biao">推荐论坛</h2>
      <el-row>
        <el-col :span="6" v-for="o in 5" :key="o">
          <el-card :body-style="{ padding: '0px' }">
            <img src="/zanwei.gif" class="image">
            <div style="padding: 14px;">
              <nuxt-link to="/bbs/2">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">基本描述信息哈哈哈</time>
                  <el-button type="text" class="button">详情</el-button>
                </div>
              </nuxt-link>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <h3 id="tu-biao-ji-he">最新论坛</h3>
      <div class="jinsom-show-bbs-box-content clear">
        <li>

          <a href="https://jjhuashui.com/archives/category/%e6%b0%b4%e5%8f%8b%e8%af%b4" target="_blank">
            <div class="top clear">
              <div class="left">
                <img loading="lazy" src="http://www.jijihuashui.com/wp-content/uploads/2020/07/论坛.png"
                  class="avatar opacity" alt="水友说">
              </div>
              <div class="right">
                <div class="title">
                  水友说</div>
                <div class="desc" title=""></div>
              </div>
            </div>
          </a>
          <div class="bottom">
            <span>内容：<i>0</i></span>
            <span>关注：<i>2</i></span>
            <a href="https://jjhuashui.com/archives/category/%e6%b0%b4%e5%8f%8b%e8%af%b4" target="_blank">点击进入</a>
          </div>
        </li>

        <li>

          <a href="https://jjhuashui.com/archives/category/damon" target="_blank">
            <div class="top clear">
              <div class="left">
                <img loading="lazy" src="http://www.jijihuashui.com/wp-content/uploads/2020/07/论坛.png"
                  class="avatar opacity" alt="Damon">
              </div>
              <div class="right">
                <div class="title">
                  Damon</div>
                <div class="desc" title=""></div>
              </div>
            </div>
          </a>
          <div class="bottom">
            <span>内容：<i>0</i></span>
            <span>关注：<i>0</i></span>
            <a href="https://jjhuashui.com/archives/category/damon" target="_blank">点击进入</a>
          </div>
        </li>

        <li>

          <a href="https://jjhuashui.com/archives/category/%e6%90%9e%e7%ac%91%e3%80%81%e5%8a%a8%e5%9b%be%e3%80%81%e6%ae%b5%e5%ad%90"
            target="_blank">
            <div class="top clear">
              <div class="left">
                <img loading="lazy"
                  src="https://jjcdn2.yangpinwang.com/wp-content/uploads/user_files/262/setting/76423931_1598235356.jpg"
                  class="avatar opacity" alt="搞笑、动图、段子">
              </div>
              <div class="right">
                <div class="title">
                  搞笑、动图、段子</div>
                <div class="desc" title="大家可以发有意思的搞笑的东西哦">大家可以发有意思的搞笑的东西哦</div>
              </div>
            </div>
          </a>
          <div class="bottom">
            <span>内容：<i>10</i></span>
            <span>关注：<i>22</i></span>
            <a href="https://jjhuashui.com/archives/category/%e6%90%9e%e7%ac%91%e3%80%81%e5%8a%a8%e5%9b%be%e3%80%81%e6%ae%b5%e5%ad%90"
              target="_blank">点击进入</a>
          </div>
        </li>

        <li>

          <a href="https://jjhuashui.com/archives/category/%e5%81%9c%e8%bd%a6%e5%9c%ba" target="_blank">
            <div class="top clear">
              <div class="left">
                <img loading="lazy" src="http://www.jijihuashui.com/wp-content/uploads/2020/07/论坛.png"
                  class="avatar opacity" alt="停车场">
              </div>
              <div class="right">
                <div class="title">
                  停车场</div>
                <div class="desc" title=""></div>
              </div>
            </div>
          </a>
          <div class="bottom">
            <span>内容：<i>0</i></span>
            <span>关注：<i>1</i></span>
            <a href="https://jjhuashui.com/archives/category/%e5%81%9c%e8%bd%a6%e5%9c%ba" target="_blank">点击进入</a>
          </div>
        </li>

        <li>

          <a href="https://jjhuashui.com/archives/category/%e7%88%b1%e5%90%83%e8%8f%9c%e9%a5%ad" target="_blank">
            <div class="top clear">
              <div class="left">
                <img loading="lazy" src="http://www.jijihuashui.com/wp-content/uploads/2020/07/论坛.png"
                  class="avatar opacity" alt="爱吃菜饭">
              </div>
              <div class="right">
                <div class="title">
                  爱吃菜饭</div>
                <div class="desc" title=""></div>
              </div>
            </div>
          </a>
          <div class="bottom">
            <span>内容：<i>0</i></span>
            <span>关注：<i>1</i></span>
            <a href="https://jjhuashui.com/archives/category/%e7%88%b1%e5%90%83%e8%8f%9c%e9%a5%ad"
              target="_blank">点击进入</a>
          </div>
        </li>

        <li>

          <a href="https://jjhuashui.com/archives/category/%e9%81%a8%e6%b8%b8%e5%93%88%e5%93%88%e7%ad%be%e5%88%b0%e5%a4%84"
            target="_blank">
            <div class="top clear">
              <div class="left">
                <img loading="lazy" src="http://www.jijihuashui.com/wp-content/uploads/2020/07/论坛.png"
                  class="avatar opacity" alt="遨游哈哈签到处">
              </div>
              <div class="right">
                <div class="title">
                  遨游哈哈签到处</div>
                <div class="desc" title=""></div>
              </div>
            </div>
          </a>
          <div class="bottom">
            <span>内容：<i>0</i></span>
            <span>关注：<i>5</i></span>
            <a href="https://jjhuashui.com/archives/category/%e9%81%a8%e6%b8%b8%e5%93%88%e5%93%88%e7%ad%be%e5%88%b0%e5%a4%84"
              target="_blank">点击进入</a>
          </div>
        </li>

        <li>

          <a href="https://jjhuashui.com/archives/category/%e5%8d%97%e8%a1%ab" target="_blank">
            <div class="top clear">
              <div class="left">
                <img loading="lazy" src="http://www.jijihuashui.com/wp-content/uploads/2020/07/论坛.png"
                  class="avatar opacity" alt="南衫">
              </div>
              <div class="right">
                <div class="title">
                  南衫</div>
                <div class="desc" title=""></div>
              </div>
            </div>
          </a>
          <div class="bottom">
            <span>内容：<i>0</i></span>
            <span>关注：<i>1</i></span>
            <a href="https://jjhuashui.com/archives/category/%e5%8d%97%e8%a1%ab" target="_blank">点击进入</a>
          </div>
        </li>

        <li>

          <a href="https://jjhuashui.com/archives/category/bearhead001" target="_blank">
            <div class="top clear">
              <div class="left">
                <img loading="lazy" src="http://www.jijihuashui.com/wp-content/uploads/2020/07/论坛.png"
                  class="avatar opacity" alt="bearhead001">
              </div>
              <div class="right">
                <div class="title">
                  bearhead001</div>
                <div class="desc" title=""></div>
              </div>
            </div>
          </a>
          <div class="bottom">
            <span>内容：<i>0</i></span>
            <span>关注：<i>1</i></span>
            <a href="https://jjhuashui.com/archives/category/bearhead001" target="_blank">点击进入</a>
          </div>
        </li>

        <li>
          <a href="https://jjhuashui.com/archives/category/%e6%b8%b8%e6%88%8f%e5%a4%a7%e6%9d%82%e7%83%a9"
            target="_blank">
            <div class="top clear">
              <div class="left">
                <img loading="lazy"
                  src="https://jjcdn2.yangpinwang.com/wp-content/uploads/user_files/113/setting/94794423_1598095154.jpg"
                  class="avatar opacity" alt="游戏大杂烩">
              </div>
              <div class="right">
                <div class="title">
                  游戏大杂烩</div>
                <div class="desc" title="由广大论坛玩家第一时间对最新PC游戏的作品进行发布、介绍及提供原创资源。">由广大论坛玩家第一时间对最新PC游戏的作品进行发布、介绍及提供原创资源。
                </div>
              </div>
            </div>
          </a>
          <div class="bottom">
            <span>内容：<i>8</i></span>
            <span>关注：<i>34</i></span>
            <a href="https://jjhuashui.com/archives/category/%e6%b8%b8%e6%88%8f%e5%a4%a7%e6%9d%82%e7%83%a9"
              target="_blank">点击进入</a>
          </div>
        </li>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  layout: "empty",
  head: {
    link: [
      { rel: 'stylesheet', href: require('@/assets/styles/bbs.css') }
    ]
  }

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