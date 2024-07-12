import axiosInstance from "../axiosInstance/axiosInstance"

export const createAdminApi = async (payload) => {
    try {
        const responce = await axiosInstance.post(`?page=createAdmin`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}
export const getAllAdminsApi = async (payload) => {
    try {
        const responce = await axiosInstance.get(`?page=getAdmins`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}