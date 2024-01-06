<script setup lang="ts">
/**
 * The component public properties.
 */
interface Props {
  imageSrc?: string;
  username: string;
}

const props = defineProps<Props>();
const isProfileImageAvailable = computed(() => !isNullish(props.imageSrc));
</script>

<template>
  <div class="user-profile-card">
    <div class="user-profile-card__profile-picture">
      <img
        v-if="isProfileImageAvailable"
        class="user-profile-card__profile-image"
        :src="imageSrc"
      />
      <Icon
        v-else
        class="user-profile-card__profile-placeholder"
        name="material-symbols:person"
        size="2rem"
      />
    </div>
    <span class="user-profile-card__username">
      {{ username }}
    </span>
  </div>
</template>

<style lang="scss">
.user-profile-card {
  display: flex;
  align-items: center;

  &__profile-picture {
    width: 2rem;
    height: 2rem;
    margin-inline-end: 1rem;

    border-radius: 10rem;
  }
}
</style>
