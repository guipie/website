<template>
  <div v-if="loading" class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
    error(txt) {
      this.loading = false;
      this.errorTxt = txt || "error";
    },
  },
};
</script>
<style scoped>
.spinner {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 40%;
}
.spinner > div {
  width: 30px;
  height: 30px;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
  animation: bouncedelay 1.4s infinite ease-in-out;
  /* Prevent first frame from flickering when animation starts */
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.spinner .bounce1 {
  background-color: rgb(63, 60, 60);
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  background-color: rgb(37, 35, 35);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.spinner .bounce3 {
  background-color: #000;
}
@-webkit-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
