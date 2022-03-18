<template>
  <div v-if="show" :class="$style.forModal">
    <div
      class="position-fixed top-50 start-50 translate-middle p-5"
      :class="$style.modal"
    >
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h2>Error</h2>
        <i @click="close" class="fa-solid fa-xmark"></i>
      </div>
      {{ error }}
    </div>
  </div>
</template>
<script>
export default {
  name: "error-component",
  props: ["error"],
  data() {
    return {
      show: true,
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
.modal {
  min-width: 50%;
  background: #fff;
  border-radius: 25px;
  box-shadow: 0px 0px 50px -1px rgba(34, 60, 80, 0.5);
}
.modal h2,
p {
  color: crimson;
}
.forModal {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 90;
  background: rgba(0, 0, 0, 0.24);
  left: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.modal i {
  font-size: 2rem;
  cursor: pointer;
  color: crimson;
  transition: color linear 0.5s;
}
.modal i:hover {
  color: var(--sherpa-blue);
}
.modal h1 {
  color: crimson !important;
}
</style>
