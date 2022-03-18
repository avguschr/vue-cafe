import orders from "./orders";
import order from "./order";
import acceptedOrders from "./acceptedOrders";
import changeStatus from "./changeStatus";

const waiter = () => ({
  namespaced: true,
  modules: {
    orders: orders(),
    order: order(),
    acceptedOrders: acceptedOrders(),
    changeStatus: changeStatus(),
  },
});

export default waiter;
