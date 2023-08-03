<template >
    <n-card style="width: 300px" title="验证密码" :bordered="false" size="huge" role="dialog" aria-modal="true">
        <n-input type="password" v-model:value="passwd" show-password-on="mousedown" placeholder="密码"></n-input>
        <template #footer>
            <n-space justify="end">
                <n-button quaternary type="primary" @click="verify">验证</n-button>
            </n-space>
        </template>
    </n-card>
</template>
<script>
import { NCard,NInput,NSpace,NButton } from 'naive-ui'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'verify-passwd',
    components: { NCard,NInput, NSpace, NButton },
    date() {
        return {
            passwd: ""
        }
    },
    computed: {
        ...mapState('config', ['user_lock_passwd'])
    },
    methods: {
        ...mapMutations('config', ['setState']),
        ...mapMutations('layout', ['setSelectedKeys',]),
        async verify() {
            if (window.appContext && window.appContext.electron()) {
                const res = await appContext.database.verifyPassword(this.passwd);
                if (!res) {
                    $message.warning('密码不正确！')
                } else {
                    this.setState(['user_lock_passwd', this.passwd])
                }
            } else {
                this.setState(['user_lock_passwd', this.passwd])
            }
        }
    }
}
</script>
<style lang="less"></style>