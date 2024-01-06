<script setup lang="ts">
/**
 * The component public properties.
 */
interface Props {
  search: string;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  'placeholder': 'Search'
});

interface Events {
  (e: 'update:search', value: string): void;
}

const emits = defineEmits<Events>();

/**
 * Occurs when search input has changed.
 *
 * @param e The event.
 */
function onSearchChanged(e: Event): void {
  const target = e.target;

  if (!isHTMLInputElement(target)) {
    // TODO: add error handling here.

    return;
  }

  emits('update:search', target.value);
}

</script>

<template>
  <div class="conversation-search">
    <Icon
      class="conversation-search__icon"
      name="material-symbols:search"
      size="1.5rem"
    />
    <input
      class="conversation-search__input"
      type="text"
      name="search"
      id="search"
      :value="search"
      :placeholder="placeholder"
      @input="onSearchChanged"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/tools/mixins' as mixins;

.conversation-search {
  display: flex;
  align-items: center;
  margin: 0.5rem;

  &__input {
    margin-inline-start: 0.5rem;

    @include mixins.inputStyle;
  }
}
</style>