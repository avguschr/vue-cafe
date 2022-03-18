import axios from "axios";
import { host } from "./../index";

const closeShift = () => ({
  namespaced: true,
  state: {
    shift: {},
  },
  actions: {
    async closeShift(context, id) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/work-shift/${id}/close`,
      })
        .then((result) => (this.shift = result.data.data))
        .catch((e) => console.log(e.message));
      context.commit("close", this.shift);
    },
  },
  mutations: {
    close(state, data) {
      state.shift = data;
    },
  },
});

export default closeShift;
