<template>
  <div class="app-title">
    <div class="app-title-drager"></div>
    <div class="app-title-controller">
      <div class="app-btn" @click="minimize">
        <img src="@/assets/icon/reduce.svg" />
      </div>
      <div class="app-btn" @click="close">
        <img src="@/assets/icon/close.svg" />
      </div>
    </div>
  </div>
</template>
<script>
import { NTree, NSpace, NButton, NIcon, NInput } from "naive-ui";
export default {
  data() {
    return {};
  },
  components: {
    NTree,
    NSpace,
    NButton,
    NIcon,
    NInput,
  },
  methods:{
    minimize() {
      appContext.ipc.send("minimize");
    },
    close() {
      appContext.ipc.send("close");
    },
  }
};
</script>
<style lang="less" scoped>
.app-title {
  height: 32px;
  display: flex;
  // z-index: 1;
  position: relative;
  user-select: none;
}
.app-title-drager {
  flex: 1;
  -webkit-app-region: drag;
  cursor: pointer;
}
.app-title-controller {
  display: flex;
}
.app-btn {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f2f3f4;
  }
  img {
    width: 18px;
    height: 18px;
  }
}
</style>
