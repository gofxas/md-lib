<template>
  <Editor
    v-if="isEdit"
    :locale="locales['zh_Hans']"
    :value="value"
    :editorConfig="{
      sidebar: null,
    }"
    :uploadImages="
      (files) => {
        return Promise.all(
          files.map((file) => {
            // TODO:
            return {
              url: 'https://picsum.photos/300',
            };
          })
        );
      }
    "
    :plugins="plugins"
    @change="handleChange"
  />
  <n-scrollbar class="viewer" v-else>
    <Viewer class="markdown-body" :value="value" :plugins="plugins" />
  </n-scrollbar>
</template>
<script>
import { NScrollbar } from "naive-ui";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import { Editor, Viewer } from "@bytemd/vue-next";
import "bytemd/dist/index.css";
// import "github-markdown-css";
import "highlight.js/styles/vs2015.css";
import "katex/dist/katex.css";
import { locales, gfmLocales, mathLocales, mermaidLocales } from "./locals";
const localeKey = "zh_Hans";
const plugins = [
  gfm(),
  breaks(),
  frontmatter(),
  gemoji(),
  gfm({
    locale: gfmLocales[localeKey],
  }),
  highlight(),
  math({
    locale: mathLocales[localeKey],
    katexOptions: { output: "html" }, // https://github.com/KaTeX/KaTeX/issues/2796
  }),
  mediumZoom(),
  mermaid({
    locale: mermaidLocales[localeKey],
  }),
];

export default {
  name: "editor",
  components: { Editor, Viewer, NScrollbar },
  props: {
    isEdit: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      locales,
      value: `# 你好 hello
- [x]  123123  
- [ ]  12312312
- [ ]  asdgas
- [ ]  asgasdaf
- [ ]  gasd
- [ ]  ga
- [ ]  agagggggasd
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
- [ ]  123123123fasdf
`,
      plugins,
    };
  },
  methods: {
    handleChange(v) {
      this.value = v;
    },
  },
};
</script>
<style lang="less">
.bytemd,
.viewer {
  flex: 1;
  height: 100%;
  font-family: "Fira Code", PingFang SC, -apple-system, BlinkMacSystemFont,
    Helvetica Neue, Helvetica, sans-serif !important;
  border: none;
}
.markdown-body,
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  font-family: "Fira Code", "lxgw", PingFang SC, -apple-system,
    BlinkMacSystemFont, Helvetica Neue, Helvetica, sans-serif !important;
}
.markdown-body {
  padding: 24px;
}
.viewer {
  overflow: auto;
}
.bytemd-preview,
.CodeMirror-vscrollbar {
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #d8dee4;
  }
  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: transparent;
  }
}
</style>
