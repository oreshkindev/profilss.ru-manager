<script setup lang="ts">
import ComponentInput from '@/components/ComponentInput.vue';
import { errors, setErrors } from '@/composables/errors';
import { Protector, minLength } from '@/composables/validates';
import { StoreSettings } from '@/pages/setting/stores';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import type { Contact, Employee, Media, Settings } from '../types';

const route = useRoute();

const store = StoreSettings();

const data = computed(() => store.setting);

const addContactss = () => {
  if (data.value) {
    data.value.contacts.push({
      id: 0,
      address: '',
      email: '',
      phone: ''
    } as Contact);
  }
};

const removeContactss = (index: number) => {
  if (data.value) {
    data.value.contacts.splice(index, 1);
  }
};

const addEmployee = () => {
  if (data.value) {
    data.value.employees.push({
      id: 0,
      contacts: [
        {
          id: 0,
          address: '',
          email: '',
          phone: ''
        } as Contact
      ],
      description: '',
      name: ''
    } as Employee);
  }
};

const removeEmployee = (index: number) => {
  if (data.value) {
    data.value.employees.splice(index, 1);
  }
};

const addEmployeeAddress = (index: number) => {
  if (data.value) {
    data.value.employees[index].contacts.push({
      id: 0,
      address: '',
      email: '',
      phone: ''
    } as Contact);
  }
};

const removeEmployeeAddress = (employeeIndex: number, addressIndex: number) => {
  if (data.value) {
    data.value.employees[employeeIndex].contacts.splice(addressIndex, 1);
  }
};

const addMedia = () => {
  if (data.value) {
    data.value.media.push({
      id: 0,
      href: '',
      name: ''
    } as Media);
  }
};

const removeMedia = (index: number) => {
  if (data.value) {
    data.value.media.splice(index, 1);
  }
};

// Create an instance of Protector class with rules for the field
const protector = new Protector({
  fieldName: 'name',
  rule: (value: string) => minLength(value, 5),
  errorMessage: 'Название должно содержать не менее 5 символов'
});

const prepareSubmit = () => {
  // Synchronous testing
  const errors = protector.validate(data.value);
  if (Object.keys(errors).length !== 0) {
    setErrors(errors);
    return;
  }

  store.update(data.value as Settings);
};

store.first(route.params.id);
</script>

<template>
  <main v-if="data">
    <nav>
      <RouterLink :to="{ name: 'setting' }" title="Новая запись" class="button">
        <span>Назад</span>
      </RouterLink>
    </nav>

    <h1>Создание настроек</h1>

    <section class="card">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis vel vero suscipit voluptas nobis! Tempore voluptas eum qui obcaecati blanditiis nemo nostrum, laboriosam
        porro necessitatibus reiciendis officia nam, molestiae aliquid!
      </p>
    </section>

    <h2>Основная информация</h2>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentInput label="Полное наименование (или ФИО предпринимателя)" v-model="data.name" type="text" required="name"></ComponentInput>
      <ComponentInput label="Краткое наименование" v-model="data.abbreviation" type="text"></ComponentInput>
    </section>

    <h2>Адрес расположения (юридический и фактический)</h2>

    <section class="card with__control" v-for="(c, index) of data.contacts" :key="index">
      <ComponentInput label="Адрес" v-model="data.contacts[index].address" type="text"></ComponentInput>

      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" v-on:click="removeContactss(index)">
        <path
          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
        />
      </svg>
      <ComponentInput label="Эл. почта" v-model="data.contacts[index].email" type="text"></ComponentInput>
      <ComponentInput label="Номер телефона" v-model="data.contacts[index].phone" type="text"></ComponentInput>
    </section>

    <button type="button" v-on:click="addContactss()" style="margin: auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Добавить адрес</span>
    </button>

    <h2>Учредительная информация</h2>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentInput label="ИНН" v-model="data.inn" type="text"></ComponentInput>
      <ComponentInput label="КПП (только для юрлиц)" v-model="data.kpp" type="text"></ComponentInput>
      <ComponentInput label="ОГРН (или ОГРНИП для предпринимателя)" v-model="data.ogrn" type="text"></ComponentInput>
    </section>

    <h2>Сотрудники (руководитель, бухгалтер, доверенное лицо)</h2>

    <fieldset v-for="(c, index) of data.employees" :key="index" style="display: grid; gap: 24px">
      <section class="card with__control">
        <ComponentInput label="ФИО" v-model="data.employees[index].name" type="text"></ComponentInput>
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" v-on:click="removeEmployee(index)">
          <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
          />
        </svg>

        <ComponentInput label="Должность" v-model="data.employees[index].description" type="text"></ComponentInput>
      </section>

      <section class="card with__control" v-for="(c, i) of data.employees[index].contacts" :key="i" style="grid-column: 1 / -1">
        <ComponentInput label="Адрес" v-model="data.employees[index].contacts[i].address" type="text"></ComponentInput>

        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" v-on:click="removeEmployeeAddress(index, i)">
          <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
          />
        </svg>
        <ComponentInput label="Эл. почта" v-model="data.employees[index].contacts[i].email" type="text"></ComponentInput>
        <ComponentInput label="Номер телефона" v-model="data.employees[index].contacts[i].phone" type="text"></ComponentInput>
      </section>

      <button type="button" v-on:click="addEmployeeAddress(index)" style="margin: auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
        </svg>

        <span>Добавить адрес сотрудника</span>
      </button>
    </fieldset>

    <button type="button" v-on:click="addEmployee()" style="margin: auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Добавить сотрудника</span>
    </button>

    <h2>Банковская информация</h2>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentInput label="Наименование банка" v-model="data.bank" type="text"></ComponentInput>
      <ComponentInput label="БИК" v-model="data.bik" type="text"></ComponentInput>
      <ComponentInput label="Корреспондентский счет" v-model="data.kor" type="text"></ComponentInput>
      <ComponentInput label="Расчетный счет" v-model="data.current_account" type="text"></ComponentInput>
      <ComponentInput label="Основные коды ОКВЭД" v-model="data.okvd" type="text"></ComponentInput>
      <ComponentInput label="Система налогообложения" v-model="data.tax" type="text"></ComponentInput>
    </section>

    <h2>Социальные сети</h2>

    <section class="card with__control" v-for="(c, index) of data.media" :key="index">
      <ComponentInput label="Имя соц. сети" v-model="data.media[index].name" type="text"></ComponentInput>
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" v-on:click="removeMedia(index)">
        <path
          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
        />
      </svg>

      <ComponentInput label="Ссылка" v-model="data.media[index].href" type="text"></ComponentInput>
    </section>

    <button type="button" v-on:click="addMedia()" style="margin: auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Добавить соц. сеть</span>
    </button>

    <button type="button" v-on:click="prepareSubmit()">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path
          d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"
        />
      </svg>

      <span>Сохранить</span>
    </button>
  </main>
</template>

<style scoped lang="scss">
.with__control {
  display: grid;
  gap: 0 20px;
  grid-template: auto / 1fr auto;

  :deep(label) {
    grid-column: 1 / -1;
  }

  svg {
    margin: auto;
  }
}

main {
  overflow: auto;
}

nav {
  display: flex;
  gap: 24px;

  a {
    background-color: var(--c-border);

    &:hover {
      background-color: #707a8a;
    }
  }

  button {
    background-color: var(--c-border);

    &:hover {
      background-color: tomato;
    }
  }
}

section {
  padding: 24px;
}
</style>
