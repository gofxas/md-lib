<template>
    <div class="dropdown-item">
        <n-button text :type="type">
            {{label}}
        </n-button>
    </div>
</template>
<script>
import { NButton } from 'naive-ui';
export default {
    name: 'dropdown-item',
    components: { NButton },
    props: {
        label: {
            default: 'Default',
            type: String
        },
        type: {
            default: '',
            type: String
        }
    }
}
</script>
<style lang="less" scoped>
    .dropdown-item {
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>