<template>
  <div class="head-row">
    <el-col :span="6">
      <a href="/">
        <h2 class="col1">诡瞥社区</h2>
      </a>
    </el-col>
    <el-col :span="12" class="top-menu">
      <el-link :underline="false" type="info" href="/bbs">
        <h4 style="margin-top: 30px;">论 坛</h4>
      </el-link>
      <el-link :underline="false" type="info" href="/movie" target="_blank">
        <h4 style="margin-top: 30px;">放映厅</h4>
      </el-link>
      <el-link :underline="false" type="info" href="/message_board" target="_blank">
        <h4 style="margin-top: 30px;">诡记</h4>
      </el-link>
    </el-col>
    <el-col :span="6" style="float: right">
      <div style="margin-top: 20px">
        <el-dropdown v-if="userInfo.userName" @command="handleCommand">
          <span v-if="userInfo.img">
            <el-avatar :src="userInfo.img" shape="square" size="medium"></el-avatar>
            {{ userInfo.userName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <span v-else>
            <el-avatar shape="square" size="medium">
              {{ userInfo.userName }}</el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
            <el-dropdown-item command="logOut" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button v-else type="info" plain @click="$loginDialog()">登录</el-button>
      </div>
    </el-col>
  </div>
</template>

<script> 

import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState({ userInfo: state => state.user.userInfo })
  },
  data () {
    return {
      headActive: "1"
    }
  },
  mounted () {
    if (!Object.assign({}, this.userInfo).userName)
      this.setUser(JSON.parse(localStorage.getItem("userInfo") || "{}"));
  },
  methods: {
    ...mapMutations('user', ['clearUser', 'setUser']),
    handleCommand (cmd) {
      if (cmd === "logOut")
        this.clearUser();
    }
  }
}
</script>

<style>
.el-header {
  padding: 0%;
  background-color: #000000;
}
.col1 {
  float: right;
  color: #ffffff;
}
.top-menu {
  color: #ffffff;
}
.top-menu a {
  margin-left: 30px;
}
</style>