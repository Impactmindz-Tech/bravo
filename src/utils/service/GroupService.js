import axiosInstance from "../axiosInstance/axiosInstance"

export const CreateGroup = async (payload) => {
    try {
        const responce = await axiosInstance.post(`?page=createGroup`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}