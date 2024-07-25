import axiosInstance from "../axiosInstance/axiosInstance"

export const DashboardApi = async (payload) => {
    const { items_per_page, page } = payload;
    try {
        const response = await axiosInstance.get(`?page=getAllUserData&items_per_page=${items_per_page}&pg=${page}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to load dashboard data");
    }
}

export const CreateUser = async (payload) => {
    try {
        const responce = await axiosInstance.post(`?page=createUser`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}
export const EditUser = async (payload) => {
    try {
        const responce = await axiosInstance.post(`?page=editUser`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}


export const getAllRoles = async (payload) => {
    try {
        const responce = await axiosInstance.get(`?page=getAllRoles`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}

export const userStateUpdate = async (payload) => {
    try {
        const responce = await axiosInstance.post(`?page=deactivateUser`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}


export const getUserDataByID = async (id) => {
    try {
        const responce = await axiosInstance.get(`?page=getUserDataByID/${id}`)
       
        return responce.data
    } catch (error) {
        console.log(error)
    }
}

