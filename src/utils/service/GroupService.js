import axiosInstance from "../axiosInstance/axiosInstance"

export const CreateGroup = async (payload) => {
    try {
        const responce = await axiosInstance.post(`?page=createGroup`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async () => {
    try {
        const responce = await axiosInstance.get(`?page=getAllUserData`, )
        return responce.data
    } catch (error) {
        console.log(error)
    }
}

export const getGroup = async () => {
    try {
        const responce = await axiosInstance.get(`?page=getAllUserData`, )
        return responce.data
    } catch (error) {
        console.log(error)
    }
}