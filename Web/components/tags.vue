<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>
        <el-input @change="getByKey" style="width:80%;" placeholder="创建或搜索话题.." v-model="keyword" clearable>
        </el-input>
      </span>
      <el-button style="float: right;" type="text">热门话题</el-button>
    </div>
    <div v-if="hotTags.length>0">
      <div v-for="(t,index) in hotTags" :key="index" @click="createTag(t.tag)" class="tag-item">
        <el-link type="danger" style="font-size:20px;" v-if="index==0"> #{{t.tag}}#</el-link>
        <el-link type="warning" style="font-size:18px;" v-else-if="index==1"> #{{t.tag}}#</el-link>
        <el-link type="primary" style="font-size:15px;" v-else-if="index==2"> #{{t.tag}}#</el-link>
        <el-link type="info" v-else> #{{t.tag}}#</el-link>
        <span style="float:right;margin-right:10px;">
          {{t.useCount}}
        </span>
      </div>
    </div>
    <div v-else class="tag-item">
      <el-link type="info" style="font-size:18px;" @click="createTag(keyword)">创建 #{{keyword}}#</el-link>
    </div>
  </el-card>
</template>

<script>
export default {
  computed: {
    hotTags: {
      get () {
        return this.$store.state.tags.hotTags;
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  data () {
    return {
      keyword: ""
    }
  },
  mounted () {
    this.$store.dispatch("tags/fetchHotTags")
  },
  methods: {
    getByKey () {
      this.$http.get("AppApi/NewsTag/GetByKeyword", { keyword: this.keyword })
        .then(data => {
          this.$store.commit("tags/setHotTags", data)
        }).catch(error => console.log(error))
    },
    createTag (tag) {
      this.$emit("getTag", tag);
    }
  },
}
</script>

<style >
.tag-item {
  margin-top: 5px;
  font-weight: 500;
  font-size: large;
}
</style>