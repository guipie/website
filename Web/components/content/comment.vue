<template>
  <div style="margin-top: 60px">
    <el-form ref="commentForm" :model="model">
      <el-form-item
        prop="Coments"
        :rules="[{ required: true, message: '说点什么啊...', trigger: 'blur' }]"
      >
        <el-input
          type="textarea"
          placeholder="说点什么吧..."
          rows="5"
          v-model="model.Coments"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="model.Type">
          <el-radio v-for="t in commentTypes" :key="t.key" :label="t.key">{{
            t.value
          }}</el-radio>
        </el-radio-group>
        <el-button
          type="primary"
          style="float: right"
          @click="onSubmit"
          :loading="commenting"
          >发布</el-button
        >
      </el-form-item>
    </el-form>
    <div class="title">留言板</div>

    <div class="user-item">
      <div v-for="(item, index) in comments" :key="index" class="cell">
        <div class="primary">
          <el-avatar size="medium">{{ index + 1 }}</el-avatar>
          <span class="name">{{ item.Creator }}</span>
          <span class="desc">{{ item.Coments }}</span>
        </div>
        <div class="footer">
          <el-button type="text" class="time" icon="el-icon-time">{{
            DateDiff(item.CreateDate)
          }}</el-button>
          <el-button
            type="text"
            class="right"
            icon="el-icon-chat-square"
            @click="reply(item)"
          >
            回复
            <span>{{ item.ReCount }}</span>
          </el-button>
          <el-button
            @click="Praise(item)"
            type="text"
            class="right"
            icon="el-icon-star-off"
          >
            赞
            <span>{{ item.Praise }}</span>
          </el-button>
        </div>
        <div style="margin-top: 15px" v-if="model.ParentId == item.Id">
          <div class="reclass" v-for="i in reComments" :key="i.Id">
            <span class="reuser">{{ i.Creator }}({{ DateDiff(i.CreateDate) }}) </span>:
            <span class="recomments">{{ i.Coments }}</span>
          </div>
          <el-input :placeholder="rePlaceholder" v-model="model.ReComents">
            <template slot="append">
              <el-button
                type="primary"
                :loading="reCommenting"
                :disabled="!model.ReComents"
                @click="replySubmit(item)"
              >
                回复
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DateDiff } from "@/assets/js/common";
export default {
  props: ["type", "relationId"],
  computed: {
    comments() {
      return this.$store.state.comment.comments.data;
    },
    commentTypes() {
      return this.$store.state.dic.commentType;
    },
  },
  watch: {
    relationId(newVal, oldVal) {
      console.log(newVal, oldVal);
    },
  },
  data() {
    return {
      commenting: false,
      reCommenting: false,
      rePlaceholder: "回复内容",
      reComments: [],
      model: {
        ParentId: "",
        Coments: "",
        ReComents: "",
        Type: "website",
        Creator: "游客",
        CreateDate: new Date().toTimeString(),
      },
    };
  },
  mounted() {
    this.$store.commit("comment/setComments", {});
    if (this.relationId > 0) {
      this.$store.dispatch("comment/fetchRootComments", [
        { name: "Type", value: this.type },
        { name: "RelationId", value: this.relationId },
      ]);
    } else {
      this.$store.dispatch("comment/fetchRootComments", [
        { name: "Type", value: "news" },
        { name: "RelationId", value: this.$route.params.id },
      ]);
    }
  },
  methods: {
    DateDiff(date) {
      return DateDiff(date);
    },
    onSubmit() {
      this.$refs["commentForm"].validate((valid) => {
        if (valid) {
          this.commenting = true;
          this.model.RelationId = this.newsId;
          this.model.type = this.type;
          this.$store
            .dispatch("comment/addComments", this.model)
            .then((m) => {
              this.commenting = false;
              if (m.status) this.model.Coments = "";
            })
            .catch((ex) => {
              this.commenting = false;
              console.log(ex);
            });
        } else return false;
      });
    },
    reply(item) {
      this.reComments = [];
      this.rePlaceholder = "回复@" + item.Creator;
      this.model.ParentId = this.model.ParentId == item.Id ? "" : item.Id;
      if (item.ReCount > 0)
        this.$store.dispatch("comment/fetchReComments", item.Id).then((res) => {
          this.reComments = res.rows;
        });
    },
    replySubmit(item) {
      if (this.model.ReComents) {
        this.ParentId = item.Id;
        this.reCommenting = true;
        this.$store
          .dispatch("comment/addComments", {
            ...this.model,
            ...{ Coments: this.model.ReComents },
          })
          .then((m) => {
            this.reCommenting = false;
            if (m.status) this.model.ReComents = this.model.Coments = "";
          })
          .catch((ex) => {
            this.reCommenting = false;
            console.log(ex);
          });
      } else alert("输入回复..");
    },
    Praise(item) {
      this.$store.dispatch("comment/addCommentsPraise", item.Id);
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 16px;
  padding-bottom: 6px;
  border-bottom: 1px solid #eee;
  margin-bottom: 11px;
}
.cell {
  position: relative;
  padding: 10px 0;
  border-bottom: 1px dotted #eee;
}
.name {
  font-size: 10px;
  color: #8a6767;
}
.desc {
  margin-left: 10px;
  font-size: 14px;
  color: #3c3131;
  position: relative;
  top: 5px;
}
.footer {
  padding-top: 5px;
}
.footer .time {
  color: #d1c8c8;
  padding-bottom: 0;
  font-size: 10px;
}
.footer .right {
  color: #070707;
  float: right;
  font-size: 10px;
}
.reclass {
  padding: 5px;
}
.reclass .reuser {
  font: 10px Extra small;
  padding: 8px;
  color: #ece5e5;
  letter-spacing: 1px;
}
.reclass .recomments {
  font: 12px Extra small;
}
</style>
