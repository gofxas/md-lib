<template>
  <div :class="['app-sider', expand ? '' : 'app-sider-mini']">
    <template v-if="expand">
      <div class="app-sider-head">
        <n-space align="center" justify="space-between">
          <h2 class="drager">
            <n-icon @click="homeMD" size="20" style="margin-right: 12px;cursor: pointer;"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.49 100">
                <g>
                  <g>
                    <path fill="#02035e"
                      d="M84.94 62.54l-28.2-12.38-28.19 12.38L0 75.08 56.74 100l56.74-24.92-28.54-12.54z" />
                    <path fill="#00b0d8" opacity=".8"
                      d="M84.94 37.46l-28.2-12.38-28.19 12.38L0 50l28.55 12.54 28.19 12.38 28.2-12.38L113.48 50 84.94 37.46z" />
                    <path fill="#00b0d8" opacity=".5"
                      d="M56.74 0L0 24.92l28.55 12.54 28.19 12.38 28.2-12.38 28.54-12.54L56.74 0z" />
                  </g>
                </g>
              </svg></n-icon>
            <span>文笥</span>
          </h2>
          <n-space>
            <n-button @click="handleRootDoc" quaternary circle><n-icon size="18"><svg xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"></path>
                </svg></n-icon></n-button>
            <n-button @click="setting" quaternary circle><n-icon size="18">
                <Settings20Filled />
              </n-icon></n-button>
          </n-space>
        </n-space>
        <n-input :disabled="data.length === 0" :title="data.length === 0 ? '请先添加文档' : ''" style="margin-top: 20px"
          placeholder="搜索">
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
      <template v-if="data.length">
        <n-tree ref="treeInstRef" virtual-scroll block-line :data="data" key-field="id" label-field="title"
          :default-selected-keys="selectedKeys" :selected-keys="selectedKeys" :cancelable="false" :expand-on-click="true"
          :render-label="renderLabel" :render-switcher-icon="renderSwitcherIcon"
          :on-update:selected-keys="selectedHandler" :on-update:expanded-keys="updatePrefixWithExpaned"
          style="height: calc(100% - 100px)" />
      </template>
      <template v-else>
        <div class="no-data-tree" style="height: calc(100% - 100px)">
          <n-icon size="24" color="#b5aa90">
            <StarEmphasis24Regular />
          </n-icon>
          <p style="color:#b5aa90">请先添加文档</p>
          <n-button @click="handleRootDoc" style="width: 100%;margin-top: 24px;">
            <n-icon size="18">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"></path>
              </svg>
            </n-icon>
            立即创建
          </n-button>
        </div>
      </template>
    </template>
    <!-- <n-icon class="arrow-side" size="24" @click="expand = !expand"><ChevronRight16Regular/></n-icon> -->
  </div>
  <n-modal v-model:show="showModal">
    <n-card style="width: 600px" title="添加文档" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-input autofocus v-model:value="docname" type="text" placeholder="基本的 Input" />
      <template #footer>
        <n-space justify="end">
          <n-button type="primary" @click="createNew">创建</n-button>
          <n-button @click="cancelCreate">取消</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
  <n-dropdown size="small" placement="bottom-start" trigger="manual" :x="dropdownOpt.x" :y="dropdownOpt.y"
    :options="options" :show="dropdownOpt.show" :on-clickoutside="onClickoutside" @select="handleDropdownSelect" />
</template>
<script>
import { NDropdown, NAlert, NModal, NCard, NTree, NSpace, NButton, NIcon, NInput } from "naive-ui";
import { h } from "vue";
import { ChevronRight16Regular, Settings20Filled, StarEmphasis24Regular, Folder20Regular, FolderOpen20Regular, LockClosed16Regular, LockOpen16Regular } from '@vicons/fluent'
import TreeItem from '@/components/treeitem';
import DropdownItem from '@/components/dropdownitem';
import { mapState, mapMutations } from 'vuex'

