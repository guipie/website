<!--
*Author：jxx
 *Contact：283591387@qq.com
 *代码由框架生成,任何更改都可能导致被代码生成器覆盖
 *业务请在@/extension/News/NewsType.js此处编写
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
import extend from "@/extension/News/NewsType.js";
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
        cnName: '资讯类别',
        name: 'NewsType',
        url: "/NewsType/",
        sortName: "Id"
      },
      extend: extend,
      editFormFileds: { "Name": "", "Code": "", "Description": "", "Sequence": "1" },
      editFormOptions: [
        [{ "title": "类别名称", "required": true, "field": "Name" }],
        [{ "title": "类别编码", "required": true, "field": "Code" }],
        [{ "title": "描述", "field": "Description" }],
        [{ "title": "排序", "required": true, "field": "Sequence", require: true, "type": "number" }]
      ],
      searchFormFileds: { "Name": "" },
      searchFormOptions: [[{ title: "类别", required: true, field: "Name", type: "like" }]],
      columns: [
        { field: 'Id', title: 'Id', type: 'int', width: 120, hidden: true, readonly: true, require: true, align: 'left' },
        { field: 'Name', title: 'Name', type: 'string', width: 120, require: true, align: 'left' },
        { field: 'Code', title: 'Code', type: 'string', width: 120, require: true, align: 'left' },
        {
          field: 'IsHidden', title: '是否隐藏', type: 'bool', width: 120, align: 'left', formatter: (row) => {
            if (row.IsHidden)
              return "<div style='color:red;'>是</div>";
            else
              return "<div>否</div>";
          },
        },
        { field: 'Description', title: '描述', type: 'string', width: 120, require: true, align: 'left' },
        { field: 'Creator', title: '创建人', type: 'string', width: 130, hidden: true, require: true, align: 'left' },
        { field: 'CreateDate', title: '创建时间', type: 'datetime', width: 150, readonly: true, require: true, align: 'left', sortable: true },
        { field: 'Sequence', title: '排序', type: 'short', width: 120, hidden: true, readonly: true, require: true, align: 'left' }
      ],
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
