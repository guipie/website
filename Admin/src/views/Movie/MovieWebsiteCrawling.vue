<template>
  <div>
    <el-divider>
      <el-button size="mini" :loading="isCrawling" round>采集最新</el-button>
      <el-button size="mini" :loading="isCrawling" round>采集一周</el-button>
      <el-button
        size="mini"
        :loading="isCrawling"
        @click="CrawlingAll('all')"
        round
      >
        采集全部
      </el-button>
    </el-divider>
    <div v-if="crawlingData.pageData.currentPage > 0">
      <el-divider content-position="center">
        <span> </span>
      </el-divider>
      <el-alert
        style="text-align='center';"
        type="warning"
        :title="
          '正在爬取' +
          crawlingData.pageData.websiteName +
          '第[' +
          crawlingData.pageData.currentPage +
          ']页，一共[' +
          crawlingData.pageData.pageCount +
          ']页'
        "
        :description="
          '成功【' +
          crawlingData.successCount +
          '】，警告【' +
          crawlingData.warningCount +
          '】，失败【' +
          crawlingData.errorCount +
          '】'
        "
        :closable="false"
      >
      </el-alert>

      <div v-for="(item, index) in logs" :key="index">
        <el-alert
          :title="item.crawlingMessage"
          :type="item.result"
          show-icon
        ></el-alert>
      </div>
    </div>
  </div>
</template>
<script>
import * as signalR from "@microsoft/signalr";
export default {
  data() {
    return {
      isCrawling: false,
      crawlingData: { pageData: {} },
      logs: []
    }
  },
  created() {
    let vueT = this;
    window.onbeforeunload = function (e) {
      if (vueT.$route.fullPath.includes("/MovieWebsiteCrawling")) {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = '关闭提示';
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return '关闭提示';
      } else {
        window.onbeforeunload = null
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm('您确定要离开？')
    if (answer) {
      next()
    } else {
      next(false)
    }
  },
  destroyed() {
    window.onbeforeunload = null;
  },
  mounted() {
    let _this = this;
    _this.http.get("/api/MovieWebsite/Crawling/Query").then(res => {
      _this.connection = new signalR.HubConnectionBuilder()
        //日志信息
        .configureLogging(signalR.LogLevel.Information)
        //配置通道路由
        .withUrl(_this.http.ipAddress + "api/SignalR/CrawlingHub")
        .withAutomaticReconnect([0, 3000, 5000, 10000, 15000, 30000])
        //创建
        .build();
      // 重连的时候触发
      _this.connection.onreconnecting(function (info) {
        console.info('------ onreconnecting', info);
      });

      //连接关闭的回调
      _this.connection.onclose((err) => {
        _this.isCrawling = false;
        console.info('--------onclose', err);
      });
      if (res.currentPage > 0 && res.crawlingType) {
        _this.$confirm('您有抓取任务, 是否继续?', '抓取提示', {
          confirmButtonText: '继续抓取',
          cancelButtonText: '终止任务',
          type: 'warning'
        }).then(() => {
          try {
            _this.CrawlingAll(res.crawlingType, res.website);
          } catch (error) {
            _this.isCrawling = false;
            console.log(error);
            _this.CrawlingStop();
          }
        }).catch(() => {
          _this.isCrawling = false;
          _this.http.get("/api/MovieWebsite/Crawling/Reset");
          _this.CrawlingStop();
        });
      }
    });
  },
  methods: {
    CrawlingAll(type, siteId) {
      let _this = this;
      let con = _this.connection;
      siteId = parseInt(siteId || this.$route.query.websiteId);
      // 开始通讯，并成功呼叫服务器 
      con.on('ReceiveMovieInfo', (res) => {
        if (_this.logs.length > 20) _this.logs = [];
        _this.logs.unshift(res.movieDetail);
        _this.crawlingData = res;
      });
      con.start().then(() => {
        console.log("begin monitor-");
        _this.isCrawling = true;
        con.invoke('CrawlingMonitor', siteId, type)
          .then(res => {
            alert(res);
            _this.isCrawling = false;
            _this.CrawlingStop();
          })
          .catch(function (err, y, z) {
            console.error("crawling error:" + err);
            alert("已断开连接，请刷新页面重试..");
            _this.CrawlingStop();
          });
      }).catch(function (err) {
        console.error("signalR connection error:" + err);
        _this.CrawlingStop();
      });
    },
    CrawlingStop() {
      let con = this.connection;
      if (con.state === "Connected")
        con.stop();
    }
  }
};
</script>