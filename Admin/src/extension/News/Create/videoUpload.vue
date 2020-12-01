<template>
  <div>
    <div id="videoPlayer" style="margin-bottom: 20px;" v-if="currentVideoUrl"></div>
    <el-upload v-else drag ref="uploadVideo" :auto-upload="false" :limit="1" :accept="accept" :on-change="uploadVideo"
      :action="uploadUrl" :show-file-list="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip">只能上传[{{accept}}]视频文件，且不超过200兆</div>
    </el-upload>
  </div>
</template>
<script>
  let videoPlayer;
  export default {
    data() {
      return {
        uploadUrl: this.http.ipAddress + "api/news/upload",
        currentVideoUrl: this.playUrl,
        accept: ".m4v, .mpg, .mp4, .avi, .mov, .mk, .wmv",
      }
    },
    props: ["playUrl"],
    mounted() {
      if (this.currentVideoUrl)
        videoPlayer = new Player({
          id: 'videoPlayer',
          url: this.currentVideoUrl
        });
    },
    watch: {
      "currentVideoUrl": function(v1, v2) {

      }
    },
    methods: {
      uploadVideo(file, filelist) {
        var forms = new FormData();
        forms.append(file.name, file);
        filelist.forEach(function(f) {
          if (f.size / 1024 / 1024 > 200)
            return this.$message.warning("视频太大，请分隔后上传.");
          forms.append(f.name, f.raw);
        });
        this.http.post("api/news/video/upload", forms).then(
          x => {
            this.$refs.uploadVideo.clearFiles();
            this.$message.success("上传成功");
            this.currentVideoUrl = this.$parent.formFileds.VideoUrl = this.http.ipAddress + x.data;
            this.$nextTick(() => {
              videoPlayer = new Player({
                id: 'videoPlayer',
                url: this.currentVideoUrl
              });
            })
          },
          error => {
            this.$refs.uploadVideo.clearFiles();
            this.currentVideoUrl = "";
          }
        );
      }
    }
  }
</script>
<style>
  .el-upload {
    width: 100%;
  }

  .el-upload-dragger {
    padding-bottom: 10px;
    margin-bottom: 30px;
    margin-left: 89px;
    width: auto;
  }
</style>
