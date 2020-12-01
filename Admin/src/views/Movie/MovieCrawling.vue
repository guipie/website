<template>
  <div>
    <el-divider> {{ warningTxt }} </el-divider>
    <VolForm
      ref="crawlingform"
      :formFileds="formFileds"
      :formRules="formRules"
    ></VolForm>
    <div style="float: right;z-index='1000';">
      <el-button @click="resetTask()" type="danger">清空采集任务</el-button>
      <el-button @click="$refs.crawlingTable.load()"> 查询 </el-button>
    </div>
    <vol-table
      :ck="false"
      :columnIndex="true"
      style="margin-top: 40px"
      ref="crawlingTable"
      :loadKey="true"
      :pagination-hide="false"
      :max-height="500"
      :url="dataUrl"
      :pagination="{ size: 10 }"
      :columns="dataColumns"
      @loadBefore="loadTableBefore"
      @loadAfterAll="loadAfterAll"
    ></vol-table>
  </div>
</template>
<script>
import VolForm from "@/components/basic/VolForm.vue";
import VolTable from "@/components/basic/VolTable.vue";
export default {
  components: { VolForm, VolTable },
  data() {
    return {
      warningTxt: "",
      dataUrl: "/api/MovieWebsite/CrawlingLog", //table1获取数据的接口
      //表配置的字段注意要与后台返回的查询字段大小写一致
      dataColumns: [
        { field: "name", title: "标题", type: "int", width: 150, align: 'center' },
        { field: "sourceUrl", title: "地址", type: "text", width: 200, linkHref: true },
        { field: "status", title: "状态", type: "int", width: 100, align: 'center', bind: { data: [{ key: '1', value: '待采集' }, { key: '2', value: '待同步数据库' }, { key: '3', value: '已同步数据库' }] } },
        { field: "crawlingMessage", title: "采集信息", type: "text", width: 300 }
      ],
      formFileds: {
        Name: "",
        Status: []
      },
      formRules: [
        [
          {
            columnType: "string",
            title: "名称：",
            field: "Name"
          },
          {
            title: "状态:",
            //如果这里绑定了data数据，后台不会加载此数据源
            data: [
              { key: "1", value: "待采集" },
              { key: "2", value: "待同步数据库" },
              { key: "3", value: "已同步数据库" }
            ],
            required: false,
            field: "Status",
            type: "checkbox"
          }
        ]
      ]
    }
  },
  created() {
  },
  methods: {
    loadAfterAll(data) {
      this.warningTxt = data.extra;
    },
    loadTableBefore(param, callBack) {
      //此处是从后台加数据前的处理，自己在此处自定义查询条件,查询数据格式自己定义或参考代码生成器查询页面请求的数据格式
      console.log("加载数据前" + param);
      param.page = 1;
      if (this.formFileds.Status.length > 0)
        param.wheres.push({ "name": "Status", "value": this.formFileds.Status.toString() });
      if (this.formFileds.Name)
        param.wheres.push({ "name": "Name", "value": this.formFileds.Name });
      callBack(true); //此处必须进行回调，返回处理结果，如果是false，则不会执行后台查询
    },
    resetTask() {
      this.http.get("/api/MovieWebsite/Crawling/Reset").then(res => {
        this.$notify({
          message: res,
          type: 'warning'
        });
      });
    }
  }
}
</script>