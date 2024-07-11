import axiosInstance from "../axiosInstance/axiosInstance"

export const createAdminApi = async (payload) => {
    try {
        const responce = await axiosInstance.post(`?page=createAdmin`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}