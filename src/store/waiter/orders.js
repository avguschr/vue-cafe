import axios from "axios";
import { host } from "../index";

const orders = () => ({
  namespaced: true,
  state: {
    orders: [],
    order: "",
    error: "",
  },
  actions: {
    async orders(context, id) {
      context.commit("errorNull");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/work-shift/${id}/order`,
      })
        .then((result) => (this.orders = result.data.data.orders))
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
      context.commit("orders", this.orders);
    },
    async addOrder(context, data) {
      context.commit("errorNull");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "post",
        headers,
        data,
        url: `${host}/api-cafe/order`,
      })
        .then((result) => (this.order = result.data.data))
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
      context.commit("addOrder", this.order);
    },
  },
  mutations: {
    orders(state, data) {
      state.orders = data;
    },
    addOrder(state, data) {
      console.log(data, state.orders);
      state.orders.push(data);
    },
    error(state, error) {
      state.error = error;
    },
    errorNull(state) {
      state.error = "";
    },
  },
  getters: {
    orders: (state) => state.orders,
    error: (state) => state.error,
  },
});

export default orders;
