import axios from "axios";
import { host } from "./../index";

const changeStatus = () => ({
  namespaced: true,
  state: {},
  actions: {
    async changeStatus(context, object) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      const data = { status: object.newStatus };
      const id = object.id;
      await axios({
        method: "patch",
        headers,
        data,
        url: `${host}/api-cafe/order/${id}/change-status`,
      })
        .then((result) => console.log(result.data))
        .catch((e) => (this.error = e.message));
    },
  },
});

export default changeStatus;
