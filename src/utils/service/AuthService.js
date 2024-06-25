import axiosInstance from "../axiosInstance/axiosInstance"

export const LoginApi = async (payload) => {
    try {
        const responce = await axiosInstance.post(`/auth`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}