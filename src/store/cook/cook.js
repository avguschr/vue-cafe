import orders from "./orders";

const cook = () => ({
  namespaced: true,
  modules: {
    orders: orders(),
  },
});

export default cook;
