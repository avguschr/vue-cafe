<template>
  <div v-if="show">
    <div
      :class="$style.error"
      class="d-flex align-items-center justify-content-between p-3"
    >
      <p>{{ text }}</p>
      <i @click="close" class="fa-solid fa-xmark"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "small-error",
  props: ["text"],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    close() {
      this.show = false;
    },
  },
};
</script>
<style module>
.error {
  background: crimson;
  border-radius: 25px;
}
.error p,
.error i {
  color: #fff !important;
  margin: 0;
  font-size: 1rem !important;
}
</style>
