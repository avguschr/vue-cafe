import axios from "axios";
import { host } from "..";

const dismiss = () => ({
  namespaced: true,
  state: {
    status: "",
  },
  actions: {
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
        .then((result) => (this.status = result.data.status))
        .catch((e) => (this.error = e.message));
      context.commit("dismiss", this.status);
    },
  },
  mutations: {
    dismiss(state, data) {
      state.status = data;
    },
  },
});

export default dismiss;
