<script setup lang="ts">
import type { LogInFormData } from '~/controllers/login.controller';

// TODO: check the verbatimModuleSyntax

/**
 * The component public properties.
 */
export interface Props {
  title: string;
  error?: string;
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
    <h2 v-if="isNullish(error)">{{ title }}</h2>
    <h2 v-else class="login-box__error-title">{{ error }}</h2>
    <input
      class="login-box__email"
      type="email"
      name="email"
      :placeholder="emailPlaceholder"
      :value="form.email"
      required
      id="email"
      @change="(e: Event) => onInputChanged(e, 'email')"
    />
    <input
      class="login-box__password"
      type="password"
      name="password"
      minlength="8"
      :placeholder="passwordPlaceholder"
      :value="form.password"
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

<style lang="scss" scoped>
  @use '@/styles/settings/colors' as colors;
  @use '@/styles/tools/mixins' as mixins;

  .login-box {
    @include mixins.formStyle;

    &__error-title {
      color: colors.$error;
    }
    &__email, &__password {
      @include mixins.inputStyle;
    }

    &__action-container {
      display: flex;
    }

    &__button {
      @include mixins.button;

      &--primary {
        @include mixins.buttonPrimary;
      }
    }
  }
</style>
~/interactors/login.controller