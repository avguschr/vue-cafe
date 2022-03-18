import axios from "axios";
import { host } from "./../index";

const shifts = () => ({
  namespaced: true,
  state: {
    shifts: [],
    id: "",
    error: "",
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
      context.commit("errorNull");
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
        .then((result) => (this.id = result.data.id))
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
      context.commit("addShift", { ...data, id: this.id });
    },
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
    getShifts(state, data) {
      state.shifts = data;
    },
    addShift(state, data) {
      state.shifts.push(data);
    },
    open(state, data) {
      state.shifts.filter((shift) => shift.id === data.id)[0].active = 1;
    },
    close(state, data) {
      state.shifts.filter((shift) => shift.id === data.id)[0].active = 0;
    },
    error(state, error) {
      state.error = error;
    },
    errorNull(state) {
      state.error = "";
    },
  },
  getters: {
    shifts: (state) => state.shifts,
    error: (state) => state.error,
  },
});

export default shifts;
