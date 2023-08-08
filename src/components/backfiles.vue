<template >
    <div class="back-files">
        <div class="back-file-item">
            <div class="back-file-item_left">
                <span class="file-name">备份数据库 20230808</span>
                <span class="file-time">2023-08-08</span>
            </div>
            <n-space>
                <n-button quaternary circle type="success">
                    <n-icon size="18">
                        <ArrowSyncCircle20Regular />
                    </n-icon>
                </n-button>
                <n-popconfirm 
                positive-text="删除" 
                negative-text="取消"
                :positive-button-props="{
                    type:'error'
                }"
                >
                    <template #trigger>
                        <n-button quaternary circle type="error">
                            <n-icon size="18">
                                <Delete20Regular />
                            </n-icon>
                        </n-button>
                    </template>
                    不充钱怎么变强？
                </n-popconfirm>
            </n-space>
        </div>
    </div>
</template>
<script>
import { NIcon, NButton, NSpace, NPopconfirm } from 'naive-ui'
import { ArrowSyncCircle20Regular, Delete20Regular } from '@vicons/fluent'
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'back-files',
    components: { NIcon, NButton, NSpace, NPopconfirm, ArrowSyncCircle20Regular, Delete20Regular },
    data() {
        return {
            FileList: [],
        }
    },
    computed:{
        ...mapState('config',['bd_access_token'])
    },
    methods:{
        async getBackfiles() {
            if (this.bd_access_token) {
                const url = `https://pan.baidu.com/rest/2.0/xpan/file?method=list&access_token=${this.bd_access_token}&dir=${encodeURIComponent('/apps/文笥/')}`
                const response = await fetch(url);
                const res = await response.json();
                if (res.code == 0) {
                    this.FileList = res.list;
                }else if(res.code == -7) {
                    alert('无权访问')
                }
                else if (res.code == -9) {
                    console.log('目录不存在!');
                }
            }
        },
        async initBackDir() {
            if (this.bd_access_token) {
                const url = `https://pan.baidu.com/rest/2.0/xpan/file?method=create&access_token=${this.bd_access_token}&path=${encodeURIComponent('/apps/文笥/')}&isdir=1`;
                const response = await fetch(url);
                const res = await response.json();
            }
        }
    },
    created() {

    }
}
</script>
<style lang="less" scoped>
.back-files {}

.back-file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    cursor: pointer;
    transition: .5s background-color;
    border-radius: 5px;
    &:hover {
        background-color: #f2f3f4;
    }
    &_left {
        display: flex;
        flex-direction: column;
    }
    .file-name {
        font-weight: bold;
    }
    .file-time {
        font-size: 13px;
        color: #a5a5a5;
    }
}
</style>