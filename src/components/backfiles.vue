<template >
    <div class="back-files">
        <div v-if="FileList.length == 0" class="back-files-nodata">
            <n-button @click="backupNow" type="primary">创建备份</n-button>
        </div>
        <div class="back-file-item" v-for="file in FileList" :key="file.fs_id">
            <div class="back-file-item_left">
                <span class="file-name">上一次的备份</span>
                <span class="file-time">{{ (new Date(file.server_mtime * 1000)).toLocaleString() }}</span>
            </div>
            <n-space>
                <n-button @click="syncDB" quaternary circle type="success">
                    <n-icon size="18">
                        <ArrowSyncCircle20Regular />
                    </n-icon>
                </n-button>
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
            isNeedDir: false
        }
    },
    computed: {
        ...mapState('config', ['bd_access_token', 'backupAt'])
    },
    methods: {
        ...mapMutations('config', ['setState']),
        async getBackfiles() {
            if (this.bd_access_token) {
                const url = `https://pan.baidu.com/rest/2.0/xpan/file?method=list&access_token=${this.bd_access_token}&dir=${encodeURIComponent('/apps/文笥/')}`
                const response = await fetch(url);
                const res = await response.json();
                if (res.errno == 0) {
                    this.FileList = res.list;
                } else if (res.errno == -7) {
                    alert('无权访问')
                }
                else if (res.errno == -9) {
                    console.log('目录不存在!');
                    this.isNeedDir = true;
                }
            }
        },
        async initBackDir() {
            if (this.bd_access_token) {
                const url = `https://pan.baidu.com/rest/2.0/xpan/file?method=create&access_token=${this.bd_access_token}`;
                const response = await fetch(url, {
                    body: `path=${encodeURI('/apps/文笥')}&isdir=1`,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST"
                });
                const res = await response.json();
            }
        },
        // 立即备份 初次上传 
        async backupNow() {
            if (this.bd_access_token) {
                if (this.isNeedDir) {
                    await initBackDir();
                }
                const fileBlob = appContext.fs.readFileSync('database/database.sqlite');
                const backfile = new File(fileBlob, 'backup.sqlite');
                const url = `https://pan.baidu.com/rest/2.0/xpan/file?method=upload&access_token=${this.bd_access_token}&path=${encodeURIComponent('/apps/文笥/backup.sqlite')}&ondup=overwrite`;
                const formdata = new FormData();
                formdata.append('file', backfile);
                fetch(url, {
                    method: 'POST',
                    body: formdata
                }).then(res => res.json())
                    .then(result => {
                        if (result.fs_id) {
                            $message.success('备份成功！');
                            const backupTime = new Date();
                            appContext.database.updateConfig({ backupAt: backupTime })
                                .then(() => {
                                    this.setState(['backupAt', backupTime]);
                                });
                            this.getBackfiles();
                        }
                    })
            }
        },
        /**
         * syncDB 同步数据库 
         * 这一步 在node层进行操作 输入接口结果给view层
         * 1， 先下载线上版本 
         * 2， 加载线上版本数据库 
         * 3， 本地数据库对比，主要对比同ID下的 更新时间，保留更新时间最新的。
         * 4， 本地有 线上无 -> 合并到线上备份
         * 5,  本地无 线上有 -> 用户自行选择 保留还是删除
         */
        async syncDB() {
            // todo
        }
    },
    created() {
        this.getBackfiles();
    }
}
</script>
<style lang="less" scoped>
.back-files {
    max-width: 400px;
    width: 400px;
    margin-top: 12px;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgb(224, 224, 230);
}

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