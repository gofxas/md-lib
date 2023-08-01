export default {
  state: () => ({
    routing: false,
    selectedKeys: [],
    value: ``,
    title: "",
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
  },
  actions: {
    getValue({ commit }, { id }) {
      if (window.appContext && window.appContext.electron()) {
        appContext.database.findById(id).then((res) => {
          console.log(res.dataValues);
          const { title, content } = res.dataValues;
          commit('setValue',(content || ""));
          commit('setTitle',(title || ""));
        });
      }
    },
  },
  getters: {},
};
