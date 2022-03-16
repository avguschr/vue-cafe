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
    async addUser(context, data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "post",
        headers,
        data,
        url: `${host}/api-cafe/user`,
      })
        .catch((e) => (this.error = e.message));
      context.commit("addUser", data);
    },
  },
  mutations: {
    getUsers(state, data) {
      state.users = data;
    },
    addUser(state, data) {
      state.users.push(data);
    },
  },
  getters: {
    users: (state) => state.users,
  },
});

export default users;
