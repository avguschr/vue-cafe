import users from "./users";
import addUser from "./addUser";
import user from "./user";
import dismiss from "./dismiss";
import shifts from "./shifts";

const admin = () => ({
  namespaced: true,
  modules: {
    users: users(),
    addUser: addUser(),
    user: user(),
    dismiss: dismiss(),
    shifts: shifts()
  },
});

export default admin;
