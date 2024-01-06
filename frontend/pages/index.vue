<template>
  <p>Hello there</p>
</template>

<script setup lang="ts">
const route = useRouter();

route.push('/login');
</script>
