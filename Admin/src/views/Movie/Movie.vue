<!--
*Author：jxx
 *Contact：283591387@qq.com
 *代码由框架生成,任何更改都可能导致被代码生成器覆盖
 *业务请在@/extension/Movie/Movie.js此处编写
 -->
<template>
  <div>
    <view-grid
      :columns="columns"
      :detail="detail"
      :editFormFileds="editFormFileds"
      :editFormOptions="editFormOptions"
      :searchFormFileds="searchFormFileds"
      :searchFormOptions="searchFormOptions"
      :table="table"
      :extend="extend"
    >
    </view-grid>
  </div>
</template>

<script>
import extend from "@/extension/Movie/Movie.js";
import ViewGrid from "@/components/basic/ViewGrid.vue";
var vueParam = {
  components: {
    ViewGrid
  },
  props: ["tableHeight"],
  data() {
    return {
      table: {
        key: 'Id',
        footer: "Foots",
        cnName: '影视',
        name: 'Movie',
        url: "/Movie/",
        sortName: "Id"
      },
      extend: extend,
      editFormFileds: {},
      editFormOptions: [],
      searchFormFileds: { Name: "" },
      searchFormOptions: [
        [
          { title: "名称", required: true, field: "Name", type: "like" },
          { "dataKey": "movie_type", "title": "影视类型", "field": "TypeId", "type": "select" }
        ]
      ],
      columns: [
        { field: 'Id', title: 'Id', type: 'int', width: 90, hidden: true, readonly: true, require: true, align: 'left' },
        { field: 'Name', title: '名称', type: 'string', width: 120, require: true, align: 'left' },
        { field: 'Director', title: '导演', type: 'string', width: 90, align: 'left' },
        { field: 'TypeName', title: '类型', type: 'string', width: 60, align: 'left' },
        { field: 'PlayTypes', title: '播放类型', type: 'string', width: 60, align: 'left' },
        { field: 'Region', title: '地区', type: 'string', width: 90, align: 'left' },
        { field: 'ModifyDate', title: '更新时间', type: 'datetime', width: 90, align: 'left', sortable: true },
        { field: 'CreateDate', title: '添加事件', type: 'datetime', width: 90, align: 'left', sortable: true }],
      detail: {
        cnName: "#detailCnName",
        columns: [],
        sortName: "",
        key: ""
      }
    };
  }
};
export default vueParam;
</script>
