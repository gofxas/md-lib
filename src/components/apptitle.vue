<template>
  <div class="app-title">
    <div class="app-title-func">
        <n-space align="center" justify="space-between">
        <h2>
          <n-icon size="20"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.49 100">
    <g>
        <g>
            <path fill="#02035e" d="M84.94 62.54l-28.2-12.38-28.19 12.38L0 75.08 56.74 100l56.74-24.92-28.54-12.54z" />
            <path fill="#00b0d8" opacity=".8"
                d="M84.94 37.46l-28.2-12.38-28.19 12.38L0 50l28.55 12.54 28.19 12.38 28.2-12.38L113.48 50 84.94 37.46z" />
            <path fill="#00b0d8" opacity=".5"
                d="M56.74 0L0 24.92l28.55 12.54 28.19 12.38 28.2-12.38 28.54-12.54L56.74 0z" />
        </g>
    </g>
</svg></n-icon>
          文笥
        </h2>
        <n-button quaternary circle
          ><n-icon size="18"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"></path>
</svg></n-icon
        ></n-button>
      </n-space>
    </div>
    <div class="app-title-drager">

    </div>
  </div>
</template>
<script>
import { NTree, NSpace, NButton, NIcon, NInput } from "naive-ui";

export default {
    components: {
        NTree,
        NSpace,
        NButton,
        NIcon,
        NInput
    },
};
</script>
<style lang="less" scoped>
.app-title {
    height: 60px;
    display: flex;
}
.app-title-func {
    width: 320px;
    padding: 12px;
    position: relative;
    &::after {
        width: 1px;
        height: 100%;
        background-color: #d8dee4;
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top: 0;
    }
}
.app-title-drager {
    flex: 1;
    -webkit-app-region: drag;
    cursor: pointer;
}
</style>
