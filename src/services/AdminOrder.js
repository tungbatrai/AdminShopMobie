/** @format */

import API from "../utils/API";

export const OrdersService = {
  getOrders,
  OrdersDetail,
  OrdersRegister,
  OrdersEdit,
  OrdersDeleteList,
  OrderShip,
  OrderCompleted,
};
//http://localhost:5005/api/order?page=1&pageSize=10&product=product&brand=brand&user=user&category=category&status=status
const BASE_REST_API_URL = "/order";
function getOrders(data, status) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&product=${data.product}&brand=${data.brand}&user=${data.user}&category=${data.category}&status=${status}&startDate=${data.startFillDate}&endDate=${data.endFillDate}`
  );
}
function OrdersDetail(id) {
  return API.get(`${BASE_REST_API_URL}`);
}
function OrdersRegister(data) {
  return API.post(`${BASE_REST_API_URL}`, data);
}

function OrdersEdit(data) {
  return API.patch(`${BASE_REST_API_URL}`, data);
}

function OrdersDeleteList(id) {
  return API.delete(`${BASE_REST_API_URL}/${id}`);
}
function OrderShip(id, shipCode) {
  return API.put(`${BASE_REST_API_URL}/${id}`, shipCode);
}
function OrderCompleted(id) {
  // return API.delete(`${BASE_REST_API_URL}/${id}`);
}
