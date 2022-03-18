import VueRouter from "vue-router";
import Vue from "vue";
import Login from "../views/authorization/Login";
import Home from "../views/Home";
import Logout from "../views/authorization/Logout";
import Users from "../views/admin/Users";
import Shifts from "../views/admin/Shifts";
import Orders from "../views/waiter/Orders";
import ActiveOrders from "../views/cook/Orders";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/login", name: "login", component: Login },
    { path: "/", name: "home", component: Home },
    { path: "/logout", name: "logout", component: Logout },
    { path: "/users", name: "users", component: Users },
    { path: "/shifts", name: "shifts", component: Shifts },
    { path: "/orders", name: "orders", component: Orders },
    { path: "/active-orders", name: "active-orders", component: ActiveOrders },
  ],
});

export default router;
