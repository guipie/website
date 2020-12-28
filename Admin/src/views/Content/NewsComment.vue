<!--
*Author：jxx
 *Contact：283591387@qq.com
 *代码由框架生成,任何更改都可能导致被代码生成器覆盖
 *业务请在@/extension/Content/NewsComment.js此处编写
 -->
<template>
  <div>
    <view-grid :columns="columns" :detail="detail" :editFormFileds="editFormFileds" :editFormOptions="editFormOptions"
      :searchFormFileds="searchFormFileds" :searchFormOptions="searchFormOptions" :table="table" :extend="extend">
    </view-grid>
  </div>
</template>

<script>
import extend from "@/extension/Content/NewsComment.js";
import ViewGrid from "@/components/basic/ViewGrid.vue";
var vueParam = {
  components: {
    ViewGrid
  },
  data () {
    return {
      table: {
        key: 'Id',
        footer: "Foots",
        cnName: '评论',
        name: 'NewsComment',
        url: "/NewsComment/",
        sortName: "CreateDate"
      },
      extend: extend,
      editFormFileds: {},
      editFormOptions: [],
      searchFormFileds: {},
      searchFormOptions: [],
      columns: [{ field: 'Id', title: 'Id', type: 'string', width: 90, hidden: true, readonly: true, require: true, align: 'left' },
      { field: 'Coments', title: '评论', type: 'string', width: 220, require: true, align: 'left' },
      { field: 'Praise', title: '点赞数', type: 'int', width: 90, require: true, align: 'left' },
      { field: 'Type', title: '类型', type: 'string', bind: { key: 'commentType', data: [] }, width: 120, require: true, align: 'left' },
      { field: 'Creator', title: '创建人', type: 'string', width: 130, require: true, align: 'left' },
      { field: 'CreateDate', title: '创建时间', type: 'datetime', width: 90, require: true, align: 'left', sortable: true }],
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
