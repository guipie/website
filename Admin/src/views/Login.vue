<template>
  <div class="bg">
    <div class="content">
      <div class="desc">
        <div class="title">诡瞥社区</div>
        <p>一个神奇的暗黑系社区，诡也，瞥之...</p>
      </div>
      <div class="login">
        <div class="login-contianer">
          <div class="login-form">
            <Menu mode="horizontal" style="margin-bottom: 30px" active-name="1">
              <MenuItem name="1">
                <Icon type="md-contacts" />帐号登陆
              </MenuItem>
              <MenuItem name="2"> <Icon type="ios-mail" />短信登陆 </MenuItem>
            </Menu>
            <div class="form-user" @keypress="loginPress">
              <div class="item">
                <div class="f-text">
                  <label> <Icon type="ios-people" :size="20" />用户名： </label>
                </div>
                <div class="f-input">
                  <input
                    type="text"
                    v-focus
                    v-model="userInfo.userName"
                    placeholder="输入用户"
                  />
                </div>
                <div class="f-remove" @click="userInfo.userName = ''">
                  <Icon type="ios-close-circle" />
                </div>
              </div>
              <div class="item">
                <div class="f-text">
                  <label>
                    <Icon type="ios-lock" :size="20" />密&nbsp;&nbsp;&nbsp;码：
                  </label>
                </div>
                <div class="f-input">
                  <input
                    type="password"
                    v-focus
                    v-model="userInfo.passWord"
                    placeholder="输入密码"
                  />
                </div>
                <div v-focus class="f-remove" @click="userInfo.passWord = ''">
                  <Icon type="ios-close-circle" />
                </div>
              </div>
              <div class="item">
                <div class="f-text">
                  <label>
                    <Icon type="md-images" v-focus :size="20" />验证码：
                  </label>
                </div>
                <div class="f-input">
                  <input
                    v-focus
                    type="text"
                    v-model="userInfo.verificationCode"
                    placeholder="输入验证码"
                  />
                </div>
                <div
                  class="code"
                  @click="
                    () => {
                      getVierificationCode();
                    }
                  "
                >
                  <img v-show="codeImgSrc != ''" :src="codeImgSrc" />
                </div>
              </div>
            </div>
            <div style="loging-btn">
              <Button
                style="background-color: #840a0a"
                size="large"
                :loading="loading"
                type="error"
                @click="login"
                long
              >
                <span v-if="!loading">登陆</span>
                <span v-else>正在登陆...</span>
              </Button>
            </div>
            <!-- <div class="action">
              <a @click="() => {}">注册</a>
              <a @click="() => {}">忘记密码</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="l-bg"></div>
    <div class="r-bg"></div>
    <!-- <div class="login-footer">
      <a @click="toGitHub">
        <Icon type="logo-github" />GitHub
      </a>
      <a>QQ群：4525551949</a>
      <a href="" target="_blank">京ICP备1905rwe6538号-1</a>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      codeImgSrc: "",
      userInfo: {
        userName: "",
        passWord: "",
        verificationCode: "",
      },
    };
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  created() {
    this.getVierificationCode();
  },
  methods: {
    getVierificationCode() {
      this.http.get("/api/User/getVierificationCode").then((x) => {
        this.codeImgSrc = "data:image/png;base64," + x.img;
        this.userInfo.UUID = x.uuid;
      });
    },

    toGitHub() {
      window.open("");
    },
    loginPress(e) {
      if (event.keyCode == 13) {
        this.login();
      }
    },
    login() {
      if (this.userInfo.userName == "" || this.userInfo.userName.trim() == "")
        return this.$Message.error("请输入用户名");
      if (this.userInfo.passWord == "" || this.userInfo.passWord.trim() == "")
        return this.$Message.error("请输入密码");
      if (
        this.userInfo.verificationCode == "" ||
        this.userInfo.verificationCode.trim() == ""
      )
        return this.$Message.error("请输入验证码");
      this.loading = true;
      this.http
        .post("/api/user/login", this.userInfo, "正在登陆....")
        .then((result) => {
          this.loading = false;
          if (!result.status) {
            this.getVierificationCode();
            return this.$Message.error(result.message);
          }
          this.$Message.info("登陆成功,正在跳转!");
          this.$store.commit("setUserInfo", result.data);
          this.$router.push({ path: "/" });
        })
        .then((error) => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.bg {
  display: flex;
  overflow-x: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(135deg, #000 10%, rgb(219, 33, 33));
}

.login {
  flex: 1;
}

.content {
  display: flex;
  z-index: 99;
  position: relative;
  width: 1000px;
  left: 0;
  right: 0;

  margin: 0 auto;
  transform: translateY(-50%);
  // background: #dedede40;
  top: 50%;
  height: 450px;
  border-radius: 10px;
}

.desc {
  width: 500px;
  padding: 40px 50px;
  box-sizing: border-box;
  height: 100%;
}

.desc p {
  font-size: 15px;
  color: white;
  line-height: 30px;
}

.desc p:before {
  top: -1px;
  content: 'o';
  position: relative;
  margin-right: 7px;
}

.title {
  z-index: 999;
  font-size: 70px;
  font-weight: bold;
  color: white;
}

.l-bg {
  height: 1200px;
  width: 1200px;
  border-radius: 50%;
  background: #000;
  position: absolute;
  top: -700px;
  left: -700px;
  background-image: linear-gradient(135deg, #000 10%, #fff);
}

.r-bg {
  height: 2000px;
  width: 2000px;
  border-radius: 50%;
  background: #000;
  position: absolute;
  top: -1500px;
  right: -900px;
  background-image: linear-gradient(135deg, #000 10%, #fff);
}
</style>

<style lang="less" scoped>
.form-user {
  .f-remove {
    display: none;
  }
  margin: 25px 0;
  .item:hover .f-remove {
    display: block;
  }
  .item {
    display: flex;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
    margin-bottom: 30px;
    display: flex;
    .f-text {
      color: #868484;
      font-weight: 400;
      width: 110px;
      font-size: 16px;
      i {
        position: relative;
        top: -1px;
        right: 5px;
      }
    }
    .f-input {
      border: 0px;
      flex: 1;
      input {
        padding-left: 15px;
        font-size: 16px;
        font-weight: 400;
        color: #807f7f;
        width: 100%;
        outline: none;
        border: none;
      }
    }
    .code {
      position: relative;
      cursor: pointer;
      top: -5px;
      width: 74px;
      border: 1px solid #fdfdfd;
      border-radius: 2px;
      height: 35px;
      margin-left: 10px;
    }
    input:focus {
      outline: none;
      background-color: transparent;
    }
    input::selection {
      background: transparent;
    }
    input::-moz-selection {
      background: transparent;
    }
  }
}
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset;
}
.login-contianer {
  .login-form {
    // margin-top: 25px;
    border-radius: 5px;
    padding: 10px 30px 40px 30px;
    width: 400px;
    min-height: 340px;
    background: white;
    box-shadow: 0px 4px 21px #d6d6d6;
  }
}
.login-project {
  line-height: 70px;
  img {
    height: 80px;
  }
  .project-name {
    font-size: 50px;
    position: relative;
    color: white;
    font-weight: 600;
    margin-left: 9px;
  }
  .desc {
    color: wheat;
    font-size: 15px;
  }
}
.loging-btn {
  margin-top: 40px;
}
.action {
  text-align: right;
  margin-top: 20px;
  a {
    margin-left: 20px;
  }
}
.login-footer {
  padding: 10px;
  text-align: center;
  font-size: 16px;
  position: absolute;
  width: 100%;
  bottom: 0px;
  background: #000;
  border-top: 1px solid #e2e2e2;
  i {
    position: relative;
    top: -2px;
    margin-right: 5px;
  }
  a {
    margin-left: 30px;
    color: #f9ebd0;
  }
}
@media screen and (max-device-width: 600px) {
  .desc {
    display: none;
  }
}
</style>
<style scoped>
.login-contianer >>> .ivu-form .ivu-form-item-content {
  margin-left: 0px !important;
}
</style>
<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  box-shadow: 0 0 0 60px #eee inset;
  -webkit-text-fill-color: #878787;
}
</style>



