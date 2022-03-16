import users from "./users";
import user from "./user";
import dismiss from "./dismiss";
import shifts from "./shifts";
import closeShift from './closeShift';
import openShift from './openShift';
import addUserShift from './addUserShift';
import removeUserShift from './removeUserShift';

const admin = () => ({
  namespaced: true,
  modules: {
    users: users(),
    user: user(),
    dismiss: dismiss(),
    shifts: shifts(),
    closeShift: closeShift(),
    openShift: openShift(),
    addUserShift: addUserShift(),
    removeUserShift: removeUserShift()
  },
});

export default admin;
