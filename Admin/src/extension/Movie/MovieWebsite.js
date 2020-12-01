 //此处是对表单的方法，组件，权限操作按钮等进行任意扩展(方法扩展可参照SellOrder.js)
 let extension = {
   components: { //动态扩充组件或组件路径
     //表单header、content、footer对应位置扩充的组件
     gridHeader: () => import("@/extension/Movie/movieWebsite/TypeConfig.vue"),
     gridFooter: () => import("@/views/movie/MovieCrawling.vue"),
     //弹出框(修改、编辑、查看)header、content、footer对应位置扩充的组件
     modelHeader: '',
     modelBody: '',
     modelFooter: '',
   },
   buttons: {
     view: [],
     box: [],
     detail: []
   }, //扩展的按钮
   methods: { //事件扩展 
     Crawling(website, type) {
       let _this = this;
       _this.http.get("/api/MovieWebsite/Crawling", {
         movieWebsite: website,
         type: type
       }, "正在初始化配置,请稍后..").then(res => {
         return this.$notify({
           title: '初始化成功',
           message: res.message,
           type: 'success'
         });
       });
     },
     onInit() {
       this.paginationHide = true;
       this.tableHeight = 150;
       let options = {
         field: 'oper',
         title: '关联类别',
         align: 'center',
         type: 'text',
         width: 60,
         //返回一个标签
         formatter: (row) => {
           return '<button type="button" class="ivu-btn ivu-btn-success ivu-btn-ghost">绑定</button>'
         },
         //触发事件,可以在此事件再打开一个弹出框等操作
         click: (row, column, event) => {
           //爬取资源站类别
           this.http.get("/api/MovieType/GetTypesRelation", {
             movieWebsite: row.Id
           }, "正在初始化配置").then(res => {
             console.log(res);
             this.$refs.gridHeader.dialogTypeVisible = true;
             this.$refs.gridHeader.siteMovieTypes = res;
           });
         }
       };
       this.columns.splice(this.columns.length, 0, options);

       this.columns.push({
         title: '采集数据',
         width: 150,
         render: (h, {
           row,
           column,
           index
         }) => {
           return h(
             "div", {
               style: {}
             },
             [
               h(
                 "Button", {
                   props: {
                     type: "warning",
                     ghost: true
                   },
                   on: {
                     click: (e) => {
                       e.stopPropagation();
                       this.Crawling(row.Id, "new");
                     }
                   }
                 },
                 "采集最新"
               ),
               h(
                 "Button", {
                   props: {
                     type: "error",
                     ghost: true
                   },
                   style: {
                     "margin-left": "10px"
                   },
                   on: {
                     click: (e) => {
                       e.stopPropagation();
                       this.Crawling(row.Id, "all");
                     }
                   }
                 },
                 "采集全部"
               )
             ]
           );
         }
       })
     },
   }
 };
 export default extension;
