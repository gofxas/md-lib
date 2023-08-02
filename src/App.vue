<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <RouterView />
    <n-message-provider :placement="placement">
      <Message />
    </n-message-provider>
  </n-config-provider>
</template>
<script setup>
import { useMapMutations, useMapState, useMapActions } from "./vuex_hook";
import { NConfigProvider, NMessageProvider } from "naive-ui";
// locale & dateLocale
import { zhCN, dateZhCN } from "naive-ui";
import Message from "@/components/message";
import { RouterView } from "vue-router";
import { onMounted } from 'vue';
const { placement } = useMapState("layout", ["placement"]);
const { setPlacement } = useMapMutations("layout", ["setPlacement"]);
const { initConfig,getUserinfo } = useMapActions('config',['initConfig','getUserinfo']);
onMounted(() => {
  initConfig().then(() => {
    getUserinfo()
  })
});
</script>

<style scoped>

</style>