export default {
  name: "app-sider",
  components: {
    NModal,
    NCard,
    NTree,
    NSpace,
    NButton,
    NIcon,
    NInput,
    ChevronRight16Regular,
    StarEmphasis24Regular,
    Settings20Filled,
    TreeItem,
    NDropdown
  },
  props: {
    isEdit: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      expand: true,
      // 下拉菜单条目
      options: [
        { label: () => h(DropdownItem, { label: "查看", type: "primary" }), key: 'view', },
        { label: () => h(DropdownItem, { label: "编辑", type: "info" }), key: 'edit', },
        { label: () => h(DropdownItem, { label: "新增", type: "default" }), key: 'add', },
        { label: () => h(DropdownItem, { label: "删除", type: "error" }), key: 'del', },
      ],
      // 下拉菜单位置配置
      dropdownOpt: {
        show: false,
        x: 0,
        y: 0
      },
      rightClickOption: {},
      // 菜单数据
      data: [],

      showModal: false,
      docname: '新的文档',
      renderLabel: ({ option }) => h(TreeItem, {
        option,
        onSetmenu: this.handleContextMenu
      }),
      renderSwitcherIcon: ({ expanded }) => h(NIcon, null, {
        default: () => h(ChevronRight16Regular)
      }),
      updatePrefixWithExpaned: (_keys, _option, meta) => {
        if (!meta.node)
          return;
        switch (meta.action) {
          case "expand":
            meta.node.prefix = () => h(NIcon, null, {
              default: () => h(FolderOpen20Regular)
            });
            break;
          case "collapse":
            meta.node.prefix = () => h(NIcon, null, {
              default: () => h(Folder20Regular)
            });
            break;
        }
      }
    };
  },
  computed: {
    ...mapState('layout', ['selectedKeys'])
  },
  methods: {
    ...mapMutations('layout', ['setSelectedKeys', 'setPlacement']),
    homeMD() {
      if (this.isEdit) {
        window.$message.info(
          "文档正在编辑 并未保存！",
          {
            keepAliveOnHover: true
          }
        )
        return;
      }
      this.setSelectedKeys([1]);
      this.rightClickOption = {};
    },
    createNew() {
      if (window.appContext && window.appContext.electron()) {
        window.appContext.database
          .create({ title: this.docname, pid: this.rightClickOption?.id || 1 })
          .then(res => {
            this.initTreeData();
            this.cancelCreate();
          })
      }
    },
    handleRootDoc() {
      this.showModal = true;
      this.rightClickOption = {};
    },
    onClickoutside() {
      this.dropdownOpt.show = false
    },
    handleDropdownSelect(key) {
      // $message.info(String(key));
      switch (key) {
        case 'view':
          if (this.isEdit) {
            window.$message.info(
              "文档正在编辑 并未保存！",
              {
                keepAliveOnHover: true
              }
            )
          } else {
            this.selectedKeys = this.setSelectedKeys([this.rightClickOption.id])
          }
          break;
        case 'edit':
          if (this.isEdit) {
            window.$message.info(
              "文档正在编辑 并未保存！",
              {
                keepAliveOnHover: true
              }
            )
          } else {
            this.selectedKeys = this.setSelectedKeys([this.rightClickOption.id])
            this.$emit('edit', true)
          }
          break;
        case 'add':
          if (this.isEdit) {
            window.$message.info(
              "文档正在编辑 并未保存！",
              {
                keepAliveOnHover: true
              }
            )
          } else {
            this.selectedKeys = this.setSelectedKeys([this.rightClickOption.id]);
            this.showModal = true
          }
          break;
        case 'del':
          const ids = this.flatTree(this.rightClickOption);
          const confirm = window.confirm('删除将会把文档和文档子集全部删除，无法恢复。');

          if (confirm && window.appContext && window.appContext.electron()) {
            appContext.database.deleteDoc(ids).then(() => {
              this.initTreeData();
              this.setSelectedKeys([1]);
              this.rightClickOption = {};
            })
          }
          break;
      }
      this.onClickoutside()
    },
    handleContextMenu(options) {
      const { x, y, option } = options;
      this.rightClickOption = option;
      this.dropdownOpt = {
        show: true,
        x,
        y
      }
    },
    cancelCreate() {
      this.docname = "新的文档"
      this.showModal = false
    },
    selectedHandler(keys, option, meta) {
      if (meta.action === 'select' && !this.isEdit) {
        this.selectedKeys = this.setSelectedKeys(keys);
        this.rightClickOption = option[0];
      }
      // 编辑状态？
      if (this.isEdit) {
        window.$message.info(
          "文档正在编辑 并未保存！",
          {
            keepAliveOnHover: true
          }
        )
      }
    },
    // electron init tree
    initTreeData() {
      if (window.appContext && window.appContext.electron()) {
        window.appContext.database
          .findAndCountAll({})
          .then((res) => {
            const list = res.rows.map(item => ({
              ...item,
              prefix: () => h(NIcon, null, {
                default: () => h(Folder20Regular)
              })
            }))
            const treeList = this.convert(list);
            console.log(treeList)
            this.data = treeList;
          });
      } else {
        this.data = [
          {
            "id": 2,
            "pid": 1,
            "title": "我的文档0",
            "locked": null,
            isLeaf: false,
            prefix: () => h(NIcon, null, {
              default: () => h(Folder20Regular)
            }),
            "createdAt": "2023-07-31T07:46:14.285Z",
            "updatedAt": "2023-07-31T07:46:14.285Z"
          },
          {
            "id": 3,
            "pid": 1,
            "title": "我的文档1",
            "locked": null,
            isLeaf: false,
            prefix: () => h(NIcon, null, {
              default: () => h(Folder20Regular)
            }),
            "createdAt": "2023-07-31T07:46:14.286Z",
            "updatedAt": "2023-07-31T07:46:14.286Z"
          },
          {
            "id": 4,
            "pid": 1,
            "title": "我的文档2",
            "locked": null,
            isLeaf: false,
            prefix: () => h(NIcon, null, {
              default: () => h(Folder20Regular)
            }),
            "createdAt": "2023-07-31T07:46:14.286Z",
            "updatedAt": "2023-07-31T07:46:14.286Z"
          },
          {
            "id": 5,
            "pid": 1,
            "title": "我的文档3",
            "locked": null,
            isLeaf: false,
            prefix: () => h(NIcon, null, {
              default: () => h(Folder20Regular)
            }),
            "createdAt": "2023-07-31T07:46:14.286Z",
            "updatedAt": "2023-07-31T07:46:14.286Z"
          },
          {
            "id": 6,
            "pid": 1,
            "title": "我的文档4",
            "locked": null,
            isLeaf: false,
            prefix: () => h(NIcon, null, {
              default: () => h(Folder20Regular)
            }),
            "createdAt": "2023-07-31T07:46:14.286Z",
            "updatedAt": "2023-07-31T07:46:14.286Z"
          },
          {
            "id": 7,
            "pid": 1,
            "title": "我的文档5",
            "locked": null,
            isLeaf: false,
            prefix: () => h(NIcon, null, {
              default: () => h(Folder20Regular)
            }),
            "createdAt": "2023-07-31T07:46:14.287Z",
            "updatedAt": "2023-07-31T07:46:14.287Z"
          },
          {
            "id": 8,
            "pid": 1,
            "title": "我的文档6",
            "locked": null,
            isLeaf: false,
            prefix: () => h(NIcon, null, {
              default: () => h(Folder20Regular)
            }),
            "createdAt": "2023-07-31T07:46:14.287Z",
            "updatedAt": "2023-07-31T07:46:14.287Z"
          },
          {
            "id": 9,
            "pid": 1,
            "title": "我的文档7",
            "locked": null,
            isLeaf: false,
            prefix: () => h(NIcon, null, {
              default: () => h(Folder20Regular)
            }),
            "createdAt": "2023-07-31T07:46:14.287Z",
            "updatedAt": "2023-07-31T07:46:14.287Z"
          },
          {
            "id": 10,
            "pid": 1,
            "title": "我的文档8",
            "locked": null,
            isLeaf: false,
            prefix: () => h(NIcon, null, {
              default: () => h(Folder20Regular)
            }),
            "createdAt": "2023-07-31T07:46:14.287Z",
            "updatedAt": "2023-07-31T07:46:14.287Z"
          },
          {
            "id": 11,
            "pid": 1,
            "title": "我的文档9",
            "locked": null,
            isLeaf: false,
            prefix: () => h(NIcon, null, {
              default: () => h(Folder20Regular)
            }),
            "createdAt": "2023-07-31T07:46:14.288Z",
            "updatedAt": "2023-07-31T07:46:14.288Z"
          }
        ]
      }
    },
    // 转化数组成 tree 结构
    convert(list) {
      const res = [];
      const map = list.reduce((res, v) => (
        res[v.id] = v, v
          .prefix = () => h(NIcon, null, {
            default: () => h(Folder20Regular)
          }),
        v.suffix = () => h(NIcon, null, { default: () => v.locked ? h(LockClosed16Regular) : '' }),
        v.children = [], res), {})
      for (const item of list) {
        if (item.pid === 1) {
          res.push(item);
          continue
        }
        if (item.pid in map) {
          const parent = map[item.pid]
          parent.children = parent.children || [];
          parent.children.push(item)
        } else {
          item.isLeaf = true
        }
      }
      return res;
    },
    // 获取节点下面的 所有的id 
    flatTree(obj) {
      const ids = [];
      const loop = (obj) => {
        if (obj.id) { ids.push(obj.id) };
        if (obj.children && obj.children.length) {
          for (let i = 0; i < obj.children.length; i++) {
            loop(obj.children[i])
          }
        }
      };
      loop(obj)
      return ids;
    },
    setting() {
      this.$router.replace('/setting')
    }
  },
  created() {
    this.initTreeData();
    this.$event.on('refresh', () => {
      console.log('refresh');
      this.rightClickOption = {}
      this.initTreeData()
    })
  }
};
</script>
<style lang="less" scoped>
.app-sider {
  width: 320px;
  padding: 12px;
  height: 100%;
  position: relative;
  transition: .3s;
  user-select: none;
  &.app-sider-mini {
    width: 0;
    padding: 12px 0;

    .arrow-side {
      transform: rotate(0deg);
      right: -24px;
    }
  }

  .arrow-side {
    position: absolute;
    right: 0px;
    bottom: 200px;
    transform: rotate(180deg);
    cursor: pointer;
    z-index: 1;
  }

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
  width: 100px;
  user-select: none;
  display: flex;
  align-items: center;

  span {
    flex: 1;
    -webkit-app-region: drag;
  }
}

.no-data-tree {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}

:deep(.n-tree) {
  .n-tree-node-wrapper {
    padding: 0;
  }

  .n-tree-node {
    align-items: center;
  }
}</style>
