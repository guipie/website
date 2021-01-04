<template>
  <div class="container">
    <div class="publish">
      <el-input type="textarea" style="border:solid 1px #000" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容"
        v-model="model.Summary" maxlength="200" show-word-limit>
      </el-input>
      <el-row>
        <el-tag style="float:right;margin-left:5px;" v-for="(tag,index) in tags" :key="index" closable
          @close="tags.splice(index,1)" type="info">
          #{{tag}}
        </el-tag>
      </el-row>
      <el-row>
        <el-progress v-if="percentage!=0" :color="'#000'"
          :format="(p)=>{return p>= 100 ? '上传成功' : p.toString().substr(0,4)+'%'}" :percentage="percentage">
        </el-progress>
      </el-row>
      <div>
        <el-row v-if="contentType=='pic'">
          <el-upload ref="picRef" action="/" drag multiple list-type="picture-card" :limit="6" :http-request="picUpload"
            :on-preview="picPreview" :on-remove="picRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-row>
        <el-row v-else-if="contentType=='video'">
          <el-col :span="20">
            <el-input :value="videoUrl" placeholder="直接粘贴播放地址或者上传MP4,m3u8,flv,mov视频 (最大不能超过100M)">
              <template slot="append">
                <el-upload ref="videoRef" :show-file-list="false" :limit="1" action="/" :http-request="videoUpload">
                  <el-button icon="el-icon-upload" type="info">上传</el-button>
                </el-upload>
              </template>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-tooltip placement="right">
              <el-upload ref="videoCoverRef" :show-file-list="false" action="/" :http-request="videoCoverUpload">
                <el-button style="color:black;" icon="el-icon-plus">视频封面</el-button>
              </el-upload>
              <div slot="content">
                <el-image v-if="videoCoverUrl" style="width: 100px; height: 100px" @click="$openPreview(videoCoverUrl)"
                  :src="videoCoverUrl" fit="contain">
                </el-image>
                <span v-else>
                  上传视频封面，可选.
                </span>
              </div>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row v-else-if="contentType=='voice'">
          <el-input :value="voiceUrl" placeholder="直接粘贴播放地址或者上传MP3,MPEG,WMA,AAC格式 (最大不能超过50M)">
            <template slot="append">
              <el-upload action="/" ref="voiceRef" :show-file-list="false" :limit="1" :http-request="voiceUpload">
                <el-button icon="el-icon-upload" type="info">上传声音</el-button>
              </el-upload>
            </template>
          </el-input>
        </el-row>
      </div>
      <el-breadcrumb separator=" " class="item-append">
        <el-breadcrumb-item>
          <el-button icon="el-icon-s-promotion" @click="contentType='micro'" :class="contentType=='micro'?'active':''"
            type="text">
            诡闻
          </el-button>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-button icon="el-icon-picture" @click="contentType = 'pic'" type="text">图片</el-button>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-button icon="el-icon-video-camera" @click="contentType='video'" type="text">视频</el-button>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-button icon="el-icon-video-play" @click="contentType='voice'" type="text">音频</el-button>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-button type="text" @click="tagsVisible=true;" icon="el-icon-edit-outline">#话题</el-button>
        </el-breadcrumb-item>
        <el-breadcrumb-item style="float:right">
          <el-select style="width:100px;" v-model="model.Visible" class="visible">
            <el-option label="公开" value="1"></el-option>
            <el-option label="登录可见" value="2"></el-option>
            <el-option label="关注我可见" value="3"></el-option>
          </el-select>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div style="text-align:right;clear:both;">
        <el-button :disabled="model.Summary.length==0" style="margin-top:5px;color:#fff;background: #000"
          @click="publish">发布</el-button>
      </div>
    </div>
    <nuxt-child keep-alive></nuxt-child>
    <div v-for="item in news.data" :key="item.newsId" class="container-item">
      <articleCard v-if="item.type=='article'" :news="item"></articleCard>
      <microCard v-else :news="item"></microCard>
    </div>
    <el-dialog :visible.sync="tagsVisible">
      <Tags @getTag="getTag"></Tags>
    </el-dialog>
  </div>
