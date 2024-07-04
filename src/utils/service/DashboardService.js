import axiosInstance from "../axiosInstance/axiosInstance"

export const DashboardApi = async () => {
    try {
        const responce = await axiosInstance.get(`?page=getAllUserData`)
        return responce.data
    } catch (error) {
        console.log(error)
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

export const getAllGroup = async (payload) => {
    try {
        const responce = await axiosInstance.get(`?page=getAllGroups`, payload)
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