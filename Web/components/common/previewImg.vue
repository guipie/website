<template>
  <el-image-viewer v-if="showPreview" :urlList="previewImages" :on-close="closeViewer"></el-image-viewer>
</template>
<script>
// 可自行去对应目录查看该组件
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  data () {
    return {
      showPreview: false,
      previewImages: []
    };
  },
  components: {
    ElImageViewer
  },
  methods: {
    closeViewer () {
      this.showPreview = false;
    }
  }
};
</script> 
<style>
.el-icon-circle-close {
  color: #f1e6e6;
}
</style>