/** @format */

import Login from "./component/Login/Login";
import ForgotPassword from "./component/Login/ForgotPassword";
import ResetPassword from "./component/Login/ResetPassword";
import AdminList from "./component/AdminManager/AdminList";
import AdminRegister from "./component/AdminManager/AdminRegister";
import AdmisstionList from "./component/AdmisstionTicket/AdmisstionList";

export const routes = [
  { path: "/login", exact: false, component: Login },
  { path: "/password/forgot", exact: true, component: ForgotPassword },
  { path: "/password/reset", exact: true, component: ResetPassword },

  { path: "/index.html", exact: false, component: AdminList },
  { path: "/", exact: true, component: AdminList },

  { path: "/adminManager", exact: true, component: AdminList },
  { path: "/admin/register", exact: true, component: AdminRegister },
  { path: "/admin/edit/:id", exact: true, component: AdminRegister },

  { path: "/admissionTicket", exact: true, component: AdmisstionList },
];

export const navigation = [
  {
    mainMenu: "User - Admin ",
    url: "/adminManager",
  },
  {
    mainMenu: "Ship",
    url: "/admissionTicket",
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
