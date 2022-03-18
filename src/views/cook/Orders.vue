<template>
  <div>
    <error v-if="error" :error="error" />
    <h1 class="text-center mb-5">Active orders</h1>
    <div class="container">
      <div>
        <div>
          <div v-for="(order, index) in orders" :key="index">
            <active-order class="mb-3" :order="order" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Error from "@/components/Error.vue";
import { mapActions, mapGetters } from "vuex";
import ActiveOrder from "../../components/ActiveOrder.vue";
export default {
  name: "active-orders",
  components: {
    ActiveOrder,
    Error,
  },
  methods: {
    ...mapActions({
      getOrders: "cook/orders/orders",
    }),
  },
  computed: {
    ...mapGetters({
      orders: "cook/orders/orders",
      error: "cook/orders/error",
    }),
  },
  async created() {
    await this.getOrders();
  },
};
</script>
<style module></style>
