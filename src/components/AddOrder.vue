<template>
  <div v-if="show" :class="$style.forModal">
    <div
      class="position-fixed top-50 start-50 translate-middle p-5"
      :class="$style.modal"
    >
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h2>Add an order</h2>
        <i @click="close" class="fa-solid fa-xmark"></i>
      </div>
      <form action="" method="post">
        <label for="table">Table</label>
        <input
          min="1"
          required
          v-model="table"
          class="inp"
          id="table"
          type="number"
        />
        <label for="persons">Number of persons</label>
        <input
          min="1"
          required
          v-model="persons"
          class="inp"
          id="persons"
          type="number"
        />
        <button @click.prevent="addOrder" class="but">Add</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "add-order",
  props: ["shift_id"],
  data() {
    return {
      show: false,
      table: "",
      persons: "",
      body: {},
    };
  },
  methods: {
    ...mapActions({ addOrderAction: "waiter/orders/addOrder" }),
    async addOrder() {
      if (this.table || this.persons) {
        this.body = {
          work_shift_id: this.shift_id,
          table_id: this.table,
          number_of_person: this.persons,
        };
        await this.addOrderAction(this.body);
        this.table = "";
        this.persons = "";
        this.show = false;
      }
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style module>
.modal {
  background: #fff;
  border-radius: 25px;
  box-shadow: 0px 0px 50px -1px rgba(34, 60, 80, 0.5);
}
.modal h2 {
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
