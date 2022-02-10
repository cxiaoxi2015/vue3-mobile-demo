<template>
  <div class="wrapper">
    <StaticPart></StaticPart>
    <NearBy></NearBy>
  </div>
  <Docker></Docker>
</template>

<script>
import StaticPart from './StaticPart.vue'
import NearBy from './NearBy.vue'
import Docker from './Docker.vue'
export default {
  name: 'Home',
  components: {
    StaticPart,
    NearBy,
    Docker
  }
}
</script>

<style lang="scss">
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem 0.2rem 0.18rem;
}
</style>
