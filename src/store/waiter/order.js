import axios from "axios";
import { host } from "..";

const order = () => ({
  namespaced: true,
  state: {
    order: {},
    position: {},
    error: "",
  },
  actions: {
    async getOrder(context, id) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/order/${id}`,
      })
        .then((result) => (this.order = result.data.data))
        .catch((e) => (this.error = e.message));
      context.commit("getOrder", this.order);
    },
    async addPosition(context, object) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const data = { menu_id: object.pos, count: object.count };
      const id = object.id;
      await axios({
        method: "post",
        headers,
        data,
        url: `${host}/api-cafe/order/${id}/position`,
      })
        .then((result) => {
          this.position = result.data;
          context.commit("addPosition", this.position);
        })
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
    },
    async deletePosition(context, object) {
      context.commit("errorNull");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const order_id = object.order_id;
      const pos_id = object.pos_id;
      await axios({
        method: "delete",
        headers,
        url: `${host}/api-cafe/order/${order_id}/position/${pos_id}`,
      })
        .then((result) => console.log(result))
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
      context.commit("deletePosition", pos_id);
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
          this.order.status = result.data.data.status;
          context.commit("change", this.order.status);
        })
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
    },
  },
  mutations: {
    getOrder(state, data) {
      state.order = data;
    },
    addPosition(state, data) {
      state.order.positions = data.data.positions;
    },
    deletePosition(state, id) {
      state.order.positions.splice(
        state.order.positions.filter((pos) => (pos.id = id)),
        1
      );
    },
    change(state, data) {
      state.order.status = data;
    },
    error(state, error) {
      state.error = error;
    },
    errorNull(state) {
      state.error = "";
    },
  },
  getters: {
    order: (state) => state.order,
    error: (state) => state.error,
  },
});

export default order;
