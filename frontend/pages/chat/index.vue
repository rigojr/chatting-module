<script setup lang="ts">
// TODO: using a middleware, we should check if the user can land here.

import type { Message, User } from '~/entities';
import data from './fake-messages.json';
import dataUser from './fake-users.json';
const testMessages = data.messages as Message[]; // FIXME: For testing purpose.
const testUser = data.messages[0].sender as User;
const testUsers = dataUser.users as User[];

/**
 * Component private properties.
 */
type State = {
  search: string;
  message: string;
  userSelected?: User;
}

const state = reactive<State>({
  'search': '',
  'message': '',
  'userSelected': undefined
});

/**
 * Occurs when a message has been sent.
 */
function onMessageSent(): void {
  console.log(state);
  state.message = '';
  state.search = '';
}

/**
 * Occurs when an user has been selected.
 *
 * @param user The selected user.
 */
function onUserSelected(user: User): void {
  console.log(user);
  state.userSelected = user;
}

/**
 * TODO: pending to test.
 */
const messagesFiltered = computed(() => {
  if (state.search === '') { // TODO: is empty.
    return testMessages;
  }

  return Array.from(testMessages).filter((message) => message.payload.includes(state.search));
});

</script>

<template>
  <div class="chat">
    <div class="chat__conversations">
      <ConversationUserProfileCard
        class="chat__conversations-profile-card"
        v-for="user in testUsers"
        :username="user.user"
        :image-src="user.profilePicture"
        @click="() => onUserSelected(user)"
      />
    </div>
    <div class="chat__divider"></div>
    <div class="chat__viewport">
      <div class="chat__viewport-header">
        <ConversationUserProfileCard username="test"/>
        <ConversationSearch v-model:search="state.search"/>
      </div>
        <ConversationMessageCollection
          :messages="testMessages"
          :user="testUser"
        />
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

  &__conversations {
    min-height: 0;
    min-width: 20%;

    overflow-x: hidden;
    overflow-y: scroll;
  }

  &__conversations-profile-card {
    margin: 0.5rem 0.5rem;

    border-bottom: 0.1rem solid rgba(0,0,0,0.45); //TODO: setting.

    transition: all ease-in-out 0.5s;

    &:hover {
      background-color: rgba(0,0,0,0.1);

      cursor: pointer;
    }
  }

  &__divider {
    height: 90%;
    align-self: center;

    border: 0.0625rem solid colors.$primary; // TODO: setting
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.25); // TODO: setting.
  }

  &__viewport {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__viewport-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__conversations, &__viewport {
    margin: 0.5rem; // TODO: setting
  }
}
</style>