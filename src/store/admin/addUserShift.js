import axios from "axios";
import { host } from "./../index";

const addUserShift = () => ({
  namespaced: true,
  state: {
    error: "",
  },
  actions: {
    async addUserShift(context, object) {
      context.commit("errorNull");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const data = { user_id: object.user_id };
      const id = object.shift_id;
      await axios({
        method: "post",
        headers,
        data,
        url: `${host}/api-cafe/work-shift/${id}/user`,
      })
        .then((result) => console.log(result.data))
        .catch((e) => {
          this.error = e;
          context.commit("error", this.error);
        });
    },
  },
  mutations: {
    error(state, error) {
      state.error = error;
    },
    errorNull(state) {
      state.error = "";
    },
  },
  getters: {
    error: (state) => state.error,
  },
});

export default addUserShift;
