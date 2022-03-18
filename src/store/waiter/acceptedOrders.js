import axios from "axios";
import { host } from "..";

const acceptedOrders = () => ({
  namespaced: true,
  state: {
    orders: [],
  },
  actions: {
    async acceptedOrders(context, id) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/work-shift/${id}/order`,
      })
        .then((result) => (this.orders = result.data.data))
        .catch((e) => (this.error = e.message));
      context.commit("acceptedOrders", this.orders);
    },
  },
  mutations: {
    acceptedOrders(state, data) {
      state.orders = data;
    },
  },
  getters: {
    orders: (state) => state.orders,
  },
});

export default acceptedOrders;
