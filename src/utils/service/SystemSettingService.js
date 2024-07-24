import axiosInstance from "../axiosInstance/axiosInstance";



export const getAllRelation = async (payload) => {

  try {
    const responce = await axiosInstance.get(`?page=getAllRealtions`,payload);
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async (payload) => {
  try {
    const responce = await axiosInstance.get(`?page=getAllCategories` ,payload);
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAdminRoles = async (payload) => {
  try {
    const responce = await axiosInstance.get(`?page=getAdminRoles` ,payload);
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAllRoles = async (payload) => {
  try {
    const responce = await axiosInstance.get(`?page=getAllRoles` ,payload);
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};



export const deleteRelation = async (payload) => {

  let id = parseInt(payload.relation_id);
  try {
    const responce = await axiosInstance.delete(`?page=deleteRelation`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { relation_id: id },
    });
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};






export const createRelationApi = async (payload) => {
  try {
    const responce = await axiosInstance.post(`?page=createRelation`, payload);
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};