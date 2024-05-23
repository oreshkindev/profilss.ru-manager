<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <nav>
    <ul v-if="route.name === 'product'">
      <li>
        <RouterLink :to="{ name: 'category' }" title="Новая запись"> Категории </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'iso' }" title="Новая запись"> ГОСТ стандарты</RouterLink>
      </li>
    </ul>

    <ul v-else>
      <li>Список пуст</li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  background-color: #ffffff;
  border-right: 1px solid #dfe3e8;
  padding: 24px;
  white-space: nowrap;
  width: 300px;

  ul {
    list-style: none;

    li {
      margin-bottom: 12px;
    }
  }
}
</style>
