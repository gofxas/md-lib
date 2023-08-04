<template>
  <div class="app-wrapper" >
    <div class="app-wrapper-menu">
      <Sider :isEdit="isEdit" @edit="isEdit = true" />
    </div>
    <div class="app-wrapper-content">
      <app-title />
      <Tools @onEdit="editHandler" :isEdit="isEdit" />
      <Editor :isEdit="isEdit" class="editor" />
    </div>
  </div>
  <n-modal v-model:show="passwdModal">
    <VerifyPassword />
  </n-modal>
</template>
<script>
import Editor from "@/components/editor.vue";
import Tools from "@/components/tools.vue";
import AppTitle from "@/components/apptitle.vue";
import Sider from "@/components/sider.vue";
import VerifyPassword from '@/components/verifyPasswd';
import { mapMutations, mapState } from 'vuex';
import { NModal, NAlert } from 'naive-ui';
import { h } from 'vue';

const renderMessage = (props) => {
  const { type } = props
  return h(
    NAlert,
    {
      closable: props.closable,
      onClose: props.onClose,
      type: type === 'loading' ? 'default' : type,
      title: '加密保护已启用',
      style: {
        boxShadow: 'var(--n-box-shadow)',
        maxWidth: 'calc(100vw - 32px)',
        width: '480px'
      }
    },
    {
      default: () => props.content
    }
  )
}

export default {
  name: "home",
  components: { Editor, Tools, Sider, AppTitle, VerifyPassword, NModal },
  data() {
    return {
      isEdit: false,
      passwdModal: false,
      keys: [],
    };
  },
  computed: {
    ...mapState('layout', ['notifed'])
  },
  methods: {
    ...mapMutations('layout', ['setBackup', 'setPlacement', 'setNotifed']),
    editHandler(e) {
      if (e) {
        this.setBackup()
      }
      this.isEdit = e;
    },
    dropFile(e) {
      console.log(e)
      // e.stopPropagation();
    },
  },
  created() {
    this.$event.on('verify', (t = false) => {
      this.passwdModal = t;
    })
    if (!this.notifed) {
      this.setPlacement('top')
      $message.success('访问加密文档需要验证密码', {
        render: renderMessage,
        closable: true,
        duration: 5000,
        keepAliveOnHover: true,
        onAfterLeave: () => {
          this.setPlacement();
          this.setNotifed()
        }
      })
    }
  },
  mounted() {
  }
};
</script>
<style lang="less" scoped>
.app-wrapper {
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

.app-wrapper-content {
  flex: 1;
  display: flex;
  flex-direction: column;

  .editor {
    height: calc(100% - 92px);
  }
}
.app-dropdown {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  background-color: #97979712;
}
</style>
