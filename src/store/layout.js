let baseContent = `
# 文笥  
一款 Markdown 管理工具  
使用 Vue+Vite+Electron+sqlite开发  
点击 \`左上角图标\` 回到根目录文档（本文档）  

## 开放源代码使用  
UI框架使用  [Naiveui](https://github.com/tusen-ai/naive-ui)  
Markdown编辑器使用 [bytemd](https://github.com/bytedance/bytemd)  
英文字体 [FiraCode](https://github.com/tonsky/FiraCode)  
中文字体 [霞鹜文楷](https://github.com/lxgw/LxgwWenKai)  
`
if (window.appContext && window.appContext.electron()) {
  baseContent = appContext.readme;
}

export default {
  state: () => ({
    routing: false,
    selectedKeys: [1],
    value: ``,
    title: "",
    placement: "bottom-right",
    backup: {
      value: "",
      title: "",
    },
  }),
  mutations: {
    setSelectedKeys(state, payload) {
      state.selectedKeys = payload || [1];
    },
    setValue(state, value) {
      state.value = value;
    },
    setTitle(state, title) {
      state.title = title;
    },
    setPlacement(state, placement) {
      state.placement = placement || "bottom-right";
    },
    setBackup(state) {
      state.backup = { value: state.value, title: state.title };
    },
    getBackup(state) {
      const { value, title } = state.backup;
      state.value = value;
      state.title = title;
    },
  },
  actions: {
    getValue({ commit, dispatch }, { id }) {
      if (window.appContext && window.appContext.electron()) {
        appContext.database.findById(id).then((res) => {
          if (res) {
            const { title, content } = res.dataValues;
            commit("setValue", content || "");
            commit("setTitle", title || "");
          } else {
            dispatch("initDB");
          }
        });
      }
    },
    initDB({dispatch}) {
      if (window.appContext && window.appContext.electron()) {
        window.appContext.database
          .create({ title: "简介", content: baseContent })
          .then((res) => {
            dispatch("getValue", { id: 1 });
          });
      }
    },
  },
  getters: {},
};
