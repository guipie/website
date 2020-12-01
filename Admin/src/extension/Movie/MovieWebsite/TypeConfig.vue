<template>
  <div>
    <VolBox
      icon="ios-chatbubbles"
      :model.sync="dialogTypeVisible"
      title="影视类别关联配置"
      :height="400"
      :width="700"
      :padding="15"
    >
      <div>
        <el-row>
          <el-col :span="12" v-for="type in siteMovieTypes" :key="type.name">
            {{ type.siteTypeName }}
            <el-tag v-if="type.typeName" type="success">
              {{ type.typeName }}
            </el-tag>
            <el-button
              type="text"
              @click="
                dialogTypeSelectVisible = true;
                selectedType = type;
                getTypes();
              "
            >
              绑定
            </el-button>
          </el-col>
        </el-row>
      </div>
    </VolBox>
    <el-dialog
      title="匹配本站所有影视类别(抓取匹配需要用到)"
      :visible.sync="dialogTypeSelectVisible"
    >
      {{ selectedType.siteTypeName }}:
      <el-cascader
        ref="cascader"
        :options="currentMovieTypes"
        :props="{ checkStrictly: true, emitPath: false }"
        @change="confirmSiteType"
        clearable
      >
      </el-cascader>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {
    VolBox: () => import("@/components/basic/VolBox.vue"),
  },
  data() {
    return {
      dialogTypeVisible: false,
      dialogTypeSelectVisible: false,
      siteMovieTypes: [],
      currentMovieTypes: [],
      selectedType: {}
    };
  },
  mounted() {
  },
  methods: {
    //获取资源站与本站关联的影视类别
    getTypes() {
      this.http.post("api/MovieType/getPageData", { page: 1, rows: 100 })
        .then(res => {
          let data = res.rows.map(m => {
            return {
              id: m.Id,
              parentId: m.Pid,
              label: m.Name,
              value: m.Id
            }
          });
          this.currentMovieTypes = this.base.convertTree(data);
        });
    },
    confirmSiteType() {
      let selectObj = this.$refs['cascader'].getCheckedNodes()[0];
      this.selectedType.name = this.selectedType.siteTypeName;
      this.selectedType.typeId = selectObj.value;
      console.log(this.selectedType);
      this.http.post("/api/MovieType/MovieWebsiteTypePost", this.selectedType)
        .then(res => {
          this.dialogTypeSelectVisible = false;
          this.$Message.success("绑定成功");
          this.siteMovieTypes.forEach(m => { if (m.siteTypeName == this.selectedType.siteTypeName) m.typeName = selectObj.label });
        });
    }
  }
}
</script>