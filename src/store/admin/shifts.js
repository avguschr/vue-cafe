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
    async addShift(context, data) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      await axios({
        method: "post",
        headers,
        data,
        url: `${host}/api-cafe/work-shift`,
      })
        .catch((e) => (this.error = e.message));
      context.commit("addShift", data);
    },
  },
  mutations: {
    getShifts(state, data) {
      state.shifts = data;
    },
    addShift(state, data) {
      state.shifts.push(data);
    },
  },
  getters: {
    shifts: (state) => state.shifts,
  },
});

export default shifts;
