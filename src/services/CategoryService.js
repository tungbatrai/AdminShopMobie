/** @format */

import API from "../utils/API";

export const CategoryService = {
  getList,
  // adminDetail,
  // adminEdit,
  categoryRegister,
  categoryUpdate,
  deleteProduct,
};
const BASE_REST_API_URL = "/category";
function getList(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&name=${data.name}`
  );
}
// function adminDetail(id) {
//   return API.get(`${BASE_REST_API_URL}`);
// }
function categoryRegister(data) {
  return API.post(`${BASE_REST_API_URL}`, data);
}

// function adminEdit(data) {
//   return API.patch(`${BASE_REST_API_URL}`, data);
// }

function categoryUpdate(id,data) {
  return API.put(`${BASE_REST_API_URL}/${id}`, data);
}

function deleteProduct(id) {
  return API.delete(`${BASE_REST_API_URL}/${id}`);
}
