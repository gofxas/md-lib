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
      state.selectedKeys = payload || [];
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
    }
  },
  actions: {
    getValue({ commit }, { id }) {
      if (window.appContext && window.appContext.electron()) {
        appContext.database.findById(id).then((res) => {
          console.log(res.dataValues);
          const { title, content } = res.dataValues;
          commit("setValue", content || "");
          commit("setTitle", title || "");
        });
      }
    },
  },
  getters: {},
};
