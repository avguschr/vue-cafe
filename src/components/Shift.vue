<template>
  <div @click="changeStatus(id)">
    <div :class="$style.card">
      <h2>Shift {{ id }}</h2>
      <p>Start {{ start }}</p>
      <p>End {{ end }}</p>
      <p v-if="active">Active</p>
      <p v-else>Not active</p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "shift-component",
  props: ["id", "start", "end", "active"],
  methods: {
    ...mapActions({
      closeShift: "admin/closeShift/closeShift",
      openShift: "admin/openShift/openShift",
    }),
    async changeStatus(id) {
      if (this.active) {
        await this.closeShift(id);
        window.location.reload()
      } else {
        await this.openShift(id)
        window.location.reload()
      }
    },
  },
};
</script>
<style module>
.card {
  border-radius: 15px;
  padding: 1rem;
  background: var(--ocean-green);
  box-shadow: 0px 0px 61px -11px rgba(34, 60, 80, 0.2) inset;
  transition: box-shadow linear 0.5s;
}
.card h2 {
  font-size: 2rem;
  color: #fff;
}
.card p {
  color: var(--sherpa-blue);
}
.card p,
.card h2 {
  margin-bottom: 0.5rem;
}
.card:hover {
  box-shadow: 0px 0px 51px -1px rgba(34, 60, 80, 0.7) inset;
  cursor: pointer;
}
</style>
