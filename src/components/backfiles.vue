<template >
    <n-spin :show="showSyncing">
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
                    <n-button @click="syncDB(file.fs_id)" quaternary circle type="success">
                        <n-icon size="18">
                            <ArrowSyncCircle20Regular />
                        </n-icon>
                    </n-button>
                </n-space>
            </div>
        </div>
        <template #description>
            正在进行同步！！
        </template>
    </n-spin>
    <n-modal :close-on-esc="false" :mask-closable="false" :on-after-leave="modalLeave" v-model:show="modal_show">
        <n-card style="width: 600px" title="请确认以下文件" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <div>
                <p>
                    下面的文件本地不存在，请勾选需要保留的文档，没有勾选的将会彻底的删除。
                </p>
                <n-data-table :row-key="row => row.id" v-model:checked-row-keys="checkedRowKeys" :columns="columns"
                    :data="diff_files" :pagination="pagination" :max-height="300" />
            </div>
            <template #footer>
                <n-space justify="end">
                    <n-button @click="updateBackup">取消</n-button>
                    <n-button @click="modal_show = false">取消</n-button>
                </n-space>
            </template>
        </n-card>
    </n-modal>
</template>
<script>
import { NIcon, NSpin, NButton, NDataTable, NSpace, NPopconfirm, NModal, NCard } from 'naive-ui'
import { ArrowSyncCircle20Regular, Delete20Regular } from '@vicons/fluent'
import { mapState, mapMutations, mapActions } from 'vuex';
import { h } from 'vue';
export default {
    name: 'back-files',
    components: { NIcon, NSpin, NDataTable, NButton, NSpace, NPopconfirm, ArrowSyncCircle20Regular, Delete20Regular, NModal, NCard },
    data() {
        return {
            FileList: [],
            showSyncing: false,// 同步中！！！
            isNeedDir: false,
            diffInstance: null, // 对比的实例
            diff_files: [],
            modal_show: false,
            checkedRowKeys: [],
            pagination: { pageSize: 20 },
            columns: [
                { type: "selection" },
                {
                    title: "ID",
                    key: "id"
                },
                {
                    title: "标题",
                    key: "title"
                },
                {
                    title: "创建时间",
                    key: "createdAt",
                    render: row => (new Date(row.createdAt)).toLocaleString()
                },
                {
                    title: "更新时间",
                    key: "updatedAt",
                    render: row => (new Date(row.updatedAt)).toLocaleString()
                }
            ]
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
        async backupNow(t = true) {
            if (this.bd_access_token) {
                if (this.isNeedDir) {
                    await initBackDir();
                }
                const fileBlob = t ? appContext.fs.readFileSync('database/database.sqlite') : appContext.fs.readFileSync('backup/database.sqlite');
                const backfile = new File([fileBlob.buffer], 'backup.sqlite');
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
        async syncDB(fsid) {

            if (this.bd_access_token) {
                this.showSyncing = true;
                // 1.获取下载的链接地址 
                const fileMeta = await this.downloadBackdb(fsid);
                const dLink = fileMeta.dlink;
                const download = await fetch(dLink + `&access_token=${this.bd_access_token}`, {
                    headers: new Headers({
                        'User-Agent': 'pan.baidu.com'
                    })
                });
                const buffer = await download.arrayBuffer();
                console.log(buffer, 'buffer')
                // 2.获取文件buffer 写入本地数据库文件;
                const { fs, path, cwd } = appContext;
                const filePath = path.join(cwd(), '/backup/database.sqlite');
                fs.writeFileSync(filePath, new Uint8Array(buffer));
                // 3. diff 数据库文档;
                this.getDiffDatas();
                this.showSyncing = false;
            }

        },
        async getDiffDatas() {
            const { Diffinstance } = appContext;
            this.diffInstance = Diffinstance;
            // 初始化 数据库链接
            await this.diffInstance.init();
            // 更新 用户设置
            await this.diffInstance.diffConfig();
            // 获取更新条目
            const diff_files = await this.diffInstance.diffFiles();
            console.log(diff_files);
            const addToOnline = diff_files.filter(t => t.next == 'l').map(t => t.id);
            const userChooseId = diff_files.filter(t => t.next == 'o').map(t => t.id);
            this.diffInstance.updateOnlinefiles(addToOnline);
            if (userChooseId.length) {
                this.diff_files = await this.diffInstance.userChooseFiles(userChooseId);
                this.modal_show = true;
            } else {
                await this.diffInstance.close();
                // todo upload after sqlite
                this.backupNow(false);
            }
        },
        /**
         * 下载备份的文档
         */
        async downloadBackdb(fsid) {
            // http://pan.baidu.com/rest/2.0/xpan/multimedia?method=filemetas&access_token=xxx&dlink=1&fsids=;
            const token = this.bd_access_token;
            const response = await fetch(`http://pan.baidu.com/rest/2.0/xpan/multimedia?method=filemetas&access_token=${token}&dlink=1&fsids=[${fsid}]`, {
                headers: {
                    'User-Agent': 'pan.baidu.com'
                }
            });
            const result = await response.json();
            if (result.errno) {
                $message.error(result.errmsg)
                return;
            }
            return result.list[0]
        },
        modalLeave() {
            this.diff_files = [];
        },
        async updateBackup() {
            if (this.checkedRowKeys.length) {
                await this.diffInstance.updateLocalfiles(this.checkedRowKeys);
            }
            const del_online_ids = this.diff_files.map(t => t.id).filter(t => !this.checkedRowKeys.includes(t));
            if (del_online_ids.length) {
                await this.diffInstance.deleteOnlinefiles(del_online_ids)
            }
            await this.diffInstance.close();
            // todo upload after sqlite
            this.backupNow(false)
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
    user-select: none;
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