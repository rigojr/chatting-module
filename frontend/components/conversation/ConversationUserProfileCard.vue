<script setup lang="ts">
/**
 * The component public properties.
 */
interface Props {
  image?: File;
  username: string;
}

const props = defineProps<Props>();
const isProfileImageAvailable = computed(() => !isNullish(props.image));

/**
 * Gets the image source from a given file.
 *
 * @param file The file.
 *
 * @returns The image source.
 */
function getImageSrc(file: File): string {
  return URL.createObjectURL(file);
}

</script>

<template>
  <div class="user-profile-card">
    <div class="user-profile-card__profile-picture">
      <img
        v-if="isProfileImageAvailable"
        class="user-profile-card__profile-image"
        :src="getImageSrc(image)"
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

  &__username {
    flex-grow: 1;
  }
}
</style>
