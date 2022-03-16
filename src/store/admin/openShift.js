import axios from "axios";
import { host } from "./../index";

const openShift = () => ({
  namespaced: true,
  state: {
    shift: {},
    id: "",
  },
  actions: {
    async openShift(context, id) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/work-shift/${id}/open`,
      })
        .then((result) => (this.shift = result.data.data))
        .catch((e) => console.log(e));
      context.commit("open", this.shift);
    },
  },
  mutations: {
    open(state, data) {
      state.shift = data;
      state.id = data.id;
    },
  },
});

export default openShift;
