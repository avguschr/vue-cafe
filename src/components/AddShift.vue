<template>
  <div v-if="show" :class="$style.forModal">
    <div
      class="position-fixed top-50 start-50 translate-middle p-5"
      :class="$style.modal"
    >
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h2>Add a shift</h2>
        <i @click="close" class="fa-solid fa-xmark"></i>
      </div>
      <form action="" method="post">
        <label for="start">Start</label>
        <input
          required
          placeholder="Enter start"
          v-model="start"
          class="inp"
          id="start"
          type="datetime-local"
        />
        <label for="end">End</label>
        <input
          required
          placeholder="Enter end"
          v-model="end"
          class="inp"
          id="end"
          type="datetime-local"
        />

        <button @click.prevent="addShift" class="but">Add</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "add-shift",
  data() {
    return {
      show: false,
      start: "",
      end: "",
      body: {},
    };
  },
  methods: {
    ...mapActions({ addShiftAction: "admin/shifts/addShift" }),
    async addShift() {
      this.body = {
        start: this.start.split("T").join(" "),
        end: this.end.split("T").join(" "),
      };
      await this.addShiftAction(this.body);
      this.start = "";
      this.end = "";
      this.show = false
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
