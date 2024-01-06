<script setup lang="ts">
  /**
   * Component private properties.
   */
  type State = {
    title: string;
    email: string;
    password: string;
  }

  const state = reactive<State>({
    'title': 'Welcome to my chatbox',
    'email': '',
    'password': ''
  });

  function onLogin(): void {
    console.log(state);
  }

  function onSignUp(): void {
    console.log(state.email, state.password);
  }
</script>

<template>
  <LoginBox
    :title="state.title"
    v-model:email="state.email"
    v-model:password="state.password"
    @login="onLogin"
    @sign-up="onSignUp"
  />
</template>