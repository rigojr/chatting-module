<script setup lang="ts">
// TODO: check the verbatimModuleSyntax
import { type LogInFormData } from '~/entities';

/**
 * The component public properties.
 */
export interface Props {
  title: string;
  form: LogInFormData;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  loginPlaceholder?: string;
  signUpPlaceholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  'emailPlaceholder': 'your@email.here',
  'passwordPlaceholder': 'Please enter your password',
  'loginPlaceholder': 'Log In',
  'signUpPlaceholder': 'Sign Up'
});

interface Events {
  (e: 'update:form', value: LogInFormData): void;
  (e: 'login'): void;
  (e: 'signup'): void;
}

const emits = defineEmits<Events>();

/**
 * Occurs when an input has changed.
 *
 * @param e The event.
 */
function onInputChanged(e: Event, key: keyof LogInFormData): void {
  const target = e.target;

  if (!isHTMLInputElement(target)) {
    // TODO: add error handling here.

    return;
  }

  emits('update:form', { ...toRaw(props.form), [key]: target.value });
}

/**
 * Occurs when the form has been submitted.
 */
function onSubmit(): void {
  emits('login');
}

/**
 * Occurs when the sign up option has been selected.
 */
function onSignUp(): void {
  emits('signup');
}

</script>

<template>
  <form
    class="login-box"
    @submit.prevent="onSubmit"
  >
    <h2>{{ title }}</h2>
    <input
      class="login-box__email"
      type="email"
      name="email"
      :placeholder="emailPlaceholder"
      required
      id="email"
      @change="(e: Event) => onInputChanged(e, 'email')"
    />
    <input
      class="login-box__password"
      type="password"
      name="password"
      :placeholder="passwordPlaceholder"
      required
      id="password"
      @change="(e: Event) => onInputChanged(e, 'password')"
    />
    <div class="login-box__action-container">
      <input
        class="login-box__button login-box__button--primary"
        type="submit"
        :value="loginPlaceholder"
      />
      <input
        class="login-box__button login-box__button--lead"
        type="button"
        :value="signUpPlaceholder"
        @click="onSignUp"
      />
    </div>
  </form>
</template>

<style lang="scss">
  @use '@/styles/settings/colors' as colors;

  .login-box {
    display: flex;
    flex-direction: column;
    padding: 0.5rem; //TODO: ITCSS
    border: 0.15rem solid colors.$primary; // TODO: could be added in ITCSS
    border-radius: 1rem; //TODO: ITCSS
    box-shadow: 0.1rem 0.1rem 0.3rem rgba(0,0,0,0.25); // TODO: ITCSS.

    &__email, &__password {
      padding: 0.25rem; //TODO: ITCSS
    }

    &__action-container {
      display: flex;
    }

    &__button {
      width: 5rem;
      padding: 0.5rem; //TODO: ITCSS

      border: none;

      &--primary {
        color: white; // TODO: ITCSS
        background-color: colors.$primary;
      }
    }

    * {
      margin: 0.5rem 0.25rem; //TODO: ITCSS
    }
  }
</style>
