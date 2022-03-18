import axios from "axios";
import { host } from "..";

const user = () => ({
  namespaced: true,
  state: {
    user: {},
    status: "",
  },
  actions: {
    async getUser(context, id) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/user/${id}`,
      })
        .then((result) => (this.user = result.data.data))
        .catch((e) => (this.error = e.message));
      context.commit("getUser", this.user);
    },
    async dismiss(context, id) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/user/${id}/to-dismiss`,
      })
        .then((result) => (this.status = result.data.data.status))
        .catch((e) => (this.error = e.message));
      context.commit("dismiss", { status: this.status, id: id });
    },
  },
  mutations: {
    getUser(state, data) {
      state.user = data;
    },
    dismiss(state, data) {
      console.log(state.user);
      state.user.status = data.status;
    },
  },
  getters: {
    user: (state) => state.user,
  },
});

export default user;
