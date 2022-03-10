/** @format */

import API from "../utils/API";

export const productService = {
  getProduct,
  // adminDetail,
  // adminRegister,
  // adminEdit,
  deleteProduct,
};
//http://localhost:5005/api/product?page=1&pageSize=10&product=1&brand=1&category=1&category_id=1&brand_id=1
const BASE_REST_API_URL = "/product";
function getProduct(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&product=${data.product}&brand=${data.brand}&category=${data.category}&category_id=${data.category_id}&brand_id=${data.brand_id}`
  );
}
// function adminDetail(id) {
//   return API.get(`${BASE_REST_API_URL}`);
// }
// function adminRegister(data) {
//   return API.post(`${BASE_REST_API_URL}`, data);
// }

// function adminEdit(data) {
//   return API.patch(`${BASE_REST_API_URL}`, data);
// }

function deleteProduct(id) {
  return API.delete(`${BASE_REST_API_URL}/${id}`);
}
