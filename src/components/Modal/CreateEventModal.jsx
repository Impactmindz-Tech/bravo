import { Box, Modal } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { createEventApi } from "../../utils/service/EventService";
import { createEvent } from "../../utils/validation/FormValidation";
import toast from "react-hot-toast";
import { setEvent } from "../../store/Slice/EventSlice";
import { useDispatch } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateEventModal = ({
  calenderModal,
  setCalenderModal,
  currentEventDate,
}) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState(null);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createEvent) });
  const [docFile, setDocFile] = useState(null);

  const handleFileChange = (event) => {
    setDocFile(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data?.event_title);
    formData.append("description", data?.event_desc);
    formData.append("start_time", startTime);
    formData.append("end_time", data?.event_end);
    formData.append("location", data?.event_location);
    formData.append("cost", data?.event_cost);
    formData.append("event_doc", docFile);
    formData.append("event_notes", data?.event_notes);
    formData.append("created_by", data?.event_created);
    formData.append("group_id", data?.event_group_id);

    try {
      const responce = await createEventApi(formData);

      if (responce?.isSuccess) {
        toast.success(responce?.message);
        setCalenderModal(false);
        setDocFile([]);
        dispatch(setEvent(responce));

        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentEventDate) {
      setStartTime(currentEventDate);
    }
  }, [currentEventDate]);
  return (
    <Modal open={calenderModal} onClose={() => setCalenderModal(false)}>
      <div
        className="w-[60vw] absolute top-[50%] left-[50%] bg-white p-8"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_title">
                title<span className="text-red-500 pl-1">*</span>
              </label>
              <input
                type="text"
                name="event_title"
                id="event_title"
                placeholder="title"
                className="input"
                {...register("event_title")}
              />
              <p>{errors?.event_title?.message}</p>
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_desc">
                description
              </label>
              <input
                type="text"
                name="event_desc"
                id="event_desc"
                placeholder="description"
                className="input"
                {...register("event_desc")}
              />
              {/* <p>{errors?.event_desc?.message}</p> */}
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_start">
                start time<span className="text-red-500 pl-1">*</span>
              </label>
              <input
                type="date"
                name="event_start"
                id="event_start"
                placeholder="start time"
                className="input"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                // {...register("event_start")}
              />
              {/* <p>{errors?.event_start?.message}</p> */}
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_end">
                end time<span className="text-red-500 pl-1">*</span>
              </label>
              <input
                type="date"
                name="event_end"
                id="event_end"
                placeholder="end time"
                className="input"
                {...register("event_end")}
              />
              <p>{errors?.event_end?.message}</p>
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_location">
                location
              </label>
              <input
                type="text"
                name="event_location"
                id="event_location"
                placeholder="location"
                className="input"
                {...register("event_location")}
              />
              {/* <p>{errors?.event_location?.message}</p> */}
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_cost">
                cost
              </label>
              <input
                type="text"
                name="event_cost"
                id="event_cost"
                placeholder="cost"
                className="input"
                {...register("event_cost")}
              />
              {/* <p>{errors?.event_cost?.message}</p> */}
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_doc">
                event doc
              </label>
              <input
                type="file"
                name="event_doc"
                id="event_doc"
                placeholder="event doc"
                className="input"
                onChange={handleFileChange}
              />
              {/* <p>{errors?.event_doc?.message}</p> */}
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_notes">
                event notes
              </label>
              <input
                type="text"
                name="event_notes"
                id="event_notes"
                placeholder="event notes"
                className="input"
                {...register("event_notes")}
              />
              {/* <p>{errors?.event_notes?.message}</p> */}
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="event_created">
                created by<span className="text-red-500 pl-1">*</span>
              </label>
              <input
                type="text"
                name="event_created"
                id="event_created"
                placeholder="created by"
                className="input"
                {...register("event_created")}
              />
              <p>{errors?.event_created?.message}</p>
            </div>
            <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
              <label className="text-blue-300 text-sm" htmlFor="groupId">
                group id<span className="text-red-500 pl-1">*</span>
              </label>
              <input
                type="text"
                name="event Group Id"
                id="groupId"
                placeholder="group id"
                className="input"
                {...register("event_group_id")}
              />
              <p>{errors?.event_group_id?.message}</p>
            </div>
          </div>
          <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
            <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">
              {"Save"}
            </button>
            <button className="border border-black bg-white text-black font-semibold rounded-lg focus:outline-none">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateEventModal;
