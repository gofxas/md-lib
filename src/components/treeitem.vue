<template>
  <div class="tree-item" @contextmenu="handleContextMenu">
    {{ option?.title }}
  </div>
</template>
<script>
export default {
  name: "tree-item",
  props: {
    option: {
      default: () => ({}),
      type: Object,
    },
  },
  methods: {
    handleContextMenu(e) {
      e.preventDefault();
      this.$emit('contextmenu', {
        x: e.clientX,
        y: e.clientY,
        option: this.option
      })
    },
  },
};
</script>
<style lang="less" scoped>
  .tree-item {
    line-height: 28px;
    font-size: 16px;
  }
</style>
