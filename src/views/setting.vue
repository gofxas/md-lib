<template>
  <div class="app-setting">
    <div class="app-setting-left">
      <img class="app-setting-logo" src="/logo.svg" />
      <h1>设置</h1>
    </div>
    <div class="app-setting-right">
      <n-form>
        <n-form-item label="启用密码?:">
          <n-switch v-model:value="passwordopen" />
        </n-form-item>
        <n-form-item label="密码:">
          <n-input
            type="password"
            show-password-on="mousedown"
            placeholder="密码"
          ></n-input>
        </n-form-item>
        <n-form-item>
          <n-space>
            <n-button type="primary" @click="returnHome">保存设置</n-button>
            <n-button @click="returnHome">返回编辑器</n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script>
import { NInput, NButton, NSwitch, NForm, NFormItem, NSpace } from "naive-ui";

export default {
  name: "Setting",
  components: { NInput, NSwitch, NForm, NFormItem, NButton, NSpace },
  data() {
    return {
      passwordopen: false,
    };
  },
  methods: {
    returnHome() {
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="less" scoped>
.app-setting {
  min-width: 900px;
  width: 100%;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(/bg.png);
  background-color: #fcfaf2;
}
.app-setting-left {
  padding: 24px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .app-setting-logo {
    width: 120px;
    height: 120px;
  }
}
.app-setting-right {
  flex: 2;
  padding: 24px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
}
:deep(.n-form-item-label__text) {
  font-weight: bold;
}
</style>