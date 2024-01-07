<script setup lang="ts">
import type { Message, User } from '~/entities';

/**
 * The component public properties.
 */
interface Props {
  messages: Message[];
  user: User
}

const props = defineProps<Props>();
const collectionElement = ref<HTMLDivElement>();

onMounted(() => {
  if (!isNullish(collectionElement.value)) {
    scrollToLastMessage(collectionElement.value);
  }
});

/**
 * Scrolls to the last child element of the given element.
 *
 * @param element The HTML element.
 */
function scrollToLastMessage(element: HTMLDivElement): void {
  const messageElements = element.children;
  const lastMessage = messageElements[messageElements.length - 1];

  lastMessage.scrollIntoView();
}

/**
 * Gets human readable time from a given unix timestamp.
 *
 * @param timestamp The unix timestamp.
 *
 * @returns The readable time.
 */
function getDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  return date.toLocaleTimeString('en-US')
}

/**
 * Indicates whether the message should be left or right depending on the user.
 *
 * @param sender The user sender.
 */
function isMessageLeft(sender: User): boolean {
  return sender.id !== props.user.id;
}
</script>

<template>
  <div
    class="conversation-message-collection"
    ref="collectionElement"
  >
    <div
      v-for="message in messages"
      class="conversation-message-collection__message-post"
      :class="{
        'conversation-message-collection__message-post--left': isMessageLeft(message.sender)
      }"
    >
      <span class="conversation-message-collection__message-post-user">
        {{ message.sender.user }}
      </span>
      <span class="conversation-message-collection__message-post-payload">
        {{ message.payload }}
      </span>
      <span class="conversation-message-collection__message-post-timestamp">
        {{ getDateTime(message.timestamp) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/styles/tools/mixins' as mixins;

.conversation-message-collection {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  margin: 0.5rem;

  overflow-x: hidden;
  overflow-y: scroll;

  &__message-post {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0.5rem 0;

    @include mixins.inputStyle; // FIXME: is yelling

    &--left {
      align-items: flex-start;
    }
  }

  &__message-post-user {
    font-weight: bold
  }

  &__message-post-timestamp {
    font-size: 0.65rem;
    font-weight: 200;
  }

  @include mixins.inputStyle; // FIXME: is yelling
}
</style>
