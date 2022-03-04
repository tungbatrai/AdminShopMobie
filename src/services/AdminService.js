/** @format */

import API from "../utils/API";

export const AdminService = {
  getAdmin,
  // adminDetail,
  // adminRegister,
  // adminEdit,
 // adminDeleteList,
};

const BASE_REST_API_URL = "/user";
function getAdmin(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&name=${data.name}&email=${data.email}&phone=${data.phone}&role=${data.role}`
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

// function adminDeleteList(data) {
//   return API.delete(`${BASE_REST_API_URL}`, data);
// }
