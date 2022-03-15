import axios from "axios";
import { host } from "./../index";

const shifts = () => ({
  namespaced: true,
  state: {
    shifts: [],
  },
  actions: {
    async getShifts(context) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "get",
        headers,
        url: `${host}/api-cafe/work-shift`,
      })
        .then((result) => (this.shifts = result.data))
        .catch((e) => (this.error = e.message));
      context.commit("getShifts", this.shifts);
    },
  },
  mutations: {
    getShifts(state, data) {
      state.shifts = data;
    },
  },
  getters: {
    shifts: (state) => state.shifts,
  },
});

export default shifts;
