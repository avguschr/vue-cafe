import axios from "axios";
import { host } from "./../index";

const users = () => ({
  namespaced: true,
  state: {
    users: [],
    status: "",
    id: "",
    error: "",
  },
  actions: {
    async getUsers(context) {
      context.commit("errorNull");
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
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
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
        .then((result) => (this.id = result.data.data.id))
        .catch((e) => (this.error = e.message));
      context.commit("addUser", { ...data, id: this.id });
    },
    async dismiss(context, id) {
      context.commit("errorNull");
      const uId = id;
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/user/${id}/to-dismiss`,
      })
        .then((result) => {
          this.status = result.data.data.status;
          context.commit("dismiss", { status: this.status, id: uId });
        })
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
    },
  },
  mutations: {
    getUsers(state, data) {
      state.users = data;
    },
    addUser(state, data) {
      state.users.push({ ...data, status: "working" });
    },
    dismiss(state, data) {
      state.users.filter((user) => user.id === data.id)[0].status = data.status;
      console.log(state.users[data.id]);
    },
    error(state, error) {
      state.error = error;
    },
    errorNull(state) {
      state.error = "";
    },
  },
  getters: {
    users: (state) => state.users,
    error: (state) => state.error,
  },
});

export default users;
