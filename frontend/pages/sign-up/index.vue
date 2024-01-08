<script setup lang="ts">
// TODO: check the verbatimModuleSyntax
import type { SingUpFormData } from '~/components/sign-up/SignUpBox.vue';
import { SignUpController, type UserSingUpRequest } from '~/controllers/signup.controller';

const route = useRouter(); // TODO: should not be used here.
const controller = new SignUpController();

/**
 * Component private properties.
 */
type State = {
  'formData': SingUpFormData;
  'isLoading': boolean;
  'error'?: string;
};

const state = reactive<State>({
  'formData': getEmptyFormData(),
  'isLoading': false
});

function getEmptyFormData(): SingUpFormData {
  return {
    'name': '',
    'email': '',
    'username': '',
    'password': '',
    'passwordRepeated': '',
    'profilePicture': undefined
  };
}

function onSignUpStarted(): void {
  state.isLoading = true;
  state.error = undefined;
}

function onSignUpCompleted(): void {
  state.isLoading = false;
  state.formData = getEmptyFormData();
  state.error = undefined;
}

function onSignUpFailed(message: string): void {
  state.isLoading = false;
  state.formData.password = '';
  state.formData.passwordRepeated = '';
  state.error = message;
}

/**
 * TODO: Can be in other place with more checks.
 */
function isPasswordValid(): boolean {
  return state.formData.password === state.formData.passwordRepeated;
}

function getSignUpRequest(): UserSingUpRequest {
  return {
    'email': state.formData.email,
    'name': state.formData.name,
    'password': state.formData.password,
    'username': state.formData.username,
    'profilePicture': undefined // TODO: handle the File conversion to Buffer or Array<Buffer> check this later.
  };
}

function onSignUp(): void {
  if (!isPasswordValid()) {
    state.error = 'Password doest not match, try again.';

    state.formData.password = '';
    state.formData.passwordRepeated = '';

    return;
  }

  controller.signUp(getSignUpRequest());
}

function onBack(): void {
  route.push('/login');
}

onBeforeMount(() => {
  controller.on('signup-started', () => onSignUpStarted());
  controller.on('signup-completed', () => onSignUpCompleted());
  controller.on('signup-failed', ([message]) => onSignUpFailed(message as string));
});

onBeforeUnmount(() => {
  controller.removeAll();
});
</script>

<template>
  <div class="signup-container">
    <SignUpBox
      :error="state.error"
      v-model:form="state.formData"
      @signup="onSignUp"
      @back="onBack"
    />
  </div>
</template>

<style lang="scss" scoped>
.signup-container {
  max-width: 50vw;
  flex-grow: 1;
}
</style>~/controllers/signup.controller