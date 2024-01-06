<script setup lang="ts">
// TODO: check the verbatimModuleSyntax
import { type SingUpFormData } from '~/entities';

/**
 * The component public properties.
 */
export interface Props {
  title?: string;
  form: SingUpFormData
  fullNamePlaceholder?: string;
  emailPlaceholder?: string;
  userPlaceholder?: string;
  passwordPlaceholder?: string;
  passwordRepeatedPlaceholder?: string;
  profilePicturePlaceholder?: string;
  signUpPlaceholder?: string;
  backPlaceholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  'title': 'Please enter the required information',
  'fullNamePlaceholder': 'Enter you full name',
  'emailPlaceholder': 'your@email.here',
  'userPlaceholder': 'Enter your username',
  'passwordPlaceholder': 'Please enter your password',
  'passwordRepeatedPlaceholder': 'Please repeat your password',
  'profilePicturePlaceholder': 'Add your profile picture',
  'signUpPlaceholder': 'Sign Up',
  'backPlaceholder': 'Return to Log in'
});

interface Events {
  (e: 'update:form', value: SingUpFormData): void;
  (e: 'signup'): void;
  (e: 'back'): void;
}

const emits = defineEmits<Events>();

/**
 * Occurs when an input has changed.
 *
 * @param e The event.
 */
function onInputChanged(e: Event, key: keyof SingUpFormData): void {
  const target = e.target;

  if (!isHTMLInputElement(target)) {
    // TODO: check the nullish form data if there is time.
    // TODO: add error handling here.

    return;
  }

  emits('update:form', { ...toRaw(props.form), [key]: target.value });
}

/**
 * Occurs when the back button has been clicked.
 */
function onBackClicked(): void {
  emits('back');
}

/**
 * Occurs when the form has been submitted.
 */
function onSubmit(): void {
  emits('signup');
}
</script>

<template>
  <form
    class="signup-box"
    @submit.prevent="onSubmit"
  >
    <h2>{{ title }}</h2>
    <input
      class="signup-box__full-name"
      type="text"
      name="full-name"
      :placeholder="fullNamePlaceholder"
      required
      id="full-name"
      @change="(e: Event) => onInputChanged(e, 'name')"
    />
    <input
      class="signup-box__email"
      type="email"
      name="email"
      :placeholder="emailPlaceholder"
      required
      id="email"
      @change="(e: Event) => onInputChanged(e, 'email')"
    />
    <input
      class="signup-box__user"
      type="text"
      name="user"
      :placeholder="userPlaceholder"
      required
      id="user"
      @change="(e: Event) => onInputChanged(e, 'user')"
    />
    <input
      class="signup-box__password"
      type="password"
      name="password"
      :placeholder="passwordPlaceholder"
      required
      id="password"
      @change="(e: Event) => onInputChanged(e, 'password')"
    />
    <input
      class="signup-box__password-repeated"
      type="password"
      name="password-repeated"
      :placeholder="passwordRepeatedPlaceholder"
      required
      id="password-repeated"
      @change="(e: Event) => onInputChanged(e, 'passwordRepeated')"
    />
    <label
      class="signup-box__profile-picture-placeholder"
      for="profile"
    >
      {{ profilePicturePlaceholder }}
    </label>
    <input
      class="signup-box__profile-picture"
      type="file"
      name="profile"
      id="profile"
      @change="(e: Event) => onInputChanged(e, 'profilePicture')"
    />
    <div class="sign-in-box__action-container">
      <input
        class="signup-box__button signup-box__button--primary"
        type="submit"
        :value="signUpPlaceholder"
      />
      <input
        class="signup-box__button signup-box__button--lead"
        type="button"
        :value="backPlaceholder"
        @click="onBackClicked"
      />
    </div>
  </form>
</template>

<style lang="scss">
  @use '@/styles/tools/mixins' as mixins;

  input {
    @include mixins.inputStyle;
  }

  .signup-box {
    @include mixins.formStyle;

    &__button {
      @include mixins.button;

      &--primary {
        @include mixins.buttonPrimary;
      }
    }
  }
</style>
