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