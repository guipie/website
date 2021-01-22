<template>
  <div>
    <section class="page-component content">
      <h2 id="icon-tu-biao">
        <span>推荐论坛</span>
        <el-button type="primary" style="float: right" @click="dialogBBSVisible = true">
          申请论坛
        </el-button>
      </h2>
      <el-row>
        <el-col :span="6" v-for="o in bbsRecommend" :key="o.id">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="o.bgImg ? o.bgImg : '/zanwei_bbs.png'" class="image" />
            <div style="padding: 14px">
              <nuxt-link target="_blank" :to="`/bbs/${o.id}`">
                <span>{{ o.name }}</span>
                <div class="bottom clearfix">
                  <time class="time">{{ o.description }}</time>
                  <el-button type="text" class="button">详情</el-button>
                </div>
              </nuxt-link>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <h3 id="tu-biao-ji-he">最新论坛</h3>
      <div class="jinsom-show-bbs-box-content clear">
        <li v-for="o in bbs.data" :key="o.id">
          <nuxt-link :to="`/bbs/${o.id}`">
            <div class="top clear">
              <div class="left">
                <img
                  loading="lazy"
                  :src="o.bgImg ? o.bgImg : '/zanwei_bbs.png'"
                  class="avatar opacity"
                />
              </div>
              <div class="right">
                <div class="title">
                  {{ o.name }}
                </div>
                <div class="desc" title="">
                  {{ o.description }}
                </div>
              </div>
            </div>
          </nuxt-link>
          <div class="bottom">
            <span
              >内容：<i>{{ parseInt(Math.random() * 10 + 1) }}</i></span
            >
            <span
              >关注：<i>{{ parseInt(Math.random() * 10 + 1) }}</i></span
            >
            <nuxt-link :to="`/bbs/${o.id}`">点击进入</nuxt-link>
          </div>
        </li>
      </div>
      <el-dialog title="社区论坛申请" :visible.sync="dialogBBSVisible">
        <el-form
          :model="bbsForm"
          ref="bbsForm"
          :rules="bbsFormRules"
          label-width="100px"
          label-position="right"
        >
          <el-form-item label="论坛：" prop="Name">
            <el-input v-model="bbsForm.Name" maxlength="10" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="封面图：">
            <el-upload
              class="avatar-uploader"
              action="/"
              :show-file-list="false"
              :on-change="getImgBase"
              :auto-upload="false"
            >
              <img v-if="bbsForm.BgImg" :src="bbsForm.BgImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="论坛描述：" prop="Description">
            <el-input
              v-model="bbsForm.Description"
              maxlength="200"
              type="textarea"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogBBSVisible = false">取 消</el-button>
          <el-button type="primary" :loading="bbsAddLoading" @click="bbsSubmit"
            >确定创建</el-button
          >
        </div>
      </el-dialog>
    </section>
  </div>
</template>
<script>
export default {
  layout: "empty",
  head: {
    link: [{ rel: "stylesheet", href: require("@/assets/styles/bbs.css") }],
  },
  fetch({ store }) {
    return Promise.all([]);
  },
  computed: {
    bbs() {
      return this.$store.state.bbs.bbs;
    },
    bbsRecommend() {
      return this.$store.state.bbs.bbsRecommend;
    },
  },
  data() {
    return {
      dialogBBSVisible: false,
      bbsAddLoading: false,
      bbsForm: {},
      bbsFormRules: {
        Name: [
          { required: true, message: "请输入论坛名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: ["blur", "change"],
          },
        ],
        Description: [
          { max: 200, message: "长度在 2 到 10 个字符", trigger: ["blur", "change"] },
        ],
      },
    };
  },
  mounted() {
    this.$store.dispatch("bbs/fetchBBS");
    this.$store.dispatch("bbs/fetchBBSRecommend");
  },
  methods: {
    getImgBase(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file.raw);
        reader.onload = function () {
          imgResult = reader.result;
        };
        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      }).then((res) => {
        this.$set(this.bbsForm, "BgImg", res);
      });
    },
    bbsSubmit() {
      this.$refs["bbsForm"].validate((valid) => {
        if (valid) {
          this.bbsAddLoading = true;
          this.$http
            .post("AppApi/NewsType/add", { MainData: this.bbsForm })
            .then((res) => {
              this.bbsAddLoading = false;
              this.dialogBBSVisible = false;
            })
            .catch((err) => {
              console.log(err);
              this.bbsAddLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
    SimSun, sans-serif;
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
  content: "";
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
.avatar {
  max-width: 200px;
  max-height: 180px;
}
</style>
