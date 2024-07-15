import axiosInstance from "../axiosInstance/axiosInstance";


export const createEventApi = async (payload) => {
    try {
      const responce = await axiosInstance.post(`?page=createEvent`, payload);
      return responce.data;
    } catch (error) {
      console.log(error);
    }
  };