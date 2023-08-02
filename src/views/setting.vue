<template>
  <Apptitle></Apptitle>
  <div class="app-setting">
    <div class="app-setting-left">
      <img class="app-setting-logo" src="/logo.svg" />
      <h1>设置</h1>
    </div>
    <div class="app-setting-right">
      <div class="bd-disk-info" v-if="bd_userinfo?.uk">
        <img class="bd-avatar" :src="bd_userinfo.avatar_url">
        <p class="bd-info" v-if="bd_userinfo.baidu_name">百度昵称：{{ bd_userinfo.baidu_name }}</p>
        <p class="bd-info" v-if="bd_userinfo.netdisk_name">网盘昵称：{{ bd_userinfo.netdisk_name }}</p>
        <p class="bd-info">VIP等级：{{ bd_userinfo.vip_type }}</p>
      </div>
      <n-form>
        <n-form-item v-if="!bd_userinfo?.uk" label="百度云:">
          <n-button strong secondary type="info" @click="bdmodal = true">授权</n-button>
        </n-form-item>
        <n-form-item v-if="hasPasswd" label="密码:">
          <n-space>
            <n-input type="password" v-model:value="passwd" show-password-on="mousedown" placeholder="密码"></n-input>
            <n-button quaternary type="info" @click="verifyPassword">验证</n-button>
          </n-space>
        </n-form-item>
        <template v-if="passwd_vertied">
          <n-form-item label="新密码:">
            <n-input type="password" v-model:value="npasswd" show-password-on="mousedown" placeholder="密码"></n-input>
          </n-form-item>
          <n-form-item label="确认密码:">
            <n-input type="password" v-model:value="npasswd_repeat" show-password-on="mousedown"
              placeholder="密码"></n-input>
          </n-form-item>
          <n-form-item label="确认修改:">
            <n-button type="primary" @click="savePasswd">保存密码</n-button>
          </n-form-item>
        </template>
        <n-form-item>
          <n-space>
            <!-- <n-button type="primary" @click="returnHome">保存设置</n-button> -->
            <n-button @click="returnHome">返回编辑器</n-button>
          </n-space>
        </n-form-item>
      </n-form>
    </div>
    <n-modal mask-closable=false :on-after-leave="modalLeave" v-model:show="bdmodal">
      <n-card style="width: 400px" title="百度云授权" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <div class="baidu-code">
          <template 
          v-if="!qrcode_url">
          <n-button @click="getUserQr" strong secondary type="success">点击获取二维码</n-button>
          </template>
          <template v-else>
            <img :src="qrcode_url">
            <p>扫码完成绑定</p>
          </template>
        </div>
        <template #footer>
          <n-space justify="end">
            <n-button @click="bdmodal = false">取消</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script>
import { NInput, NCard, NModal, NButton, NSwitch, NForm, NFormItem, NSpace } from "naive-ui";
import { mapState, mapMutations, mapActions } from 'vuex';
import Apptitle from '@/components/apptitle';
export default {
  name: "Setting",
  components: { NInput, NCard, NModal, NSwitch, NForm, NFormItem, NButton, NSpace, Apptitle },
  data() {
    return {
      passwd: '',
      bdmodal: false,
      npasswd: '',
      npasswd_repeat: '',
      qrcode_url: '',
      qrcode_status: false,// 扫码成功
      device_code: '',
      timer:null,
    };
  },
  computed: {
    ...mapState('config', ['bd_access_token', 'hasPasswd', 'passwd_vertied', 'bd_userinfo', 'bd_refresh_token']),
  },
  methods: {
    ...mapMutations('config', ['setState']),
    ...mapActions('config', ['initConfig',"getUserinfo"]),
    returnHome() {
      this.$router.replace("/");
    },
    async verifyPasswd() {
      if (window.appContext && window.appContext.electron()) {
        const res = await appContext.database.verifyPassword(this.passwd);
        this.setState(['passwd_vertied', res])
        if (!res) {
          $message.warning('密码不正确！')
        }
      }
    },
    savePasswd() {
      if (this.npasswd != this.npasswd_repeat) {
        $message.warning("两次输入的密码不一样！")
      }
    },

    async getUserQr() {
      if (window.appContext && window.appContext.electron()) {
        const appKey = appContext.BD_APP_KEY;
        const url = `https://openapi.baidu.com/oauth/2.0/device/code?response_type=device_code&client_id=${appKey}&
scope=basic,netdisk`;
        const response = await fetch(url);
        const res = await response.json();
        const { device_code, user_code, verification_url, qrcode_url, expires_in, interval } = res;
        this.device_code = device_code;
        this.qrcode_url = qrcode_url;
        this.getScanRes(expires_in, interval);
      }
    },

    async getScanRes(expires_in, interval) {
      const expires_time = (new Date()).getTime() + expires_in * 1000;
      this.timer = setInterval(async () => {
        if ((new Date()).getTime() > expires_time) {
          clearInterval(this.timer);
          this.qrcode_url = "";
          this.timer = null;
        }
        const appKey = appContext.BD_APP_KEY;
        const SecretKey = appContext.BD_APP_SECRET_Key;
        const url = `https://openapi.baidu.com/oauth/2.0/token?grant_type=device_token&code=${this.device_code}&client_id=${appKey}&client_secret=${SecretKey}`
        try {
          const response = await fetch(url);
          const res = await response.json();
          const { access_token, refresh_token } = res;
          if (access_token && refresh_token) {
            clearInterval(this.timer);
            this.timer = null;
            this.qrcode_url = "";
            this.qrcode_status = true;
            this.setState(['bd_access_token', access_token])
            this.setState(['bd_refresh_token', refresh_token])
            appContext.database.updateConfig({
              bd_access_token: access_token,
              bd_refresh_token: refresh_token,
            })
          }
        } catch (e) {
          console.log("等待用户操作！")
          console.log(e)
        }
      }, interval * 1000)
    },
    modalLeave() {
      // reset qrstatus qr  qrloop 
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.qrcode_status = false;
      this.qrcode_url = false;
    }
  },
  created() {
    this.initConfig()
    .then(() => {
      // this.getUserinfo()
    })
  }
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
:deep(.n-form-item) {
  width: 220px;
}

:deep(.n-form-item-label__text) {
  font-weight: bold;
}

.baidu-code {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 250px;
    height: 250px;
  }
}
.bd-disk-info {
  margin-bottom: 12px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .bd-avatar {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    margin-bottom: 12px;
  }
  p{
    width: 100%;
  }
}
</style>