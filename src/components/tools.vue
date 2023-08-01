<template>
  <div class="app-tools">
    <n-input class="art-title" v-if="isEdit" :value="title" :on-input="inputHandler"></n-input>
    <p class="art-title" v-else>{{ title }}</p>
    <n-space>
      <template v-if="isEdit">
        <n-button type="error" @click="deleteHandler" quaternary round>
          <n-icon size="18">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
              <g fill="none">
                <path
                  d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5zM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25z"
                  fill="currentColor"></path>
              </g>
            </svg>
          </n-icon>
          删除
        </n-button>
        <n-button type="primary" @click="saveHandler" quaternary round>
          <n-icon size="18">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
              <g fill="none">
                <path
                  d="M18.5 20a.5.5 0 0 1-.5.5h-5v1c0 .171-.017.338-.05.5H18a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04a.63.63 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138c-.02-.001-.04-.004-.059-.007A.605.605 0 0 0 12.172 2H6a2 2 0 0 0-2 2v7h1.5V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5v10zm-5-15.379L17.378 8.5H14a.5.5 0 0 1-.5-.5V4.621zM5 12h3v2H5v-2zm-2.5 0H4v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V12h.379a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 1 12 14.622V21.5a1.5 1.5 0 0 1-1.5 1.5H10v-5.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0-.5.5V23h-.5A1.5 1.5 0 0 1 1 21.5v-8A1.5 1.5 0 0 1 2.5 12zM9 18v5H4v-5h5z"
                  fill="currentColor"></path>
              </g>
            </svg>
          </n-icon>
          保存
        </n-button>
        <n-button @click="cancelHandler" quaternary round>
          <n-icon size="18">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32">
              <path
                d="M30 24a6 6 0 1 0-6 6a6.007 6.007 0 0 0 6-6zm-2 0a3.952 3.952 0 0 1-.567 2.019l-5.452-5.452A3.953 3.953 0 0 1 24 20a4.005 4.005 0 0 1 4 4zm-8 0a3.952 3.952 0 0 1 .567-2.019l5.452 5.452A3.953 3.953 0 0 1 24 28a4.005 4.005 0 0 1-4-4z"
                fill="currentColor"></path>
              <path d="M8 16h10v2H8z" fill="currentColor"></path>
              <path d="M8 10h12v2H8z" fill="currentColor"></path>
              <path
                d="M14 27.733l-5.234-2.79A8.986 8.986 0 0 1 4 17V4h20v11h2V4a2.002 2.002 0 0 0-2-2H4a2.002 2.002 0 0 0-2 2v13a10.981 10.981 0 0 0 5.824 9.707L14 30z"
                fill="currentColor"></path>
            </svg>
          </n-icon>
          取消
        </n-button>

      </template>
      <n-button v-else type="info" @click="editHandler" quaternary round>
        <n-icon size="18">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20">
            <g fill="none">
              <path
                d="M11.5 8H16v-.586a1.496 1.496 0 0 0-.057-.41L15.942 7a1.5 1.5 0 0 0-.381-.646l-3.915-3.915A1.5 1.5 0 0 0 10.586 2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h2.221l-.013-.026A1.856 1.856 0 0 1 8.003 17H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4v3.5A1.5 1.5 0 0 0 11.5 8zm0-1a.5.5 0 0 1-.5-.5V3.207L14.793 7H11.5zm3.31 2.548a1.87 1.87 0 1 1 2.644 2.645l-4.83 4.829a2.197 2.197 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498c.096-.386.296-.74.578-1.02l4.83-4.83z"
                fill="currentColor"></path>
            </g>
          </svg>
        </n-icon>
        编辑
      </n-button>
    </n-space>
  </div>
</template>
<script>
import { NInput, NSpace, NButton, NIcon } from "naive-ui";
import { mapState, mapMutations } from 'vuex'

export default {
  name: "app-tools",
  components: { NSpace, NButton, NIcon, NInput },
  props: {
    isEdit: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapState('layout', ['title', 'value', 'selectedKeys'])
  },
  methods: {
    ...mapMutations('layout', ['setTitle', 'getBackup','setSelectedKeys']),
    inputHandler(e) {
      this.setTitle(e)
    },
    editHandler() {
      this.$emit("onEdit", true);
    },
    saveHandler() {
      if (window.appContext && window.appContext.electron()) {
        appContext.database.update({
          title: this.title,
          content: this.value,
        }, { id: this.selectedKeys[0] }).then(res => {
          this.$emit("onEdit", false);
        })
      } else {
        this.$emit("onEdit", false);
      }
    },
    cancelHandler() {
      this.getBackup();
      this.$emit("onEdit", false);
    },
    deleteHandler() {
      if (window.appContext && window.appContext.electron()) {
        appContext.database.deleteDoc(this.selectedKeys)
        .then(() => {
          this.setSelectedKeys();
          this.$event.emit('refresh')
        })
      } else {
        this.$event.emit('refresh')
      };
      this.$emit("onEdit", false);
    },
  },
};
</script>
<style lang="less" scoped>
.app-tools {
  padding: 12px;
  border-bottom: 1px solid #d8dee4;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.art-title {
  flex: 1;
  margin-right: 12px;
}
</style>
