/** @format */

import Login from "./component/Login/Login";
import ForgotPassword from "./component/Login/ForgotPassword";
import ResetPassword from "./component/Login/ResetPassword";
import AdminList from "./component/AdminManager/AdminList";
import AdminRegister from "./component/AdminManager/AdminRegister";
import AdminOrders from "./component/AdminOrders/AdminOrders";

export const routes = [
  { path: "/login", exact: false, component: Login },
  { path: "/password/forgot", exact: true, component: ForgotPassword },
  { path: "/password/reset", exact: true, component: ResetPassword },

  { path: "/index.html", exact: false, component: AdminList },
  { path: "/", exact: true, component: AdminList },

  { path: "/adminManager", exact: true, component: AdminList },
  { path: "/admin/register", exact: true, component: AdminRegister },
  { path: "/admin/edit/:id", exact: true, component: AdminRegister },

  { path: "/orders-shipping", exact: true, component: AdminOrders },
  { path: "/orders-completed", exact: true, component: AdminOrders },
  { path: "/orders/register", exact: true, component: AdminRegister },
  { path: "/orders/edit/:id", exact: true, component: AdminRegister },
];

export const navigation = [
  {
    mainMenu: "User - Admin ",
    url: "/adminManager",
  },

  {
    mainMenu: "Orders",
    subMenu: [
      { name: "Orders shipping", url: "/orders-shipping" },
      { name: "Orders completed", url: "/orders-completed" },
    ],
  },
  {
    mainMenu: "List- Item",
    subMenu: [
      { name: "Category", url: "/companies" },
      { name: "Product", url: "/branches" },
    ],
  },
  {
    mainMenu: "Comment",
    url: "/product",
  },
  {
    mainMenu: "Sale",
    url: "/product",
  },
  {
    mainMenu: "Rating",
    url: "/product",
  },

  {
    mainMenu: "banner",
    url: "/product",
  },
];

export default routes;
