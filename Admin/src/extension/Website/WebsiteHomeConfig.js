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
      let $this = this;
      $this.editFormOptions[1][1] = {
        colSize: 6,
        render: h => {
          return h(
            "Button", {
              props: {
                type: "warning"
              },
              on: {
                click: () => {
                  if ($this.$parent.editFormFileds.MappingType)
                    $this.$parent.bannerVisible = true;
                  else
                    return $this.$message.warning("请先选择轮播类别");
                }
              }
            },
            "选择"
          );
        }
      }
    }
  }
};
export default extension;
