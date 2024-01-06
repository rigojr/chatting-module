<script setup lang="ts">
import { type LogInFormData } from '~/entities';

const route = useRouter(); // TODO: should not be used here.

/**
 * Component private properties.
 */
type State = {
  title: string;
  formData: LogInFormData;
}

const state = reactive<State>({
  'title': 'Welcome to my chatbox',
  'formData': {
    'email': '',
    'password': ''
  }
});

/**
 * Occurs when the login has occurred.
 */
function onLogin(): void {
  console.log(state.formData);
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
    v-model:form="state.formData"
    @login="onLogin"
    @signup="onSignUp"
  />
</template>