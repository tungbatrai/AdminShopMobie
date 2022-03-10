/** @format */

import API from "../utils/API";
export const AwsService = {
  getLink,
};

const BASE_URL = "/category/uploadUrl";

function getLink(file) {
  const formData = new FormData();
  formData.append("image", file);

  return API.post(`${BASE_URL}`, formData);
}
