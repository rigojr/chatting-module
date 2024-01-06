<script setup lang="ts">
// TODO: here start the initialization process
// TODO: starts the application context and application services
</script>

<template>
  <div class="viewport">
    <div class="viewport__container">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="scss">
  .viewport {
    width: 90vw;
    margin: auto;

    &__container {
      width: 100%;
      max-width: 60%;
    }
  }
</style>
