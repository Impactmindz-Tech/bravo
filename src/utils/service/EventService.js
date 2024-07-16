import axiosInstance from "../axiosInstance/axiosInstance";

export const createEventApi = async (payload) => {
  try {
    const responce = await axiosInstance.post(`?page=createEvent`, payload);
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEventApi = async (payload) => {
  try {
    const responce = await axiosInstance.post(`?page=updateEvent`, payload);
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEventApi = async (payload) => {
  let ids = parseInt(payload.event_id);
  try {
    const responce = await axiosInstance.delete(`?page=deleteEvent`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { event_id: ids },
    });
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllEventsApi = async (payload) => {
  try {
    const responce = await axiosInstance.get(`?page=getAllEvents`, payload);
    return responce.data;
  } catch (error) {
    console.log(error);
  }
};
