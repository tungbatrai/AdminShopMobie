import API from "../utils/API";

export const AdminService = {
  getAdmin,
  adminDetail,
  adminRegister,
  adminEdit,
  adminDeleteList,
};

const BASE_REST_API_URL = "/user";

function getAdmin(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&size=${data.pageable.pageSize}`
  );
}
function adminDetail(id) {
  return API.get(`${BASE_REST_API_URL}`);
}
function adminRegister(data) {
  return API.post(`${BASE_REST_API_URL}`, data);
}

function adminEdit(data) {
  return API.patch(`${BASE_REST_API_URL}`, data);
}

function adminDeleteList(data) {
  return API.delete(`${BASE_REST_API_URL}`, data);
}
