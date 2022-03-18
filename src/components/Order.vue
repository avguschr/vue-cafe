<template>
  <div>
    <get-order ref="order" :order="getOrder" />
    <div @click="openOrder" :class="$style.card">
      <h2>Order {{ id }}</h2>
      <p>Table {{ table }}</p>
      <p>Workers: {{ workers }}</p>
      <p>{{ status }}</p>
      <p>{{ price }}$</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import GetOrder from "./GetOrder";
export default {
  name: "order-component",
  props: ["id", "table", "workers", "status", "price"],
  components: {
    GetOrder,
  },
  methods: {
    ...mapActions({ getOrderAction: "waiter/order/getOrder" }),
    async openOrder() {
      this.$refs.order.show = true;
      await this.getOrderAction(this.id);
    },
  },
  computed: {
    ...mapGetters({ getOrder: "waiter/order/order" }),
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
