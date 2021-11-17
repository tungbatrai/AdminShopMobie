import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const User = React.lazy(() => import("./views/user/user"));
const UserNew = React.lazy(() => import("./views/user/UserRegister"));
const UserDetai = React.lazy(() => import("./views/user/UserDetail"));
const Product = React.lazy(() => import("./views/product/Product"));
const ProdcutDetail = React.lazy(() => import("./views/product/ProductDetail"));
const ProdcutNew = React.lazy(() => import("./views/product/ProductNew"));
const Category = React.lazy(() => import("./views/category/Category"));
const Brand = React.lazy(() => import("./views/brand/Brand"));
// Base

const routes = [
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/user", exact: true, name: "user", component: User },
  { path: "/user/new", exact: true, name: "New", component: UserNew },
  { path: "/user/edit/:id", name: "edit", component: UserDetai },
  { path: "/product", exact: true, name: "Product", component: Product },

  { path: "/product/new", name: "New", component: ProdcutNew },

  {
    path: "/product/edit/:id",
    exact: true,
    name: "Edit",
    component: ProdcutDetail,
  },
  
  { path: "/category", name: "category", component: Category },
  { path: "/brand", name: "brand", component: Brand },
  { path: "/", exact: true, name: "Dashboard", component: Dashboard },
];
export default routes;
