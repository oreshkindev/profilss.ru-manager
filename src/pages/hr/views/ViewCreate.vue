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
      <ComponentInput label="Название" v-model="data.name" type="text" k="name"></ComponentInput>

      <ComponentInput label="Режим работы" v-model="data.period" type="text" k="period"></ComponentInput>

      <ComponentInput label="Зарплата" v-model="data.cost" type="text" k="cost"></ComponentInput>

      <ComponentInput label="Место работы" v-model="data.address" type="text" k="address"></ComponentInput>

      <ComponentCheckbox label="Опубликовать" v-model="data.published" k="published"></ComponentCheckbox>
    </section>

    <section class="card" v-for="(c, i) of data.duties" :key="i">
      <ComponentInput label="Обязанности" v-model="data.duties[i]" type="text" k="duties[0]"></ComponentInput>
    </section>

    <button type="button" v-on:click="addDuties()" style="margin: auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Добавить поле</span>
    </button>

    <section class="card" v-for="(c, i) of data.requirements" :key="i">
      <ComponentInput label="Требования" v-model="data.requirements[i]" type="text" k="requirements[0]"></ComponentInput>
    </section>

    <button type="button" v-on:click="addRequirements()" style="margin: auto">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
      </svg>

      <span>Добавить поле</span>
    </button>

    <section class="card" v-for="(c, i) of data.conditions" :key="i">
      <ComponentInput label="Условия" v-model="data.conditions[i]" type="text" k="conditions[0]"></ComponentInput>
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
