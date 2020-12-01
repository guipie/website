<!--
*Author：jxx
 *Contact：283591387@qq.com
 *代码由框架生成,任何更改都可能导致被代码生成器覆盖
 *业务请在@/extension/Website/WebsiteHomeConfig.js此处编写
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
    <el-dialog
      fullscreen
      append-to-body
      :title="editFormFileds.MappingType + '首页轮播配置'"
      :visible.sync="bannerVisible"
    >
      <news
        ref="newsBanner"
        :tableHeight="600"
        v-if="editFormFileds.MappingType == '资讯'"
      ></news>
      <movies
        ref="moviesBanner"
        :tableHeight="600"
        v-if="editFormFileds.MappingType == '影视'"
      ></movies>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bannerVisible = false">取 消</el-button>
        <el-button type="danger" @click="confirmNews">确 定 选 择</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import extend from "@/extension/Website/WebsiteHomeConfig.js";
import ViewGrid from "@/components/basic/ViewGrid.vue";
import news from "@/views/News/News.vue"
import movies from "@/views/movie/movie.vue"
var vueParam = {
  components: {
    ViewGrid, news, movies
  },
  mounted() {
  },
  methods: {
    confirmNews() {
      if (this.editFormFileds.MappingType == "资讯") {
        const selectRow = this.$refs.newsBanner.$children[0].$refs.table.getSelected();
        if (selectRow.length != 1)
          return this.$message.warning("请选择一条资讯进行配置");
        this.editFormFileds.Title = selectRow[0].Title;
        this.editFormFileds.MappingId = selectRow[0].NewsId;
        this.bannerVisible = false;
      }
      if (this.editFormFileds.MappingType == "影视") {
        const selectRow = this.$refs.moviesBanner.$children[0].$refs.table.getSelected();
        if (selectRow.length != 1)
          return this.$message.warning("请选择一条影视进行配置");
        this.editFormFileds.Title = selectRow[0].Name;
        this.editFormFileds.MappingId = selectRow[0].Id;
        this.bannerVisible = false;
      }
    }
  },
  data() {
    return {
      bannerVisible: false,
      table: {
        key: 'Id',
        footer: "Foots",
        cnName: '首页轮播配置',
        name: 'WebsiteHomeConfig',
        url: "/WebsiteHomeConfig/",
        sortName: "Id"
      },
      extend: extend,
      editFormFileds: { MappingType: "资讯", Title: "", BannerImg: "", BannerImg: "" },
      editFormOptions: [
        [{ "title": "类别", "required": true, "field": "MappingType", type: "select", data: [{ key: '资讯', value: '资讯' }, { key: '影视', value: '影视' }] }],
        [{ "title": "内容选择", "required": true, "field": "Title", "disabled": true }],
        [{ "title": "轮播图", "required": true, "field": "BannerImg", type: "img", maxSize: 20, url: "/api/WebsiteHomeConfig/Upload" }],
        [{ "title": "简介文案", "field": "Description", type: "textarea" }],
      ],
      searchFormFileds: {},
      searchFormOptions: [],
      columns: [{ field: 'Id', title: 'Id', type: 'int', width: 90, hidden: true, readonly: true, require: true, align: 'left' },
      { field: 'MappingType', title: '类别', type: 'string', width: 45, require: true, align: 'center', sortable: true },
      { field: 'Title', title: '内容', type: 'string', width: 150, require: true, align: 'left' },
      { field: 'MappingId', title: '内容ID', type: 'int', width: 50, require: true, align: 'center' },
      { field: 'Description', title: '简介文案', type: 'string', width: 120, align: 'left' },
      { field: 'BannerImg', title: '轮播图', type: 'img', require: true, align: 'left' },
      { field: 'CreateDate', title: '配置时间', type: 'datetime', width: 90, require: true, align: 'left', sortable: true }],
      detail: {}
    };
  }
};
export default vueParam;
</script>
