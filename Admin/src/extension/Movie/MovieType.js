//author:jxx
//此处是对表单的方法，组件，权限操作按钮等进行任意扩展(方法扩展可参照SellOrder.js)
let extension = {
  components: { //动态扩充组件或组件路径
    //表单header、content、footer对应位置扩充的组件
    gridHeader: '', //{ template: "<div>扩展组xx件</div>" },
    gridBody: '',
    gridFooter: '',
    //弹出框(修改、编辑、查看)header、content、footer对应位置扩充的组件
    modelHeader: '',
    modelBody: '',
    modelFooter: ''
  },
  buttons: {
    view: [],
    box: [],
    detail: []
  }, //扩展的按钮
  methods: { //事件扩展
    onInit() {
      this.paginationHide = true;
      this.pagination.size = 100;
      this.columns.forEach(column => {
        //修改颜色
        if (column.field == 'IsHidden') {
          column.formatter = (row) => {
            if (row.IsHidden)
              return '<span style="color: red;">是</span>'
            else
              return "否";
          }
        }
      });
      this.editFormOptions.forEach(x => {
        x.forEach(item => {
          if (item.field == 'Pid') {
            this.http.post("/api/MovieType/getPageData", {
                page: 1,
                rows: 100
              })
              .then(res => {
                let data = res.rows.map(m => {
                  return {
                    id: m.Id,
                    parentId: m.Pid,
                    label: m.Name,
                    value: m.Id
                  }
                });
                item.data = this.base.convertTree(data);
                console.log(item.data)
              })
          }
        })
      })
    },
    searchAfter(v) { //查询ViewGird表数据前,param查询参数
      v.forEach(m => {
        m["parentId"] = m.Pid;
        m["id"] = m.Id;
      });
      let result = this.base.convertTree(v);
      this.$refs.table.rowData = result;
    }
  }
};
export default extension;
