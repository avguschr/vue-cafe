import axios from "axios";
import { host } from "./../index";

const addUserShift = () => ({
  namespaced: true,
  state: {},
  actions: {
    async addUserShift(context, object) {
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
        .catch((e) => (this.error = e.message));
    },
  },
});

export default addUserShift;
