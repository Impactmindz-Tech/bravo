import axiosInstance from "../axiosInstance/axiosInstance"

export const DashboardApi = async () => {
    try {
        const responce = await axiosInstance.get(`/Users_details`)
       return responce.data
    } catch (error) {
        console.log(error)
    }
}