export default {
  state: () => {
    return {
      bd_access_token: "",
      bd_refresh_token: "",
      bd_userinfo: {},
      hasPasswd: false,
      passwd_vertied: false,
      user_lock_passwd: "",
      backupAt: null,
    };
  },
  mutations: {
    setState(state, payload) {
      const [key, data] = payload;
      state[key] = data;
    },
  },
  actions: {
    async initConfig({ commit }) {
      if (window.appContext && window.appContext.electron()) {
        const config = await appContext.database.getConfig();
        if (!config) {
          const config_init = await appContext.database.initConfig();
          const { passwd, bd_access_token, bd_refresh_token, backupAt } =
            config_init.dataValues;
          if (passwd) {
            commit("setState", ["hasPasswd", true]);
            commit("setState", ["passwd_vertied", false]);
          } else {
            commit("setState", ["passwd_vertied", true]);
          }
          commit("setState", ["bd_access_token", bd_access_token]);
          commit("setState", ["bd_refresh_token", bd_refresh_token]);
          commit("setState", ["backupAt", backupAt]);
        } else {
          const { passwd, bd_access_token, bd_refresh_token, backupAt } =
            config.dataValues;
          if (passwd) {
            commit("setState", ["hasPasswd", true]);
            commit("setState", ["passwd_vertied", false]);
          } else {
            commit("setState", ["passwd_vertied", true]);
          }
          commit("setState", ["bd_access_token", bd_access_token]);
          commit("setState", ["bd_refresh_token", bd_refresh_token]);
          commit("setState", ["backupAt", backupAt]);
        }
      } else {
        const { passwd, bd_access_token, bd_refresh_token } = {
          passwd: "",
          bd_access_token: "",
          bd_refresh_token: "",
        };
        if (passwd) {
          commit("setState", ["hasPasswd", true]);
        } else {
          commit("setState", ["passwd_vertied", true]);
        }
        commit("setState", ["bd_access_token", bd_access_token]);
        commit("setState", ["bd_refresh_token", bd_refresh_token]);
      }
      return true;
    },
    async getUserinfo({ state, commit }) {
      const { bd_access_token } = state;
      if (bd_access_token) {
        const url = `https://pan.baidu.com/rest/2.0/xpan/nas?access_token=${bd_access_token}&method=uinfo`;
        const response = await fetch(url);
        const res = await response.json();
        const { baidu_name, netdisk_name, avatar_url, vip_type, uk } = res;
        commit("setState", ["bd_userinfo", res]);
      }
    },
  },
};
