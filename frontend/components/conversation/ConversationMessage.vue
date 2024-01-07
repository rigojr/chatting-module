<script setup lang="ts">
/**
 * The component public properties.
 */
interface Props {
  message: string;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  'placeholder': 'Type your message!'
});

interface Events {
  (e: 'update:message', value: string): void;
  (e: 'messageSend'): void;
}

const emits = defineEmits<Events>();

/**
 * Occurs when the messages has been submitted.
 */
function onSubmit(): void {
  emits('messageSend');
}

/**
 * Occurs when the message input has changed.
 *
 * @param e The event.
 */
function onInput(e: Event): void {
  const target = e.target;

  if (!isHTMLInputElement(target)) {
    // TODO: add error handling here.

    return;
  }

  emits('update:message', target.value);
}
</script>

<template>
  <form
    class="conversation-message"
    @submit.prevent="onSubmit"
  >
    <input
      class="conversation-message__input"
      type="text"
      name="message"
      id="message"
      @input="onInput"
      :value="message"
      :placeholder="placeholder"
    />
  </form>
</template>

<style lang="scss">
@use '@/styles/tools/mixins' as mixins;

.conversation-message {
  display: flex;

  &__input {
    flex-grow: 1;

    @include mixins.inputStyle;
  }
}
</style>