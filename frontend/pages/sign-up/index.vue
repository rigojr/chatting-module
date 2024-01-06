<script setup lang="ts">
// TODO: check the verbatimModuleSyntax
import { type SingUpFormData } from '~/entities';
const route = useRouter(); // TODO: should not be used here.

/**
 * Component private properties.
 */
type State = {
  formData: SingUpFormData
};

const state = reactive<State>({
  'formData': {
    'name': '',
    'email': '',
    'user': '',
    'password': '',
    'passwordRepeated': '',
    'profilePicture': undefined
  }
});

function onSignUp(): void {
  console.log(state);
}

function onBack(): void {
  route.push('/login');
}

</script>

<template>
  <!-- TODO: Find a better approach to pass all v-models -->
  <SignUpBox
    v-model:form="state.formData"
    @signup="onSignUp"
    @back="onBack"
  />
</template>

<style lang="scss">
</style>