<template>
<<<<<<< HEAD
  <el-dialog title="用户登录" style="background: #000;" :visible.sync="showLogin" @close="showLogin=false;" width="40%">
=======
  <el-dialog title="用户登录" style="background: #000;" :close-on-click-modal="false" :close-on-press-escape="false"
    :visible.sync="showLogin" @close="showLogin=false;" width="40%">
>>>>>>> 04821e80a62b0770d268e5fdc5cae4c06fab6f90
    <el-form :model="loginForm" placeholder="请输入您的用户名/邮箱/手机号" :rules="loginRules" status-icon ref="loginForm"
      label-width="100px">
      <el-form-item label="用户" prop="userName">
        <el-input v-model="loginForm.userName" autocomplete="off" @keydown="submitLogin"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input type="password" v-model="loginForm.passWord" autocomplete="off" @keydown="submitLogin"></el-input>
        <div style="text-align:right;">
          <el-link href="/user?type=forget" type="danger">忘记密码</el-link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-link href="/user?type=register" type="info">注册</el-link>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showLogin = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="submitLogin">登录</el-button>
    </span>
  </el-dialog>
</template>
<script> 

export default {
  data () {
    return {
      showLogin: false,
      loading: false,
      loginCount: 0,
      loginForm: {
        userName: "",
        passWord: "",
        verificationCode: "gpsq",
        UUID: "gpsq"
      },
      loginRules: {
        userName: [{ required: true, message: '请输入您的用户名/邮箱/手机号', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid)
        {
          this.loading = true;
          $nuxt.$http.post("/api/user/login", this.loginForm, "正在登陆....")
            .then((result) => {
              this.loading = false;
              this.showLogin = false;
              if (result.status)
              {
                $nuxt.$store.commit("user/setUser", result.data);
                // $nuxt.$router.push({ path: "/" });
              }
            })
            .then((error) => {
              this.loading = false;
            });
        } else
        {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>