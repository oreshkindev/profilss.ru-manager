<script setup lang="ts">
import ComponentCheckbox from '@/components/ComponentCheckbox.vue';
import ComponentInput from '@/components/ComponentInput.vue';
import { errors, setErrors } from '@/composables/errors';
import { Protector, isNonEmptyString, minLength } from '@/composables/validates';
import { StoreHr } from '@/pages/hr/stores';
import type { Hr } from '@/pages/hr/types';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

const { create } = StoreHr();

const data = reactive<Hr>({
  period: '',
  name: '',
  cost: '',
  address: '',
  duties: [''],
  requirements: [''],
  conditions: [''],
  published: false
});

const addDuties = () => {
  data.duties.push('');
};
const addConditions = () => {
  data.conditions.push('');
};
const addRequirements = () => {
  data.requirements.push('');
};

const removeDuties = (index: number) => {
  if (data) {
    data.duties.splice(index, 1);
  }
};

const removeConditions = (index: number) => {
  if (data) {
    data.conditions.splice(index, 1);
  }
};

const removeRequirements = (index: number) => {
  if (data) {
    data.requirements.splice(index, 1);
  }
};

// Create an instance of Protector class with rules for the field
const protector = new Protector(
  {
    fieldName: 'name',
    rule: (value: string) => minLength(value, 5),
    errorMessage: 'Название вакансии должно содержать не менее 5 символов'
  },
  {
    fieldName: 'period',
    rule: (value: any) => isNonEmptyString(value),
    errorMessage: 'Режим работы - это обязательное поле'
  },
  {
    fieldName: 'cost',
    rule: (value: any) => isNonEmptyString(value),
    errorMessage: 'Заработная плата - это обязательное поле'
  },
  {
    fieldName: 'address',
    rule: (value: any) => isNonEmptyString(value),
    errorMessage: 'Место работы - это обязательное поле'
  },
  {
    fieldName: 'duties[0]',
    rule: (value: any) => isNonEmptyString(value),
    errorMessage: 'Обязанности - это обязательное поле'
  },
  {
    fieldName: 'requirements[0]',
    rule: (value: any) => isNonEmptyString(value),
    errorMessage: 'Требование - это обязательное поле'
  },
  {
    fieldName: 'conditions[0]',
    rule: (value: any) => isNonEmptyString(value),
    errorMessage: 'Условия - это обязательное поле'
  }
);

const prepareSubmit = () => {
  // Synchronous testing
  const errors = protector.validate(data);
  if (Object.keys(errors).length !== 0) {
    setErrors(errors);
    return;
  }

  create(data);
};
</script>
<!-- TODO дропдауны -->
<template>
  <main>
    <nav>
      <RouterLink :to="{ name: 'hr' }" title="Новая запись" class="button">
        <span>Назад</span>
      </RouterLink>
    </nav>

    <h1>Создание вакансии</h1>

    <section class="card">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis vel vero suscipit voluptas nobis! Tempore voluptas eum qui obcaecati blanditiis nemo nostrum, laboriosam
        porro necessitatibus reiciendis officia nam, molestiae aliquid!
      </p>
    </section>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentInput label="Название" v-model="data.name" type="text" required="name"></ComponentInput>

      <ComponentInput label="Режим работы" v-model="data.period" type="text" required="period"></ComponentInput>

      <ComponentInput label="Зарплата" v-model="data.cost" type="text" required="cost"></ComponentInput>

      <ComponentInput label="Место работы" v-model="data.address" type="text" required="address"></ComponentInput>

      <ComponentCheckbox label="Опубликовать" v-model="data.published" required="published"></ComponentCheckbox>
    </section>

    <section class="card with__control" v-for="(c, index) of data.duties" :key="index">
      <ComponentInput label="Обязанности" v-model="data.duties[index]" type="text" required="duties[0]"></ComponentInput>

      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" v-on:click="removeDuties(index)">
        <path
          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
        />
      </svg>
    </section>

    <button type="button" v-on:click="addDuties()" style="margin: auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Добавить поле</span>
    </button>

    <section class="card with__control" v-for="(c, index) of data.requirements" :key="index">
      <ComponentInput label="Требования" v-model="data.requirements[index]" type="text" required="requirements[0]"></ComponentInput>

      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" v-on:click="removeRequirements(index)">
        <path
          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
        />
      </svg>
    </section>

    <button type="button" v-on:click="addRequirements()" style="margin: auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Добавить поле</span>
    </button>

    <section class="card with__control" v-for="(c, index) of data.conditions" :key="index">
      <ComponentInput label="Условия" v-model="data.conditions[index]" type="text" required="conditions[0]"></ComponentInput>

      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" v-on:click="removeConditions(index)">
        <path
          d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
        />
      </svg>
    </section>

    <button type="button" v-on:click="addConditions()" style="margin: auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Добавить поле</span>
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
