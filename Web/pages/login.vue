<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="登录" name="login">
        <el-form
          :model="loginForm"
          :rules="loginRules"
          status-icon
          ref="loginForm"
          label-width="100px"
        >
          <el-form-item label="用户" prop="userName">
            <el-input
              v-model="loginForm.userName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input
              type="password"
              v-model="loginForm.passWord"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button :loading="loading" @click="submitLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="注册" name="register">
        <el-form
          :model="registerForm"
          :rules="registerRules"
          ref="registerForm"
          status-icon
          label-width="100px"
        >
          <el-form-item label="邮箱/手机" prop="userName">
            <el-input
              placeholder="请输入手机号或邮箱进行注册"
              v-model="registerForm.userName"
            >
              <template slot="append">
                <el-button size="small" round>发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input
              type="password"
              v-model="registerForm.passWord"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passWord2">
            <el-input
              type="password"
              v-model="registerForm.passWord2"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model.number="registerForm.code"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('ruleForm')">确定注册</el-button>
            <el-button type="primary" @click="resetForm('ruleForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.passWord !== '') {
          this.$refs.registerForm.validateField('passWord');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.passWord) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      activeName: "login",
      loginCount: 0,
      loginForm: {
        userName: "",
        passWord: "",
        verificationCode: "gpsq",
        UUID: "gpsq"
      },
      loginRules: {
        userName: [{ required: true, message: '请输入登录用户', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      registerForm: {
        userName: "",
        passWord: "",
        code: "",
      },
      registerRules: {
        userName: [{ required: true, message: '请输入注册邮箱手机号.', trigger: 'blur' }],
        passWord: [{ required: true, message: '请输入密码.', trigger: 'blur' }, { validator: validatePass, trigger: 'blur' }],
        passWord2: [{ validator: validatePass2, trigger: 'blur' }],
      }
    }
  },
  methods: {
    submitLogin() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$http.post("/api/user/login", this.loginForm, "正在登陆....")
            .then((result) => {
              this.loading = false;
              if (result.status) {
                this.$notify({
                  title: '登录提示',
                  message: '登陆成功..',
                  type: 'success'
                });
                this.$store.commit("user/setUser", result.data);
                this.$router.push({ path: "/" });
              }
            })
            .then((error) => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>