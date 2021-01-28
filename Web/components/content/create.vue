<template>
  <div style="padding-top: 20px">
    <el-form
      :model="model"
      status-icon
      label-width="100px"
      :rules="rules"
      ref="contentRef"
    >
      <el-form-item :label="bbsId > 0 ? '帖子标题' : '文章标题'" prop="Title">
        <el-input v-model="model.Title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-progress
          v-if="percentage != 0"
          :color="'#000'"
          :format="
            (p) => {
              return p >= 100 ? '上传成功' : p.toString().substr(0, 4) + '%';
            }
          "
          :percentage="percentage"
        >
        </el-progress>
        <div id="content"></div>
      </el-form-item>
      <el-form-item v-if="showMore">
        <div style="padding-bottom: 10px">
          <el-input
            type="textarea"
            maxlength="200"
            :rows="3"
            placeholder="请输入文章简介."
            v-model="model.Summary"
          >
          </el-input>
        </div>
        <el-row :span="24">
          <el-col :span="8">
            <el-image
              v-for="url in coversImgs"
              :key="url"
              style="width: 100px; margin: 10px"
              :src="url"
            >
            </el-image>
            <el-tooltip effect="dark" content="封面图片" placement="bottom">
              <el-image
                @click="coversDialog"
                style="width: 80px; cursor: pointer"
                src="/upload.jpg"
                fit="fill"
              >
              </el-image>
            </el-tooltip>
          </el-col>
          <el-col :span="8">
            <div @click="tagsVisible = true">
              <h2 style="cursor: pointer">#话题#</h2>
            </div>
            <div style="clear: both">
              <el-tag
                v-for="(tag, index) in tags"
                :key="index"
                closable
                @close="tags.splice(index, 1)"
                type="info"
              >
                #{{ tag }}
              </el-tag>
            </div>
          </el-col>
          <el-col :span="8">
            <el-select v-model="model.Visible" class="visible">
              <el-option label="公开" value="1"></el-option>
              <el-option label="登录可见" value="2"></el-option>
              <el-option label="关注我可见" value="3"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-else>
        <el-link type="danger" @click="showMore = true">更多</el-link>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button :loading="loading" type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="tagsVisible">
      <Tags @getTag="getTag"></Tags>
    </el-dialog>
    <el-dialog :visible.sync="coversVisible">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-upload
            ref="coversRef"
            list-type="picture-card"
            :on-remove="coverRemove"
            :limit="3"
            action="/"
            :http-request="coverUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
        <div class="text item">
          <el-image
            @click="coverConfirm(url)"
            v-for="url in contentImgs"
            :key="url"
            style="width: 100px; margin: 10px; cursor: pointer"
            :src="url"
          >
          </el-image>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coversDialog = false">取 消</el-button>
        <el-button type="primary" @click="coversConfirm">确定封面</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
let editor = null;
import { qnUpload } from "@/assets/js/qiniu.js";
import { isBrowser } from "@/environment";
export default {
  data() {
    return {
      loading: false,
      percentage: 0,
      tags: [],
      tagsVisible: false,
      coversVisible: false,
      coversImgs: [],
      model: {
        Type: "article",
        Title: "",
        Visible: "1",
      },
      contentImgs: [],
      showMore: false,
      rules: {
        Title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 5, max: 30, message: "标题长度在5 到 30 个字符", trigger: "blur" },
        ],
      },
    };
  },
  props: {
    bbsId: {
      type: Number,
    },
  },
  mounted() {
    if (isBrowser) {
      let E = require("wangeditor");
      let _this = this;
      editor = new E("#content");
      editor.config.zIndex = 10;
      editor.config.linkImgCallback = function (url) {
        console.log("linkImgCallback", url);
      };
      editor.config.uploadImgMaxSize = 10 * 1024 * 1024; // 10M
      editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"];
      editor.config.uploadImgMaxLength = 5; // 一次最多上传 5 个图片
      editor.config.customAlert = function (s) {
        return _this.$message.warning("一次最多上传 5 个图片");
      };
      editor.config.uploadFileName = "my-file-name";
      editor.config.uploadImgParams = {
        x: 100,
        y: "abc",
      };
      editor.config.uploadImgParamsWithUrl = true;
      editor.config.uploadImgHeaders = {
        a: 100,
        b: "xyz",
      };
      editor.config.uploadImgTimeout = 5 * 1000;
      editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        resultFiles.forEach((img) => {
          _this.percentage = 1;
          qnUpload(
            img,
            (watch) => {
              if (watch.total.percent > 0) _this.percentage = watch.total.percent;
            },
            (successUrl) => {
              insertImgFn(successUrl);
            }
          );
        });
      };
      editor.create();
    }
  },
  methods: {
    getTag(tag) {
      this.tags.push(tag);
      this.tagsVisible = false;
    },
    coversDialog() {
      this.coversVisible = true;
      var html = editor.txt.html();
      let imgReg = /<img.*?(?:>|\/>)/gi;
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      this.contentImgs = (html.match(imgReg) || []).map((m, i) => m.match(srcReg)[1]);
    },
    coverConfirm(url) {
      if (this.$refs.coversRef.fileList.findIndex((m) => m.url == url) == -1)
        this.$refs.coversRef.fileList.push({ url: url });
    },
    coversConfirm() {
      this.coversVisible = false;
      this.coversImgs = this.$refs.coversRef.fileList.map((m) => m.url);
    },
    coverRemove(file) {
      let delIndex = this.$refs.coversRef.fileList.findIndex((m) => m.url == file.url);
      if (delIndex > -1) this.$refs.coversRef.fileList.splice(delIndex, 1);
    },
    coverUpload(params) {
      let _this = this,
        file = params.file,
        fileType = file.type;
      if (!(fileType.indexOf("image") > -1))
        return _this.$message.warning("请选择正确的文件类型");
      if (file.size / 1024 / 1024 > 10)
        return _this.$message.warning("上传图片不能超过 10MB!");

      qnUpload(
        file,
        null,
        (successUrl) => {
          _this.$refs.coversRef.fileList.push({ url: successUrl });
        },
        (error) => {
          let delIndex = _this.$refs.coversRef.uploadFiles.length;
          _this.$refs.coversRef.uploadFiles.splice(delIndex - 1, 1);
        }
      );
    },
    submitForm() {
      this.$refs.contentRef.validate((valid) => {
        if (valid) {
          let _this = this;
          this.model.BbsId = this.bbsId;
          this.model.Tags = this.tags.toString();
          this.model.Content = editor.txt.html();
          this.model.CoverImageUrls = this.coversImgs.toString();
          if (!this.model.Summary) this.model.Summary = editor.txt.text().substr(0, 200);
          if (!this.model.Content) return this.$message.warning("文章内容必填..");
          this.loading = true;
          this.$http
            .post("AppApi/news/add", { MainData: this.model })
            .then((res) => {
              this.loading = false;
              if (res.status) this.resetForm();
            })
            .catch((err) => {
              console.log(err);
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      editor.txt.clear();
      Object.assign(this.$data, this.$options.data());
      this.$refs["contentRef"].resetFields();
    },
  },
};
</script>
<style>
.visible .el-input__inner {
  text-align: right;
  display: block;
  font-size: 1.2em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  border: none;
}
</style>
