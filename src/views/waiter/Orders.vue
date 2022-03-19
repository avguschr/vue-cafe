<template>
  <div>
    <error v-if="error" :error="error" />
    <add-order :shift_id="shiftId" ref="addOrder" />
    <div>
      <h1 class="text-center mb-5">Orders</h1>
      <div class="container">
        <div :class="$style.add" class="d-flex align-items-center mb-5">
          <i @click="openAddOrder" class="fa-solid fa-plus"></i>
          <p @click="openAddOrder" class="m-0">New order</p>
        </div>
        <div
          class="d-flex justify-content-center flex-column align-items-center mb-5"
          style="width: 100%"
        >
          <div style="width: 50%">
            <input
              v-model="shiftId"
              placeholder="Enter number of shift"
              class="inp"
              type="number"
              min="1"
            />
          </div>
          <button @click.prevent="getAllOrders" class="but">Show</button>
        </div>
        <div
          v-if="!accepted"
          :class="$style.add"
          class="d-flex align-items-center mb-5"
        >
          <i
            @click="showAcceptedOrders"
            class="fa-solid fa-file-circle-check"
          ></i>
          <p @click="showAcceptedOrders" class="m-0">Accepted orders</p>
        </div>
        <div v-else :class="$style.add" class="d-flex align-items-center mb-5">
          <i @click="showAcceptedOrders" class="fa-solid fa-arrow-left"></i>
          <p @click="showAcceptedOrders" class="m-0">Back</p>
        </div>
        <div v-if="!accepted">
          <div v-if="orders.length">
            <div v-for="(order, index) in orders" :key="index">
              <order
                class="mb-3"
                :id="order.id"
                :table="order.table"
                :workers="order.shift_workers"
                :price="order.price"
              />
            </div>
          </div>
          <div v-else class="text-center">
            <h2>Orders are not exists</h2>
          </div>
        </div>

        <div v-else>
          <div>
            <div v-for="(accepted, index) in getAccepted.orders" :key="index">
              <order
                class="mb-3"
                :id="accepted.id"
                :table="accepted.table"
                :workers="accepted.shift_workers"
                :price="accepted.price"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Order from "../../components/Order.vue";
import AddOrder from "../../components/AddOrder.vue";
import Error from "@/components/Error.vue";
export default {
  name: "orders-component",
  data() {
    return {
      shiftId: 1,
      accepted: false,
    };
  },
  components: {
    Order,
    AddOrder,
    Error,
  },
  methods: {
    ...mapActions({
      ordersAction: "waiter/orders/orders",
      acceptedOrdersAction: "waiter/acceptedOrders/acceptedOrders",
    }),
    openAddOrder() {
      this.$refs.addOrder.show = true;
    },
    getAllOrders() {
      this.accepted = false;
      this.ordersAction(this.shiftId);
    },
    showAcceptedOrders() {
      this.accepted = !this.accepted;
      if (this.accepted) {
        this.acceptedOrdersAction(this.shiftId);
      }
    },
  },
  computed: {
    ...mapGetters({
      orders: "waiter/orders/orders",
      getAccepted: "waiter/acceptedOrders/orders",
      error: "waiter/orders/error",
    }),
  },
  created() {
    this.ordersAction(this.shiftId);
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
