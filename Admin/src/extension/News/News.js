let extension = {
  components: { //动态扩充组件或组件路径
    //表单header、content、footer对应位置扩充的组件
    gridHeader: '', //{ template: "<div>扩展组xx件</div>" },
    gridBody: () => import("@/views/website/WebsiteHomeEdit.vue"),
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
    initButton() {
      if (this.currentReadonly) {
        return;
      }
      //添加新建按钮
      this.buttons.splice(2, 1, {
        name: "新增",
        icon: 'md-add',
        value: 'Add',
        type: 'info',
        onClick: function () {
          window.open("/create");
        }
      });
      this.buttons.splice(3, 1, {
        name: "修改",
        icon: 'md-document',
        value: 'Edit',
        type: 'info',
        onClick: function () {
          let rows = this.getSelectRows();
          if (rows.length == 0 || rows.length > 1) {
            return this.$Message.error("请选中一行数据")
          }
          window.open("/create?newsId=" + rows[0].NewsId);
        }
      })
    },
    onInit() {
      this.tableMaxHeight = this.$parent.tableHeight;
      this.initButton();
      let options = {
        field: 'oper',
        title: '',
        type: 'text',
        width: 40,
        //返回一个标签
        formatter: (row) => {
          if (row.VideoUrl)
            return '<span>视频</span>'
          else
            return '<span>图文</span>';
        },
        //触发事件,可以在此事件再打开一个弹出框等操作
        click: (row, column, event) => {
          this.$Message.info("触发事件");
        }
      };
      this.columns.splice(1, 0, options);
      this.columns.forEach(row => {
        if (row.field == "IsRecommend") {
          //强制设置为编辑列，类型为switch
          row.edit = {
            type: "switch",
            keep: true
          };
          //绑定switch切换事件
          let $this = this;
          row.onChange = function (options, row, _columns, status) {
            //在此处可以将数据提到后台处理
            $this.$Message.info(status ? "true" : "false");
          }
        }
      })
    }
  }
};
export default extension;
