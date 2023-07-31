<template>
  <div class="app-sider">
    <div class="app-sider-head">
      <n-space align="center" justify="space-between">
        <h2 class="drager">
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
      <n-input style="margin-top: 20px" placeholder="搜索">
        <template #suffix>
          <n-icon>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
    <g fill="none">
        <path
            d="M4 6c0-.69.315-1.293.774-1.78c.455-.482 1.079-.883 1.793-1.202C7.996 2.377 9.917 2 12 2c2.083 0 4.004.377 5.433 1.018c.714.32 1.338.72 1.793 1.202c.459.487.774 1.09.774 1.78v6.257a5.496 5.496 0 0 0-1.5-.882V8.392c-.32.22-.68.417-1.067.59C16.004 9.623 14.083 10 12 10c-2.083 0-4.004-.377-5.433-1.018a6.801 6.801 0 0 1-1.067-.59V18c0 .207.09.46.365.75c.279.296.717.596 1.315.864c1.195.535 2.899.886 4.82.886c.24 0 .476-.006.708-.016a5.495 5.495 0 0 0 2.15 1.267c-.89.162-1.856.249-2.858.249c-2.083 0-4.004-.377-5.433-1.017c-.714-.32-1.338-.72-1.793-1.203C4.315 19.293 4 18.69 4 18V6zm1.5 0c0 .207.09.46.365.75c.279.296.717.596 1.315.864c1.195.535 2.899.886 4.82.886c1.921 0 3.625-.35 4.82-.886c.598-.268 1.036-.568 1.315-.864c.275-.29.365-.543.365-.75c0-.207-.09-.46-.365-.75c-.279-.296-.717-.596-1.315-.864C15.625 3.851 13.92 3.5 12 3.5c-1.921 0-3.625.35-4.82.886c-.598.268-1.036.568-1.315.864c-.275.29-.365.543-.365.75zm11 15a4.48 4.48 0 0 0 2.607-.832l2.613 2.612a.75.75 0 1 0 1.06-1.06l-2.612-2.613A4.5 4.5 0 1 0 16.5 21zm0-1.5a3 3 0 1 1 0-6a3 3 0 0 1 0 6z"
            fill="currentColor"></path>
    </g>
</svg>
          </n-icon>
        </template>
      </n-input>
    </div>
    <!--  -->
    <n-tree
      ref="treeInstRef"
      virtual-scroll
      block-line
      :data="data"
      :cancelable="false"
      expand-on-click
      :render-switcher-icon="renderSwitcherIcon"
      :on-update:selected-keys="selectedHandler"
      style="height: calc(100% - 100px)"
    />
  </div>
</template>
<script>
import { NTree, NSpace, NButton, NIcon, NInput } from "naive-ui";
import { repeat } from "seemly";
import { h } from "vue";
import { ChevronRight16Regular  } from '@vicons/fluent'
function createData(level = 4, baseKey = "") {
  if (!level) return void 0;
  return repeat(10 - level, void 0).map((_, index) => {
    const key = "" + baseKey + level + index;
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key),
    };
  });
}

function createLabel(level) {
  if (level === 4) return "道生一";
  if (level === 3) return "一生二";
  if (level === 2) return "二生三";
  if (level === 1) return "三生万物三生万物三生万物三生万物三生万物";
  return "";
}
export default {
  name: "app-sider",
  components: {
    NTree,
    NSpace,
    NButton,
    NIcon,
    NInput
  },
  data() {
    return {
      data: createData(),
      renderSwitcherIcon: ({ expanded }) => h(NIcon, null, {
        default: () => h(ChevronRight16Regular)
      }),
    };
  },
  methods:{
    selectedHandler(keys,option,meta) {
      if (meta.action === 'select'){
        console.log(keys,option,meta)
      }
    }
  }
};
</script>
<style lang="less" scoped>
.app-sider {
  width: 320px;
  padding: 12px;
  height: 100%;
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
.app-sider-head {
  height: 100px;
}
.drager {
  -webkit-app-region: drag;
  flex: 1;
  width: 100px;
  user-select: none;
}
</style>
