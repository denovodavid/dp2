<template>
  <div class="banner">
      <div class="inner">
        <div class="banner-title">
          <span>{{ text }}</span>
        </div>
        <slot>
          <!-- Placeholder -->
        </slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Banner',
  props: ['text']
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/globals/_colors.scss';
@import '../assets/sass/globals/_variables';

.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $banner-height;
  background: $grey-c;
  >.inner {
    .banner-title {
      font-family: 'Helvetica';
      font-size: 40px;
      color: $black;
      text-align: center;
    }
  }
}
</style>
