<template>
  <div v-if="show" :class="$style.forModal">
    <div
      class="position-fixed top-50 start-50 translate-middle p-5"
      :class="$style.modal"
    >
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h2>{{ user.name }} {{ user.surname }} {{ user.patronymic }}</h2>
        <i @click="close" class="fa-solid fa-xmark"></i>
      </div>
      <div>
        <p>{{ user.status }}</p>
        <p>{{ user.group }}</p>
        <button @click="dismiss(user.id)" class="but">Dismiss</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "user-component",
  props: ["id", "user"],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    ...mapActions({ dismiss: "admin/dismiss/dismiss" }),
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
  color: var(--sherpa-blue);
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
  color: var(--ocean-green);
  transition: color linear 0.5s;
}
.modal i:hover {
  color: var(--sherpa-blue);
}
</style>
