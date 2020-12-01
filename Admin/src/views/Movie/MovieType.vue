<!--
*Author：jxx
 *Contact：283591387@qq.com
 *代码由框架生成,任何更改都可能导致被代码生成器覆盖
 *业务请在@/extension/Movie/MovieType.js此处编写
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
import extend from "@/extension/Movie/MovieType.js";
import ViewGrid from "@/components/basic/ViewGrid.vue";
var vueParam = {
  components: {
    ViewGrid
  },
  data() {
    return {
      table: {
        key: 'Id',
        footer: "Foots",
        cnName: '影视类别',
        name: 'MovieType',
        url: "/MovieType/",
        sortName: "Id"
      },
      extend: extend,
      editFormFileds: { Name: "", Code: "", Description: "", Sequence: "", Pid: [] },
      editFormOptions: [
        [{ "title": "父类别", "field": "Pid", type: "cascader" }],
        [{ "title": "类别", "required": true, "field": "Name" }],
        [{ "title": "编码", "required": true, "field": "Code" }],
        [{ "title": "描述", "field": "Description" }],
        [{ "title": "排序", "required": true, "field": "Sequence", require: true, "type": "number" }]
      ],
      searchFormFileds: { "Name": "" },
      searchFormOptions: [[{ title: "类别", required: true, field: "Name", type: "like" }]],
      columns: [
        { field: 'Id', title: 'Id', type: 'int', width: 90, hidden: true, readonly: true, require: true, align: 'left' },
        { field: 'Pid', title: 'Pid', type: 'int', width: 90, align: 'left', hidden: true },
        { field: 'Name', title: '类别', type: 'string', width: 120, require: true, align: 'left' },
        { field: 'Code', title: '编码', type: 'string', width: 120, align: 'left' },
        { field: 'Sequence', title: '排序', type: 'short', width: 90, align: 'left', sort: true },
        { field: 'Description', title: '备注', type: 'string', width: 180, align: 'left' },
        { field: 'IsHidden', title: '是否隐藏', type: 'short', width: 90, align: 'left' }],
      detail: {}
    };
  }
};
export default vueParam;
</script>
<style>
.el-table__row--level-1 td{
  background-color: #f3eded;
}
</style>
