<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <nav>
    <h3>Составные разделы</h3>
    <ul v-if="route.name === 'product'">
      <li>
        <RouterLink :to="{ name: 'category' }" title="Категории"> Категории </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'iso' }" title="ГОСТ стандарты"> ГОСТ стандарты</RouterLink>
      </li>
    </ul>

    <ul v-if="route.name === 'category'">
      <li>
        <RouterLink :to="{ name: 'sub-category' }" title="Подкатегории"> Подкатегории </RouterLink>
      </li>
    </ul>

    <ul v-else-if="route.name === 'user'">
      <li>
        <RouterLink :to="{ name: 'hr' }" title="Вакансии"> Вакансии </RouterLink>
      </li>
    </ul>

    <ul v-else>
      <li>Список пуст</li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
h3 {
  font-size: 18px;
}

nav {
  background-color: #ffffff;
  border-right: 1px solid #dfe3e8;
  padding: 24px;
  white-space: nowrap;
  width: 300px;

  ul {
    list-style: none;
    padding: 24px 0;

    li {
      margin-bottom: 12px;

      a {
        &:hover {
          color: var(--c-scheme);
        }
      }
    }
  }
}
</style>
