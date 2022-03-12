/** @format */

import API from "../utils/API";

export const CommentService = {
  getList,
};
const BASE_REST_API_URL = "/comment";
function getList(data) {
  return API.get(
    `${BASE_REST_API_URL}?page=${data.pageable.pageNumber}&pageSize=${data.pageable.pageSize}&product=${data.product}&commenter=${data.commenter}&startDate=${data.startFillDate}&endDate=${data.endFillDate}`
  );
}
