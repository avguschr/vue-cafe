import axios from "axios";
import { host } from "../index";

const orders = () => ({
  namespaced: true,
  state: {
    orders: [],
    error: "",
    status: {},
  },
  actions: {
    async orders(context) {
      context.commit("errorNull");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/order/taken/get`,
      })
        .then((result) => {
          this.orders = result.data.data;
          context.commit("orders", this.orders);
        })
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
    },
    async changeStatus(context, object) {
      context.commit("errorNull");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const data = { status: object.newStatus };
      const id = object.id;
      await axios({
        method: "patch",
        headers,
        data,
        url: `${host}/api-cafe/order/${id}/change-status`,
      })
        .then((result) => {
          this.status = result.data.data.status;
          context.commit("change", { status: this.status, id: id });
        })
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
    },
  },
  mutations: {
    orders(state, data) {
      state.orders = data;
    },
    change(state, data) {
      state.orders.filter((order) => order.id === data.id)[0].status =
        data.status;
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
