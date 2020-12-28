const thisFunc = {
  GetTagsByKey (key, vm) {
    if (key !== "")
    {
      vm.http.get("api/newstag/getByKey?value=" + key.toLowerCase()).then((data) => {
        vm.loading = false;
        vm.tags = data.filter((item) => {
          return item.value.toLowerCase().indexOf(key.toLowerCase()) > -1;
        });
      });
    } else
    {
      vm.tags = [];
    }
  },
  Add (vm) {
    vm.formFileds.CoverImageUrls = (vm.seletedCovers || []).map((m) => m.path).toString();
    console.log(vm.formFileds);
    vm.http.post(`api/news/${vm.formFileds.NewsId > 0 ? 'update' : 'add'}`, {
      MainData: vm.formFileds,
      DetailData: vm.formFileds.NewsTypes.map((m) => {
        return {
          TypeId: m,
          NewsId: vm.formFileds.NewsId
        };
      }),
      Extra: vm.formFileds.Tags.toString()
    }, "正在保存中,请稍后..").then((data) => {
      if (data.status)
      {
        vm.$notify.success({
          title: '发布提示,[5秒后关闭.]',
          message: data.message,
          showClose: false
        });
        setTimeout(() => {
          window.close();
        }, 5000);
      } else
        vm.$Message["warning"]({
          background: true,
          content: data.message
        });
    });
  }
}
export default thisFunc;
