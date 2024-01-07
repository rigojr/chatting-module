<script setup lang="ts">
// TODO: using a middleware, we should check if the user can land here.

/**
 * Component private properties.
 */
type State = {
  search: string;
  message: string;
}

const state = reactive<State>({
  'search': '',
  'message': ''
});

function onMessageSent(): void {
  console.log(state);
  state.message = '';
  state.search = '';
}
</script>

<template>
  <div class="chat">
    <div class="chat__conversations">
    </div>
    <div class="chat__divider"></div>
    <div class="chat__viewport">
      <div class="chat__viewport-header">
        <ConversationUserProfileCard username="test"/>
        <ConversationSearch v-model:search="state.search"/>
      </div>
        <ConversationMessage
          v-model:message="state.message"
          @message-send="onMessageSent"
        />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/settings/colors' as colors;

.chat {
  display: flex;
  width: 75vw;
  height: 75vh;// TODO: change

  border: 0.15rem solid colors.$primary; // TODO: setting
  border-radius: 1rem; //TODO: setting
  box-shadow: 0.1rem 0.1rem 0.3rem rgba(0,0,0,0.25); // TODO: setting.

  &__conversations, &__viewport {
    flex-grow: 1;
    margin: 0.5rem; // TODO: setting
  }

  &__viewport-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__divider {
    height: 90%;
    align-self: center;

    border: 0.0625rem solid colors.$primary; // TODO: setting
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.25); // TODO: setting.
  }
}
</style>