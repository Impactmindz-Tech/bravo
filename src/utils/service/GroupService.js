import axiosInstance from "../axiosInstance/axiosInstance"

export const CreateGroup = async (payload) => {
    try {
        const responce = await axiosInstance.post(`?page=createGroup`, payload)
        return responce.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllGroups = async (payload) => {
    const {pg , items_per_page} = payload
    try {
        const responce = await axiosInstance.get(`?page=getAllGroups&pg=${pg}&items_per_page=${items_per_page}`)
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


export const updateEditGroup = async (payload) => {
    try {
        const responce = await axiosInstance.post(`?page=updateGroup`,payload )
        return responce.data
    } catch (error) {
        console.log(error)
    }
}

export const statusUpdae = async (payload) => {
    try {
        const responce = await axiosInstance.post(`?page=deactiveGroup`,payload )
        return responce.data
    } catch (error) {
        console.log(error)
    }
}