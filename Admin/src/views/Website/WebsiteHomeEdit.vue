<template>
  <div>
    <vol-box
      ref="bannerBox"
      :model.sync="model"
      :height="300"
      :width="500"
      :padding="15"
      title="首页轮播设置"
    >
      <div slot="content">
        <vol-form
          ref="addForm"
          :formRules="addOptions"
          :formFileds="addFileds"
        ></vol-form>
      </div>
      <div slot="footer">
        <Button type="success" @click="submitSetting" icon="md-checkmark-circle"
          >确定设置</Button
        >
      </div>
    </vol-box>
  </div>
</template>
<script>

import VolForm from "@/components/basic/VolForm.vue";
export default {
  components: {
    VolForm,
    VolBox: () => import("@/components/basic/VolBox.vue"),
  },
  data() {
    return {
      model: false,
      addFileds: { Title: "", BannerImgTemp: "" },
      addOptions: [
        [{ title: "标题", required: true, field: "Title", type: "text", disabled: true }],
        [{ title: "轮播图", required: true, field: "BannerImgTemp", type: "img", maxSize: 20, url: "/api/WebsiteHomeConfig/Upload" }],
        [{ title: "轮播描述", field: "Description", type: "text" }],
      ]
    }
  },
  mounted() {

  },
  methods: {
    submitSetting() {
      if (this.addFileds.BannerImgTemp.length != 1)
        return this.$Message.warning("请上传一张banner图");
      this.addFileds.BannerImg = this.addFileds.BannerImgTemp.map(m => m.path).toString();
      console.log(this.addFileds);
      this.http.post("/AppApi/WebsiteHomeConfig/Add", { mainData: this.addFileds }).then(res => {
        console.log(res);
        this.$Message.success(res.message);
        this.model = false;
      });
    }
  }
}
</script>