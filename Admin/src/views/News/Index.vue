<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div style="padding: 20px;float: left; width: 300px">
          <el-alert title="首页生成-配置完成后请生成静态页" type="warning">
          </el-alert>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="cursor: pointer; padding: 20px; float: right">
          <el-button type="primary">轮播配置</el-button>
          <el-button type="success">诡瞥配置</el-button>
          <el-button type="info">影视配置</el-button>
          <!-- <el-button type="warning">警告按钮</el-button> -->
          <el-button type="danger">首页生成</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <iframe
        runat="server"
        src="/static/default/index.html"
        width="100%"
        height="900px"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        allowtransparency="yes"
      ></iframe>
    </el-row>
  </div>
</template>