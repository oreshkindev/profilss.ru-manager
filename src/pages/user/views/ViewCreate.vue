<script setup lang="ts">
import ComponentInput from '@/components/ComponentInput.vue';
import { errors, setErrors } from '@/composables/errors';
import { Protector, isEmail, isNonEmptyString, minLength } from '@/composables/validates';
import { StoreUser } from '@/pages/user/stores';
import type { User } from '@/pages/user/types';
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

const { create } = StoreUser();

const data = reactive<User>({
  email: '',
  password: '',
  fullname: '',
  phone: ''
});

// Create an instance of Protector class with rules for the field
const protector = new Protector(
  {
    fieldName: 'email',
    rule: isEmail,
    errorMessage: 'Электронная почта должна быть валидной'
  },
  {
    fieldName: 'email',
    rule: (value: string) => minLength(value, 5),
    errorMessage: 'Электронная почта должна содержать не менее 5 символов'
  },
  {
    fieldName: 'fullname',
    rule: (value: string) => minLength(value, 5),
    errorMessage: 'ФИО - это обязательное поле'
  },
  {
    fieldName: 'phone',
    rule: (value: any) => isNonEmptyString(value),
    errorMessage: 'Номер телефона - это обязательное поле'
  },
  {
    fieldName: 'password',
    rule: (value: string) => minLength(value, 5),
    errorMessage: 'Пароль должен содержать не менее 5 символов'
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

<template>
  <main>
    <nav>
      <RouterLink :to="{ name: 'user' }" title="Новая запись" class="button">
        <span>Назад</span>
      </RouterLink>
    </nav>

    <h1>Создание учетной записи</h1>

    <section class="card">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis vel vero suscipit voluptas nobis! Tempore voluptas eum qui obcaecati blanditiis nemo nostrum, laboriosam
        porro necessitatibus reiciendis officia nam, molestiae aliquid!
      </p>
    </section>

    <section :class="[{ error: errors.error }, 'card']">
      <ComponentInput label="Электронная почта" type="email" k="email" v-model="data.email" />

      <ComponentInput label="ФИО" v-model="data.fullname" type="text" k="fullname"></ComponentInput>

      <ComponentInput label="Номер телефона" v-model="data.phone" type="text" k="phone"></ComponentInput>

      <ComponentInput label="Пароль" v-model="data.password" type="text" k="password"></ComponentInput>
    </section>

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
