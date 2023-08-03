<template>
  <div class="app-wrapper">
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
    <VerifyPassword/>
  </n-modal>
</template>
<script>
import Editor from "@/components/editor.vue";
import Tools from "@/components/tools.vue";
import AppTitle from "@/components/apptitle.vue";
import Sider from "@/components/sider.vue";
import VerifyPassword from '@/components/verifyPasswd';
import { mapMutations } from 'vuex';
import { NModal } from 'naive-ui';
export default {
  name: "home",
  components: { Editor, Tools, Sider, AppTitle, VerifyPassword, NModal },
  data() {
    return {
      isEdit: false,
      passwdModal: false,
      keys:[],
    };
  },
  methods: {
    ...mapMutations('layout', ['setBackup']),
    editHandler(e) {
      if (e) {
        this.setBackup()
      }
      this.isEdit = e;
    },
  },
  created() {
    this.$event.on('verify', () => {
      this.passwdModal = true;
        })
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
</style>
