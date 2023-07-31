<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <RouterView />
  </n-config-provider>
</template>
<script setup>
import { NConfigProvider } from "naive-ui";
// locale & dateLocale
import { zhCN, dateZhCN } from "naive-ui";

import { RouterView } from "vue-router";
</script>

<style scoped></style>
