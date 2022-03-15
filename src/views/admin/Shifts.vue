<template>
  <div>
    <h1 class="text-center mb-5">Shifts</h1>
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
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Shift from "../../components/Shift";
export default {
  name: "shifts-component",
  components: {
    Shift,
  },
  methods: {
    ...mapActions({ getShifts: "admin/shifts/getShifts" }),
  },
  computed: {
    ...mapGetters({ shifts: "admin/shifts/shifts" }),
  },
  async created() {
    await this.getShifts();
  },
};
</script>
<style></style>
