<template>
    <Apptitle style="zIndex:1"></Apptitle>
    <div class="backup-page">
        <div class="backup-left">
            <img class="app-setting-logo" src="/logo.svg" />
            <h1>数据同步</h1>
        </div>
        <div class="backup-right">
            <h2 >百度云盘数据库备份</h2>
            <Backfiles />
            <n-button @click="returnSetting">返回设置</n-button>
        </div>
    </div>
</template>
<script>
import Apptitle from '@/components/apptitle';
import Backfiles from '@/components/backfiles';
import { NInput, NCard, NModal, NButton, NSwitch, NForm, NFormItem, NSpace } from "naive-ui";
export default {
    components: { Apptitle, Backfiles,NButton },
    methods:{
        returnSetting() {
            this.$router.replace("/setting");
        }
    }
}
</script>
<style lang="less" scoped>
.backup-page {
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

.backup-left {
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

.backup-right {
    flex: 2;
    padding: 24px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
}
</style>