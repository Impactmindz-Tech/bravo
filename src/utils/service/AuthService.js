import axiosInstance from "../axiosInstance/axiosInstance"

export const LoginApi = async (payload) => {
    try {
        const responce = await axiosInstance.post(`?page=login`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}