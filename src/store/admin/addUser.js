import axios from "axios";
import { host } from "./../index";

const addUser = () => ({
  namespaced: true,
  state: {
    users: [],
  },
  actions: {
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
        .then((result) => console.log(result.data.data))
        .catch((e) => (this.error = e.message));
      context.commit("addUser", data);
    },
  },
  mutations: {
    addUser(state, data) {
      state.users.push(data);
    },
  },
});

export default addUser;
