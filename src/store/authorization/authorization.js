import login from "./login";
import logout from "./logout";
const authorization = () => ({
  namespaced: true,
  modules: {
    login: login(),
    logout: logout(),
  },
});

export default authorization;
