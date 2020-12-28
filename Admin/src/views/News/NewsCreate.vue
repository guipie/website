<template>
  <div class="content" v-cloak>
    <Tabs v-model="newsType">
      <TabPane label="诡闻" icon="ios-add-circle" name="micro"></TabPane>
      <TabPane label="长图文" icon="ios-link" name="article"></TabPane>
      <Tab-pane label="视频" icon="ios-videocam" name="video"></Tab-pane>
    </Tabs>
    <div style="padding-top: 15px">
      <VolForm ref="mainFieds" :label-width="newsType=='micro'?0:90" :formFileds="formFileds" :formRules="formRules1">
      </VolForm>
      <div v-if="newsType == 'article'" class="v-kind">
        <label class="ivu-form-item-label" style="width: 90px">发布内容：</label>
        <div>
          <kind-editor :content="formFileds.Content" :UploadImgUrl="'/api/news/upload'"
            :uploadJson="'/api/news/kindEditorUpload'" ref="editor" height="450px"></kind-editor>
        </div>
      </div>
      <div v-if="newsType == 'video'">
        <VideoUpload :playUrl="formFileds.VideoUrl"></VideoUpload>
      </div>
      <Form ref="formInline" inline>
        <FormItem :label="newsType=='micro'?'':'封面选择：'" style="width: 40%">
          <el-image v-for="img in seletedCovers" style="width: 60px; height: 50px; padding: 2px" :src="img.path"
            fit="contain" :key="img.name"></el-image>
          <Icon type="md-photos" size="40" @click="confirmCoverDialog" color="#e87557" />
          <VolBox icon="ios-chatbubbles" :model.sync="uploadImgModel" title="资讯图片上传和选择" :height="200" :width="450"
            :padding="15">
            <VolUpload ref="coverUpload" style="
                text-align: right;
                border: 1px dotted #ff9800;
                padding: 20px;
              " :url="'api/news/upload'" :autoUpload="false" :multiple="true" :max-file="newsType=='micro'?9:3"
              :img="true" :append="true" :fileInfo="seletedCovers" :uploadAfter="uploadAfter"></VolUpload>
            <template slot="contentAppend">
              <el-image v-for="img in contentImgs" style="
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                  cursor: pointer;
                " :src="img.path" fit="contain" :key="img.name" @click="selectedContentImg(img)"></el-image>
            </template>
            <template slot="footer">
              <el-button type="success" @click="confirmUpload()">确定上传</el-button>
            </template>
          </VolBox>
        </FormItem>
        <FormItem label="是否推荐：" style="width: 20%">
          <i-switch size="large" true-color="#13ce66" false-color="#e87557" v-model="formFileds.IsRecommend">
            <span slot="open">推荐</span>
            <span slot="close">不推荐</span>
          </i-switch>
        </FormItem>
        <FormItem label="创建标签：" :label-width="90" style="width: 35%">
          <el-select style="width: 100%" v-model="formFileds.Tags" multiple filterable remote reserve-keyword
            allow-create placeholder="请输入关键词" :remote-method="remoteTags" :loading="tagLoading"
            @change="$forceUpdate()">
            <el-option v-for="item in tags" :key="item.key" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </FormItem>
      </Form>
      <div style="text-align: right">
        <Button :type="formFileds.NewsId > 0 ? 'error' : 'success'" style="margin-bottom: 20px" @click="addNews()">
          发 布
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import VolBox from "@/components/basic/VolBox.vue";
import VolHeader from "@/components/basic/VolHeader.vue";
import VolForm from "@/components/basic/VolForm.vue";
import UploadImg from "@/components/basic/UploadImg.vue";
import KindEditor from "@/components/kindeditor/KindEditor.vue";
import thisFunc from "@/extension/news/newsCreate"
export default {
  components: {
    VolBox,
    VolForm,
    VolHeader,
    KindEditor,
    VolUpload: () => import("@/components/basic/VolUpload.vue"),
    VideoUpload: () => import("@/extension/news/create/videoUpload.vue")
  },
  methods: {
    addNews (isAdd) {
      if (this.$refs.editor)
        this.formFileds.Content = this.$refs.editor.getContent();
      if (this.newsType == "micro")
        this.formFileds.Title = this.formFileds.Summary.substr(0, 50);
      this.formFileds.Type = this.newsType;
      if (this.$refs.mainFieds.validate())
        thisFunc.Add(this);
    },
    createTag (val) {
      this.tags.push({
        key: val,
        value: val
      });
    },
    remoteTags (q) {
      thisFunc.GetTagsByKey(q, this);
    },
    confirmCoverDialog () {
      this.uploadImgModel = true;
      if (!this.$refs.editor) return;
      var html = this.$refs.editor.outContent;
      let imgReg = /<img.*?(?:>|\/>)/gi;
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      var arr = html.match(imgReg);
      this.contentImgs = [];
      for (var i = 0; i < (arr || []).length; i++)
        this.contentImgs.push({
          name: i.toString(),
          path: arr[i].match(srcReg)[1],
        });
    },
    confirmUpload () {
      this.$refs.coverUpload.upload();
    },
    uploadAfter (res, files) {
      files.forEach((file) => {
        this.seletedCovers.push({ name: file.name, path: file.path });
      });
      this.uploadImgModel = false;
    },
    selectedContentImg (img) {
      this.seletedCovers = this.seletedCovers || [];
      if (!this.seletedCovers.includes(img))
        this.seletedCovers.push(img);
    },
    uploadVideo () {
      var file = this.$refs.videoFile.files[0];
      var data = new FormData();
      data.append(file.name, file);
    }
  },
  created () {
    if (!this.$store.state.system.userInfo.token)
      this.$router.push("/login");
    this.formRules1.forEach((x) => {
      x.forEach((item) => {
        if (item.field == "NewsTypes")
        {
          this.http.get("api/NewsType/getTree").then((data) => {
            item.data = data;
          });
        }
      });
    });
  },
  mounted () {
    if (this.$route.query.newsId)
      this.http.get("/api/news/admin/" + this.$route.query.newsId)
        .then((result) => {
          Object.assign(this.formFileds, result);
          this.seletedCovers = (result.SeletedCovers || []).map(m => { return { path: m } });
          this.$refs.editor.setContent(result.Content);
          this.newsType = result.Type;
          console.log(this.formFileds);
        });
  },
  watch: {
    newsType (v1) {
      console.log(v1);
      if (v1 == "micro")
        this.formRules1 = [[{
          title: "",
          width: "100%",
          field: "Summary",
          type: "textarea",
          max: 200
        }]];
      else
        this.formRules1 = this.$options.data().formRules1;
    }
  },
  data () {
    return {
      tagLoading: false,
      uploadImgModel: false,
      uploadImgUrl: "",
      seletedCovers: [],
      contentImgs: [],
      newsType: "article",
      tags: [],
      formFileds: {
        Title: "",
        IsRecommend: true,
        Tags: [],
        NewsTypes: []
      },
      formRules1: [
        [{
          title: "类型",
          required: true,
          field: "NewsTypes",
          type: "checkbox",
          data: []
        }],
        [{
          title: "标题",
          required: true,
          min: 5,
          max: 50,
          field: "Title",
          type: "text"
        }],
        [{
          title: "简介",
          field: "Summary",
          type: "textarea",
          max: 200
        }]
      ]
    };
  },
};
</script>
<style lang="less" scoped>
.content {
  padding: 20px 50px;
  min-height: 400px;
  background: white;
}

.v-kind {
  > label {
    color: #939394;
    padding: 10px 12px 10px 0;
    text-align: right;
    width: 90px;
    line-height: 450px;
  }

  display: flex;

  > div {
    flex: 1;
  }
}
</style>
