 <template>
  <div>
    <view-grid
      :columns="columns"
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
import extend from "@/extension/News/News.js";
import ViewGrid from "@/components/basic/ViewGrid.vue";
var vueParam = {
  components: {
    ViewGrid
  },
  props: ["tableHeight"],
  created() {
  },
  data() {
    return {
      propTableHeight: 0,
      table: {
        key: "NewsId",
        footer: "Foots",
        cnName: "资讯管理",
        name: "News",
        url: "/News/",
        sortName: "Id",
      },
      extend: extend,
      editFormFileds: {},
      editFormOptions: [],
      searchFormFileds: { "Title": "", "IsRecommend": "" },
      searchFormOptions: [[{ "title": "标题关键字", "field": "Title", type: "like" },
      { "dataKey": "enable", "title": "是否推荐", "field": "IsRecommend", "type": "drop" }
      ]],
      columns: [
        { field: "NewsId", title: "Id", type: "int", width: 120, hidden: true, readonly: true, require: true, align: "left", },
        { field: "Title", title: "标题", type: "string", width: 200, require: true, align: "left", },
        { field: "CoverImageUrls", title: "封面地址", type: "img", width: 100, align: "left", },
        {
          field: "IsRecommend", title: "首页推荐", type: "bool", width: 40, require: true,
          bind: {
            data: [
              { key: true, value: "推荐" },
              { key: false, value: "不推荐" },
            ],
          },
          onChange: function (options, row, _columns, status) {
            //在此处可以将数据提到后台处理
            $this.$Message.info(status ? "true" : "false");
          }
        },
        { field: "ViewCount", title: "浏览次数", type: "int", width: 80, align: "center", },
        { field: "Creator", title: "作者", type: "int", width: 120, hidden: true, align: "left", },
        { field: "CreateDate", title: "创建时间", type: "datetime", width: 120, align: "left", sortable: true, },
      ]
    };
  },
};
export default vueParam;
</script>
