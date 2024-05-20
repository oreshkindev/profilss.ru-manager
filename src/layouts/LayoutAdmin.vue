<script setup lang="ts">
import ComponentHeader from '@/components/ComponentHeader.vue';
import ComponentSidebar from '@/components/ComponentSidebar.vue';
import ComponentSidebarDetails from '@/components/ComponentSidebarDetails.vue';
import { useApp } from '@/stores';

const store = useApp();
</script>

<template>
  <ComponentHeader></ComponentHeader>

  <div class="wrapper">
    <aside :style="{ width: store.subSidebar ? '80px' : '380px' }">
      <ComponentSidebar></ComponentSidebar>

      <ComponentSidebarDetails></ComponentSidebarDetails>
    </aside>

    <slot />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  height: calc(100vh - 80px);
  overflow: hidden;

  aside {
    display: flex;
    overflow: hidden;
    transition: all 0.2s ease-in-out;
  }
}
</style>
