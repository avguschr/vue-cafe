<template>
  <div v-if="show" :class="$style.forModal">
    <div
      class="position-fixed top-50 start-50 translate-middle p-5"
      :class="$style.modal"
    >
      <div class="d-flex align-items-center justify-content-between mb-3">
        <h2>Order {{ order.id }}</h2>
        <i @click="close" class="fa-solid fa-xmark"></i>
      </div>
      <div>
        <p>Table {{ order.table }}</p>
        <p>Workers {{ order.shift_workers }}</p>
        <p>{{ order.status }}</p>
        <h3 v-if="len">Positions</h3>
        <div
          class="mb-3 d-flex justify-content-between pos"
          :class="$style.pos"
          v-for="(pos, index) in order.positions"
          :key="index"
        >
          <div>
            <p>{{ pos.position }}</p>
            <p>{{ pos.price }}$</p>
          </div>
          <div>
            <i @click="deletePosition(pos.id)" class="fa-solid fa-xmark"></i>
          </div>
        </div>
        <p>Total {{ order.price }}$</p>
        <div>
          <button @click="showInp = !showInp" class="but mb-3">
            Change status
          </button>
          <button @click="showForm = !showForm" class="but mb-3 m-2">
            Add position
          </button>
        </div>
        <input
          v-if="showInp"
          @keypress.enter="changeStatus"
          v-model="newStatus"
          placeholder="Write a new status"
          type="text"
          class="inp"
        />

        <form
          @keypress.enter="addPosition"
          v-if="showForm"
          action=""
          method="post"
        >
          <label for="pos">Position id</label>
          <input v-model="posId" id="pos" type="number" class="inp" min="1" />
          <label for="count">Count</label>
          <input v-model="count" id="count" type="number" class="inp" min="1" />
        </form>
      </div>
      <small-error ref="error" v-if="error" :text="error" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SmallError from "./SmallError.vue";
export default {
  components: { SmallError },
  name: "get-order",
  props: ["order"],
  data() {
    return {
      show: false,
      showInp: false,
      newStatus: "",
      len: this.order?.positions?.length,
      showForm: false,
      posId: "",
      count: "",
    };
  },
  methods: {
    ...mapActions({
      changeStatusAction: "waiter/order/changeStatus",
      addPosAction: "waiter/order/addPosition",
      delPosition: "waiter/order/deletePosition",
    }),
    close() {
      this.show = false;
      this.showInputAdd = false;
      this.showForm = false;
    },
    async changeStatus() {
      if (this.showInp) {
        await this.changeStatusAction({
          id: this.order.id,
          newStatus: this.newStatus,
        });
        this.newStatus = "";

        if (this.error) {
          this.$refs.error.show = true;
        } else {
          this.showInp = false;
        }
      }
    },
    async addPosition() {
      if (this.posId || this.count) {
        console.log(this.error);
        await this.addPosAction({
          id: this.order.id,
          pos: +this.posId,
          count: +this.count,
        });
        if (this.error) {
          this.$refs.error.show = true;
        } else {
          this.showForm = false;
        }
        this.posId = "";
        this.count = "";
      }
    },
    async deletePosition(id) {
      this.delPosition({ order_id: this.order.id, pos_id: id });
    },
  },
  computed: {
    ...mapGetters({ error: "waiter/order/error" }),
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
.pos {
  background: var(--sherpa-blue);
  padding: 1rem;
  border-radius: 25px;
}

.pos p {
  color: #fff;
  margin: 0;
  font-size: 1rem;
}

.pos i:hover {
  color: #fff !important;
}
</style>
