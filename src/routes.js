/** @format */

import Login from "./component/Login/Login";
import ForgotPassword from "./component/Login/ForgotPassword";
import ResetPassword from "./component/Login/ResetPassword";
import AdminList from "./component/AdminManager/AdminList";
import AdminRegister from "./component/AdminManager/AdminRegister";
import AdminOrders from "./component/AdminOrders/AdminOrders";
import ProductManager from "./component/ProductManager/ProductManager";
import ProductRegisterDetail from "./component/ProductManager/ProductRegisterDetail";
import ProductTypeManager from "./component/ProductManager/PrductTypeManage";
import CategoryManager from "./component/Category/CategoryManager";
import RatingManager from "./component/Rating/RatingManager";
import Comment from "./component/Comment/Comment";
import Banner from "./component/Banner/Banner";
export const routes = [
  { path: "/login", exact: false, component: Login },
  { path: "/password/forgot", exact: true, component: ForgotPassword },
  { path: "/password/reset", exact: true, component: ResetPassword },

  { path: "/index.html", exact: false, component: AdminList },
  { path: "/", exact: true, component: AdminList },

  { path: "/admin", exact: true, component: AdminList },
  { path: "/admin/register", exact: true, component: AdminRegister },
  { path: "/admin/edit/:id", exact: true, component: AdminRegister },

  { path: "/orders-shipping", exact: true, component: AdminOrders },
  { path: "/orders-completed", exact: true, component: AdminOrders },
  { path: "/orders/register", exact: true, component: AdminRegister },
  { path: "/orders/edit/:id", exact: true, component: AdminRegister },

  { path: "/product", exact: true, component: ProductManager },
  { path: "/product/category", exact: true, component: CategoryManager },
  { path: "/product/product", exact: true, component: ProductManager },
  { path: "/product/banner", exact: true, component: Banner },  
  { path: "/product/product/edit/:id", exact: true, component: ProductRegisterDetail },
  { path: "/product/product/register", exact: true, component: ProductRegisterDetail },
  { path: "/product/product/product-type/:id", exact: true, component: ProductTypeManager },

  { path: "/rating", exact: true, component: RatingManager },
  { path: "/comment", exact: true, component: Comment },
];

export const navigation = [
  {
    mainMenu: "User - Admin ",
    url: "/admin",
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
      { name: "Category", url: "/product/category" },
      { name: "Product", url: "/product/product" },
      { name: "Banner", url: "/product/banner" },
    ],
  },
  {
    mainMenu: "Comment",
    url: "/comment",
  },
  {
    mainMenu: "Rating",
    url: "/rating",
  },
];

export default routes;
