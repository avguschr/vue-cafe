<template>
  <div>
    <error v-if="error" :error="error" />
    <add-shift ref="addShift" />
    <h1 class="text-center mb-5">Shifts</h1>
    <div class="container">
      <div :class="$style.add" class="d-flex align-items-center mb-5">
        <i @click="openAddShift" class="fa-solid fa-plus"></i>
        <p @click="openAddShift" class="m-0">New shift</p>
      </div>
      <div v-for="(shift, index) in shifts" :key="index">
        <shift
          class="mb-3"
          :id="shift.id"
          :start="shift.start"
          :end="shift.end"
          :active="shift.active"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Shift from "../../components/Shift";
import AddShift from "../../components/AddShift";
import Error from "@/components/Error.vue";
export default {
  name: "shifts-component",
  components: {
    Shift,
    AddShift,
    Error,
  },
  methods: {
    ...mapActions({ getShifts: "admin/shifts/getShifts" }),
    openAddShift() {
      this.$refs.addShift.show = true;
    },
  },
  computed: {
    ...mapGetters({
      shifts: "admin/shifts/shifts",
      error: "admin/shifts/error",
    }),
  },
  async created() {
    await this.getShifts();
  },
};
</script>
<style module>
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
