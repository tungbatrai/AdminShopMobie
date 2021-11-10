import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";

import routes from "../routes";
import { useHistory } from "react-router-dom";
import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";

const AppBreadcrumb = () => {
  const history = useHistory();
  const currentLocation = useLocation().pathname;
  const [DataBreadcrumb, setDataBreadcrumb] = useState([]);
  const [breadcrumbNow, setBreadcrumbNow] = useState([]);

  useEffect(() => {
    //  var breadcrumb = []
    var checkBreadcrumb = [];
    //console.log(currentLocation,currentLocation.split('/'),currentLocation.split('/').length)
    checkBreadcrumb = currentLocation.split("/");
    var breadcrumb = checkBreadcrumb.shift();
    setBreadcrumbNow(checkBreadcrumb[checkBreadcrumb.length - 1].toUpperCase());
    checkBreadcrumb.pop();

    setDataBreadcrumb(checkBreadcrumb);
  }, [currentLocation]);

  function handleMove(url) {
    history.push(`/${url}`);
  }
  // const getRouteName = (pathname, routes) => {
  //   const currentRoute = routes.find((route) => route.path === pathname)
  //   return currentRoute.name
  // }

  // const getBreadcrumbs = (location) => {
  //   const breadcrumbs = []
  //   location.split('/').reduce((prev, curr, index, array) => {
  //     const currentPathname = `${prev}/${curr}`
  //     breadcrumbs.push({
  //       pathname: currentPathname,
  //       name: getRouteName(currentPathname, routes),
  //       active: index + 1 === array.length ? true : false,
  //     })
  //     return currentPathname
  //   })
  //   return breadcrumbs
  // }

  // const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      {/* <CBreadcrumbItem href="/">Home</CBreadcrumbItem> */}
      {/* {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })} */}
      <CBreadcrumbItem>
        {DataBreadcrumb?.map((item, index) => {
          return (
            <span key={index}>
              {index === 0 ? (
                <span>
                  <NavLink to={`/${item}`} style={{ textDecoration: "none" }}>
                    <b>{item.toUpperCase()} </b>
                  </NavLink>{" "}
                  /
                  {/* <b  onClick={() => handleMove(item)}>{item.toUpperCase()}</b> /  */}
                </span>
              ) : (
                <span> {item.toUpperCase()} / </span>
              )}
            </span>
          );
        })}
        <span>{breadcrumbNow}</span>
      </CBreadcrumbItem>
    </CBreadcrumb>
  );
};

export default React.memo(AppBreadcrumb);
