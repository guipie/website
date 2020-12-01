<!--
*Author：jxx
 *Contact：283591387@qq.com
 *代码由框架生成,任何更改都可能导致被代码生成器覆盖
 *业务请在@/extension/News/NewsTag.js此处编写
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
import extend from "@/extension/News/NewsTag.js";
import ViewGrid from "@/components/basic/ViewGrid.vue";
var vueParam = {
  components: {
    ViewGrid,
  },
  data() {
    return {
      table: {
        key: "Id",
        footer: "Foots",
        cnName: "资讯标签",
        name: "NewsTag",
        url: "/NewsTag/",
        sortName: "Id",
      },
      extend: extend,
      editFormFileds: { Tag: "" },
      editFormOptions: [[{ title: "标签", required: true, field: "Tag" }]],
      searchFormFileds: { Tag: "" },
      searchFormOptions: [
        [{ title: "标签关键字", required: true, field: "Tag", type: "like" }],
      ],
      columns: [
        {
          field: "Id", title: "Id", type: "int", width: 90, hidden: true, readonly: true, require: true, align: "left",
        },
        {
          field: "Tag", title: "标签", type: "string", readonly: true, require: true, align: "left",
        },
        {
          field: "CreateDate", title: "创建时间", type: "datetime", align: "left", sortable: true,
        },
        {
          field: "Creator", title: "创建人", type: "string", align: "left",
        },
      ],
      detail: {},
    };
  },
};
export default vueParam;
</script>
