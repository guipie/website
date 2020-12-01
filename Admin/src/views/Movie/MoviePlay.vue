<!--
*Author：jxx
 *Contact：283591387@qq.com
 *代码由框架生成,任何更改都可能导致被代码生成器覆盖
 *业务请在@/extension/Movie/MoviePlay.js此处编写
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
import extend from "@/extension/Movie/MoviePlay.js";
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
        cnName: '播放配置',
        name: 'MoviePlay',
        url: "/MoviePlay/",
        sortName: "Id"
      },
      extend: extend,
      editFormFileds: { Name: "", PlayUrl: "", Sequence: 1 },
      editFormOptions: [
        [{ "title": "名称", "required": true, "field": "Name" }],
        [{ "title": "播放页面", "required": true, "field": "PlayUrl", "type": "drop", "dataKey": "player" }],
        [{ "title": "排序", "required": true, "field": "Sequence", type: "number" }]
      ],
      searchFormFileds: {},
      searchFormOptions: [],
      columns: [
        { field: 'Id', title: 'Id', type: 'int', width: 90, hidden: true, readonly: true, require: true, align: 'left' },
        { field: 'Name', title: '名称', type: 'string', width: 120, require: true, align: 'left', sortable: true },
        { field: 'PlayUrl', title: '播放页面', type: 'string', width: 120, require: true, align: 'left', bind: { key: "player", data: [] } },
        { field: 'Sequence', title: '排序', require: true, align: 'left', sortable: true },
        { field: 'CreateDate', title: 'CreateDate', type: 'datetime', width: 90, require: true, align: 'left', sortable: true }
      ],
      detail: {}
    };
  }
};
export default vueParam;
</script>
