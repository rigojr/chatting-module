<script setup lang="ts">
import { LoginController, type LogInFormData } from '~/controllers/login.controller';

const route = useRouter(); // TODO: should not be used here.
const controller = new LoginController();

/**
 * Component private properties.
 */
type State = {
  'title': string;
  'formData': LogInFormData;
  'isLoading': boolean;
  'error'?: string;
}

const state = reactive<State>({
  'title': 'Welcome to my chatbox',
  'formData': getEmptyFormData(),
  'isLoading': false,
  'error': undefined
});

function getEmptyFormData(): LogInFormData {
  return {
    'email': '',
    'password': ''
  };
}

/**
 * Occurs when the login has occurred.
 */
function onLogin(): void {
  controller.login({
    'email': state.formData.email,
    'password': state.formData.password
  })
    .catch(() => {
      // TODO: handler error.
    });
}

/**
 * Occurs when the signup has occurred.
 */
function onSignUp(): void {
  route.push('/sign-up');
}

function onLoginStarted(): void {
  state.isLoading = true;
  state.error = undefined;
}

function onLoginCompleted(): void {
  state.isLoading = false;
  state.formData = getEmptyFormData();
  state.error = undefined;

  route.push('/chat');
}

function onLoginFailed(message: string): void {
  state.isLoading = true;
  state.formData.password = '';
  state.error = message;
}

onBeforeMount(() => {
  controller.on('login-started', () => onLoginStarted());
  controller.on('login-completed', () => onLoginCompleted());
  controller.on('login-failed', ([message]) => onLoginFailed(message as string));
});

onBeforeUnmount(() => {
  controller.removeAll();
});
</script>

<template>
  <div class="login-container">
    <LoginBox
      :title="state.title"
      :error="state.error"
      v-model:form="state.formData"
      @login="onLogin"
      @signup="onSignUp"
    />
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  max-width: 40vw;
  flex-grow: 1;
}
</style>
