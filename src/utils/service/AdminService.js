import axiosInstance from "../axiosInstance/axiosInstance";

export const createAdminApi = async (payload) => {
  try {
    const responce = await axiosInstance.post(`?page=createAdmin`, payload);
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdminsApi = async (payload) => {
  const { pg, items_per_page } = payload;
  try {
    const responce = await axiosInstance.get(`?page=getAdmins&pg=${pg}&items_per_page=${items_per_page}`);
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEditAdminApi = async (payload) => {
  try {
    const responce = await axiosInstance.post(`?page=editAdmin` ,payload);
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};
