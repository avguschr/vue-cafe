import axios from "axios";
import { host } from "./../index";

const removeUserShift = () => ({
  namespaced: true,
  state: {
    error: "",
  },
  actions: {
    async removeUserShift(context, object) {
      context.commit("errorNull");
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const shift_id = object.shift_id;

      const user_id = object.user_id;
      await axios({
        method: "delete",
        headers,
        url: `${host}/api-cafe/work-shift/${shift_id}/user/${user_id}`,
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

export default removeUserShift;
