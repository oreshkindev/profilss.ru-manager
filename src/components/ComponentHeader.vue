<script setup lang="ts">
import { RouterLink } from 'vue-router';
import IconLogo from './icons/IconLogo.vue';
import IconNotice from './icons/IconNotice.vue';
import IconProfile from './icons/IconProfile.vue';
</script>

<template>
  <header>
    <RouterLink to="/">
      <IconLogo></IconLogo>
    </RouterLink>

    <nav>
      <ul>
        <li>
          <RouterLink to="/chat">
            <IconNotice></IconNotice>
          </RouterLink>
        </li>

        <li>Почта</li>

        <li>
          <RouterLink to="/">
            <IconProfile></IconProfile>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  background-color: #ffffff;
  box-shadow: var(--c-shadow);
  display: flex;
  padding: 24px;
  place-items: center;
  position: relative;

  a {
    &:has(svg) {
      display: block;
      line-height: 0;
      margin-right: auto;
    }
  }

  nav {
    ul {
      display: flex;
      gap: 40px;
      list-style: none;

      li {
        color: #707a8a;

        a {
          &:has(svg) {
            display: block;
            line-height: 0;
          }
        }
      }
    }
  }
}
</style>
