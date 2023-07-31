<template >
    <div @click="selectHandler">
        {{option?.label}}
    </div>
</template>
<script>
export default {
    name:'tree-item',
    props:{
        option:{
            default:() => ({}),
            type:Object
        }
    },
    methods:{
        selectHandler() {
            this.$emit('select', this.option)
        }
    }
}
</script>
<style lang="less">
    
</style>