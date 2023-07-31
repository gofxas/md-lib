<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <RouterView />
   
    <n-message-provider placement="bottom-right">
      <Message />
    </n-message-provider>
  </n-config-provider>
</template>
<script setup>
import { NConfigProvider, NMessageProvider } from "naive-ui";
// locale & dateLocale
import { zhCN, dateZhCN } from "naive-ui";
import Message from "@/components/message";
import { RouterView } from "vue-router";
</script>

<style scoped></style>
