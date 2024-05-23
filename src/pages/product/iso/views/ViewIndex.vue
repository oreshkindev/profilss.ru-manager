<script setup lang="ts">
import { StoreIso } from '@/pages/product/iso/stores';
import { computed, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const store = StoreIso();

const search = ref('');

const isos = computed(() => store.isos.filter((iso: any) => iso.name.toLowerCase().includes(search.value.toLowerCase())));

store.find();
</script>

<template>
  <main v-if="$route.path === '/iso'">
    <RouterLink :to="{ name: 'iso-create' }" title="Новая запись" class="button">
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Новая запись</span>
    </RouterLink>

    <h1>ГОСТ стандарты</h1>

    <section class="card">
      <p>
        Здесь размещаются все актуальные ГОСТ стандарты и их состояние. Для создания стандарта нажмите кнопку
        <b>«Новая запись»</b> в навигационной панели. Для того чтобы отредактировать стандарт, необходимо нажать на <b>заголовок самого стандарта</b>, после чего вы попадете на
        страницу редактирования. Удалить стандарт можно нажав на кнопку <b>«Удалить запись»</b> на странице редактирования.
      </p>
    </section>

    <section class="card">
      <input type="text" v-model="search" placeholder="Поиск по наименованию стандарта" />
    </section>

    <table class="card" v-if="store.isos.length">
      <thead>
        <tr>
          <th>ID</th>

          <th>Наименование</th>
        </tr>
      </thead>

      <tr v-for="item of isos" :key="item.id">
        <td>{{ item.id }}</td>

        <td>
          <RouterLink :to="{ name: 'iso-update', params: { id: item.id } }">
            {{ item.name }}
          </RouterLink>
        </td>
      </tr>
    </table>

    <h4 v-else>Список товарных позиции пуст</h4>
  </main>

  <RouterView></RouterView>
</template>

<style scoped lang="scss">
input[type='text'] {
  border-radius: 3px;
  border: 1px solid var(--c-border);
  display: block;
  padding: 12px;
  width: 100%;
}

main {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px;
  gap: 24px;

  h4 {
    padding: 24px;
  }
}

section {
  padding: 24px;

  p {
    max-width: 1080px;
    text-align: justify;
  }

  b {
    font-weight: 600;
  }
}
</style>
