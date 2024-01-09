<script setup lang="ts">
import { LoginInteractor, type LogInFormData } from '~/interactors/login.interactor';

const route = useRouter(); // TODO: should not be used here.
const interactor = new LoginInteractor();

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
  interactor.login({
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
  interactor.on('login-started', () => onLoginStarted());
  interactor.on('login-completed', () => onLoginCompleted());
  interactor.on('login-failed', ([message]) => onLoginFailed(message as string));
});

onBeforeUnmount(() => {
  interactor.removeAll();
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
~/interactors/login.interactor