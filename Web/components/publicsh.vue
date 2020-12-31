<template>
  <div>
    <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入内容" v-model="textarea2">
    </el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style>
</style>