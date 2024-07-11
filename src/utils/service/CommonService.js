import axiosInstance from "../axiosInstance/axiosInstance"

export const getAllGroup = async () => {
    try {
        const responce = await axiosInstance.get(`?page=getAllGroups`)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}
