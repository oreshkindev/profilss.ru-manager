<script setup lang="ts">
import ComponentInput from '@/components/ComponentInput.vue';
import IconLogo from '@/components/icons/IconLogo.vue';
import { errors, setErrors } from '@/composables/errors';
import { Protector, isEmail, minLength } from '@/composables/validates';
import { userStore } from '@/pages/user/stores';

const { data, signin } = userStore();

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

  signin();
};
</script>

<template>
  <main>
    <IconLogo :size="54" />

    <section :class="[{ error: errors.error }, 'card']">
      <p>Доступ к панели управления можно запросить у системного администратора.</p>

      <ComponentInput label="Электронная почта или логин" type="email" k="email" v-model="data.email" />

      <ComponentInput label="Пароль" type="password" k="password" v-model="data.password" />

      <a href="" class="link">Забыли пароль?</a>

      <button type="button" @click="prepareSubmit()">Войти</button>
    </section>
  </main>
</template>

<style scoped lang="scss">
main {
  display: grid;
  gap: 48px;
  height: 100vh;
  overflow: hidden;
  place-content: center;
  place-items: center;

  section {
    max-width: 540px;
    padding: clamp(24px, 4vw, 60px) clamp(24px, 4vw, 100px);

    p {
      margin: 0 0 24px;
      text-align: center;
    }

    a {
      display: inline-block;
      font-size: 14px;
      margin: 10px 0;
    }
  }
}
</style>