</template>
<script>
import { GetFileUrl } from "@/environment";
import { qnUpload } from "@/assets/config/qiniu.js"
import Tags from "@/components/tags.vue";
import articleCard from "@/components/content/content.vue";
import microCard from "@/components/content/content-micro.vue";
export default {
  data () {
    return {
      percentage: 0,
      model: {
        Summary: "",
        Visible: "1"
      },
      contentType: "micro",
      tags: [],
      tagsVisible: false,
      videoUrl: "",
      videoCoverUrl: "",
      voiceUrl: ""
    }
  },
  computed: {
    stateNews () {
      return this.$store.state.news.news;
    }
  },
  watch: {
    stateNews: {
      handler (val) {
        this.news = val;
      },
      deep: true
    }
  },
  components: { Tags, microCard, articleCard },
  async asyncData ({ route, $http, error }) {
    console.log(route);
    let newsParams = {
      order: "desc",
      page: 1,
      rows: 8,
      sort: "IsRecommend,CreateDate"
    };
    let [data] = await Promise.all([$http.post("AppApi/News/Index", newsParams)]);
    return { news: data };
  },
  mounted () {
  },
  methods: {
    getTag (tag) { this.tags.push(tag); this.tagsVisible = false; },
    picPreview (file) {
      this.$openPreviews(file.url);
    },
    picRemove (file, fileList) {
      console.log(file, fileList);
    },
    picUpload: function (params) {
      let _this = this,
        file = params.file,
        fileType = file.type;
      if (!(fileType.indexOf('image') > -1))
        return _this.$message.warning('请选择正确的文件类型');
      if (file.size / 1024 / 1024 > 10)
        return _this.$message.warning('上传图片不能超过 10MB!');
      _this.percentage = 1;
      qnUpload(file,
        (watch) => {
          if (watch.total.percent > 0)
            _this.percentage = watch.total.percent;
        },
        (successUrl) => {
          _this.$refs.picRef.fileList.push({ name: file.name, url: successUrl });
        },
        (error) => {
          _this.percentage = 0;
          _this.$refs.picRef.clearFiles();
        })
    },
    videoUpload: function (params) {
      let _this = this,
        file = params.file,
        fileType = file.type;
      if (!(fileType.indexOf('video') > -1))
      { _this.$refs.videoRef.clearFiles(); return _this.$message.warning('请选择正确的文件类型'); }
      if (file.size / 1024 / 1024 > 100)
      { _this.$refs.videoRef.clearFiles(); return _this.$message.warning('上传视频不能超过 100MB!'); }
      _this.percentage = 1;
      qnUpload(file,
        (watch) => {
          if (watch.total.percent > 0)
            _this.percentage = watch.total.percent;
        },
        (successUrl) => {
          _this.$refs.videoRef.fileList.push({ name: file.name, url: successUrl });
          _this.videoUrl = successUrl;
        },
        (err) => {
          _this.percentage = 0;
          _this.$refs.videoRef.clearFiles();
        })
    },
    videoCoverUpload: function (params) {
      let _this = this,
        file = params.file,
        fileType = file.type;
      if (!(fileType.indexOf('image') > -1))
        return _this.$message.warning('请选择正确的文件类型');
      if (file.size / 1024 / 1024 > 10)
        return _this.$message.warning('上传图片不能超过 10MB!');
      _this.percentage = 1;
      qnUpload(file,
        function watch (params) {
          if (params.total.percent > 0)
            _this.percentage = params.total.percent;
        },
        function success (url) {
          _this.videoCoverUrl = url;
        },
        (err) => {
          _this.percentage = 0;
          _this.$refs.videoCoverRef.clearFiles();
        })
    },
    voiceUpload: function (params) {
      let _this = this,
        file = params.file,
        fileType = file.type;
      if (!(fileType.indexOf('audio') > -1))
      { _this.$refs.voiceRef.clearFiles(); return _this.$message.warning('请选择正确的文件类型'); }
      if (file.size / 1024 / 1024 > 50)
      { _this.$refs.voiceRef.clearFiles(); return _this.$message.warning('上传音频文件不能超过 50MB!'); }
      _this.percentage = 1;
      qnUpload(file,
        function watch (params) {
          if (params.total.percent > 0)
            _this.percentage = params.total.percent;
        },
        function success (url) {
          _this.$refs.voiceRef.fileList.push({ name: file.name, url: url });
          _this.voiceUrl = url;
        },
        (err) => {
          _this.percentage = 0;
          _this.$refs.voiceRef.clearFiles();
        })
    },
    publish () {
      let _this = this;
      this.model.Title = this.model.Summary.substr(0, 20);
      this.model.Type = this.contentType;
      this.model.Tags = this.tags.toString();
      if (this.percentage > 0 && this.percentage < 100)
        return _this.$message.warning('未上传完成，请稍后...');
      if (this.contentType == "pic")
      {
        if (_this.$refs.picRef)
          this.model.CoverImageUrls = _this.$refs.picRef.fileList.map((m) => m.url).toString();
        else
          this.contentType = "micro";
      }
      else if (this.contentType == "video")
      {
        if ((_this.$refs.videoRef.fileList).length == 0)
          return _this.$message.warning('暂无视频地址，无法发布..');
        else
          this.model.VideoUrl = _this.$refs.videoRef.fileList[0].url;
        if (_this.$refs.videoCoverRef.fileList.length > 0)
          this.model.CoverImageUrls = _this.$refs.videoCoverRef.fileList[0].url;
      }
      else if (this.contentType == "voice")
      {
        if (_this.$refs.voiceRef.fileList.length == 0)
          return _this.$message.warning('暂无音频地址，无法发布..');
        else
          this.model.VoiceUrl = _this.$refs.voiceRef.fileList[0].url;
      }
      this.$http.post('AppApi/news/add', { MainData: this.model })
        .then(res => {
          if (res.code > 2000)
            Object.assign(this.$data, this.$options.data());
        })
        .catch(err => { console.log(err) });
    }
  },
};
</script>
<style>
.el-upload-dragger {
  width: 100%;
  height: 100%;
}
.el-progress-bar {
  width: 98%;
}
.item-append .el-input__inner {
  text-align: right;
  display: block;
  font-size: 1em;
  font-weight: bold;
  border: none;
}
</style>
 
