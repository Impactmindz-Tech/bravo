import axiosInstance from "../axiosInstance/axiosInstance"

export const getAllGroup = async (payload) => {
    try {
        const responce = await axiosInstance.get(`?page=getAllGroups`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}
