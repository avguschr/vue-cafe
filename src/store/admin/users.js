import axios from "axios";
import { host } from "./../index";

const users = () => ({
  namespaced: true,
  state: {
    users: [],
  },
  actions: {
    async getUsers(context) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/user`,
      })
        .then((result) => (this.users = result.data.data))
        .catch((e) => (this.error = e.message));
      context.commit("getUsers", this.users);
    },
  },
  mutations: {
    getUsers(state, data) {
      state.users = data;
    },
  },
  getters: {
    users: (state) => state.users,
  },
});

export default users;
