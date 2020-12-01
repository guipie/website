<template>
  <div :gutter="20" class="head-row">
    <el-col :span="7">
      <a href="/"> <h2 class="col1">诡瞥社区</h2> </a>
    </el-col>
    <el-col :span="10"><div class="col2"></div></el-col>
    <el-col :span="7" style="float: right">
      <div class="col3" style="margin-top: 20px">
        <el-dropdown v-if="userInfo.userName" @command="handleCommand">
          <span v-if="userInfo.img">
            <el-avatar
              :src="userInfo.img"
              shape="square"
              size="medium"
            ></el-avatar>
            {{ userInfo.userName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <span v-else>
            <el-avatar shape="square" size="medium">
              {{ userInfo.userName }}</el-avatar
            >
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
            <el-dropdown-item command="logOut" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-link v-else href="/login">登录</el-link>
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
  data() {
    return {
      headActive: "1"
    }
  },
  mounted() {
    if (!Object.assign({}, this.userInfo).userName)
      this.setUser(JSON.parse(localStorage.getItem("userInfo") || "{}"));
  },
  methods: {
    ...mapMutations('user', ['clearUser', 'setUser']),
    handleCommand(cmd) {
      if (cmd === "logOut")
        this.clearUser();
    }
  }
}
</script>

<style>
</style>