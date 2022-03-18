<template>
  <div>
    <div :class="$style.card">
      <div class="mb-3">
        <h2>Order {{ order.id }}</h2>
        <p>Table {{ order.table }}</p>
        <p>Workers: {{ order.workers }}</p>
        <p>{{ order.status }}</p>
        <p>{{ order.price }}$</p>
      </div>

      <div :class="$style.add" class="d-flex align-items-center">
        <i @click="showInp = !showInp" class="fa-solid fa-pen-to-square"></i>
        <p @click="showInp = !showInp">Change status</p>
      </div>
      <input
        v-if="showInp"
        @keypress.enter="changeStatus"
        v-model="newStatus"
        placeholder="Write a new status"
        type="text"
        class="inp mt-3"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "active-order",
  data() {
    return {
      showInp: false,
      newStatus: "",
    };
  },
  props: ["order"],
  components: {},
  methods: {
    ...mapActions({
      changeStatusAction: "cook/orders/changeStatus",
    }),
    async changeStatus() {
      if (this.showInp) {
        await this.changeStatusAction({
          id: this.order.id,
          newStatus: this.newStatus,
        });
        this.newStatus = "";
        this.showInp = false;
      }
    },
  },
  computed: {},
};
</script>
<style module>
.card {
  border-radius: 15px;
  padding: 1rem;
  background: #fff;
  box-shadow: 0px 0px 61px -11px rgba(34, 60, 80, 0.2) inset;
  transition: box-shadow linear 0.5s;
}
.card h2 {
  font-size: 2rem;
  color: var(--ocean-green);
}
.card p {
  color: var(--sherpa-blue);
}
.card p,
.card h2 {
  margin: 0;
}
.card:hover {
  box-shadow: 0px 0px 51px -1px rgba(34, 60, 80, 0.7) inset;
  cursor: pointer;
}
.add i {
  margin-right: 0.2rem;
}
.add {
  color: var(--elf-green);
  transition: color linear 0.5s;
}
.add i,
.add p {
  cursor: pointer;
  font-size: 1.5rem;
}
.add:hover {
  color: var(--sherpa-blue);
}
</style>
