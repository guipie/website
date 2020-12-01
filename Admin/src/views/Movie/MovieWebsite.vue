<!--
*Author：jxx
 *Contact：283591387@qq.com
 *代码由框架生成,任何更改都可能导致被代码生成器覆盖
 *业务请在@/extension/Movie/MovieWebsite.js此处编写
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
    ></view-grid>
  </div>
</template>

<script>
import extend from "@/extension/Movie/MovieWebsite.js";
import ViewGrid from "@/components/basic/ViewGrid.vue";
var vueParam = {
  components: {
    ViewGrid
  },
  data() {
    return {
      dialogTypeVisible: false,
      table: {
        key: 'Id',
        footer: "Foots",
        cnName: '影视资源网站',
        name: 'MovieWebsite',
        url: "/MovieWebsite/",
        sortName: "Id"
      },
      extend: extend,
      editFormFileds: { Title: "", Url: "", Remark: "" },
      editFormOptions: [
        [{ "title": "网站", "required": true, "field": "Title" }],
        [{ "title": "网站地址", "required": true, "field": "Url" }],
        [{ "title": "描述", "field": "Remark" }]
      ],
      searchFormFileds: {},
      searchFormOptions: [[{ field: 'Title', title: '网站', type: "like" }]],
      columns: [
        { field: 'Id', title: 'ID', type: 'int', width: 50, readonly: true, require: true, align: 'center' },
        { field: 'Title', title: '网站', type: 'string', width: 90, require: true, align: 'left', sortable: true },
        { field: 'Url', title: 'Url', type: 'string', width: 120, align: 'left', linkHref: true },
        { field: 'Remark', title: '备注', type: 'string', width: 180, align: 'left' },
        { field: 'LastObtainTime', title: '最后抓取时间', type: 'datetime', width: 90, align: 'left', sortable: true },
      ],
      detail: {
        cnName: "#detailCnName",
        columns: [],
        sortName: "",
        key: ""
      }
    };
  },
  mounted() {
  },
  methods: {
  }
};
export default vueParam;
</script>
