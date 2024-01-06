<script setup lang="ts">
  const route = useRouter(); // TODO: should not be used here.

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

  /**
   * Occurs when the login has occurred.
   */
  function onLogin(): void {
    console.log(state);
  }

  /**
   * Occurs when the signup has occurred.
   */
  function onSignUp(): void {
    route.push('/sign-up');
  }
</script>

<template>
  <LoginBox
    :title="state.title"
    v-model:email="state.email"
    v-model:password="state.password"
    @login="onLogin"
    @signup="onSignUp"
  />
</template>