import { Box, Modal } from "@mui/material";
import React from "react";

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

const CreateEventModal = ({ calenderModal, setCalenderModal }) => {
  return (
    <Modal open={calenderModal} onClose={() => setCalenderModal(false)}>
      <div className="w-[60vw] absolute top-[50%] left-[50%] bg-white p-8" style={{ transform: "translate(-50%, -50%)" }}>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
            <label className="text-blue-300 text-sm" htmlFor="authrization_code">
              title<span className="text-red-500 pl-1">*</span>
            </label>
            <input type="text" name="authrization_code" id="authrization_code" placeholder="title" className="input" />
            {/* <p>{errors?.authrization_code?.message}</p> */}
          </div>
          <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
            <label className="text-blue-300 text-sm" htmlFor="authrization_code">
              description<span className="text-red-500 pl-1">*</span>
            </label>
            <input type="text" name="authrization_code" id="authrization_code" placeholder="description" className="input" />
            {/* <p>{errors?.authrization_code?.message}</p> */}
          </div>
          <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
            <label className="text-blue-300 text-sm" htmlFor="authrization_code">
              start time<span className="text-red-500 pl-1">*</span>
            </label>
            <input type="text" name="authrization_code" id="authrization_code" placeholder="start time" className="input" />
            {/* <p>{errors?.authrization_code?.message}</p> */}
          </div>
          <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
            <label className="text-blue-300 text-sm" htmlFor="authrization_code">
              end time<span className="text-red-500 pl-1">*</span>
            </label>
            <input type="text" name="authrization_code" id="authrization_code" placeholder="end time" className="input" />
            {/* <p>{errors?.authrization_code?.message}</p> */}
          </div>
          <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
            <label className="text-blue-300 text-sm" htmlFor="authrization_code">
              location<span className="text-red-500 pl-1">*</span>
            </label>
            <input type="text" name="authrization_code" id="authrization_code" placeholder="location" className="input" />
            {/* <p>{errors?.authrization_code?.message}</p> */}
          </div>
          <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
            <label className="text-blue-300 text-sm" htmlFor="authrization_code">
              cost<span className="text-red-500 pl-1">*</span>
            </label>
            <input type="text" name="authrization_code" id="authrization_code" placeholder="cost" className="input" />
            {/* <p>{errors?.authrization_code?.message}</p> */}
          </div>
          <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
            <label className="text-blue-300 text-sm" htmlFor="authrization_code">
              event doc<span className="text-red-500 pl-1">*</span>
            </label>
            <input type="text" name="authrization_code" id="authrization_code" placeholder="event doc" className="input" />
            {/* <p>{errors?.authrization_code?.message}</p> */}
          </div>
          <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
            <label className="text-blue-300 text-sm" htmlFor="authrization_code">
              event notes<span className="text-red-500 pl-1">*</span>
            </label>
            <input type="text" name="authrization_code" id="authrization_code" placeholder="event notes" className="input" />
            {/* <p>{errors?.authrization_code?.message}</p> */}
          </div>
          <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
            <label className="text-blue-300 text-sm" htmlFor="authrization_code">
              created by<span className="text-red-500 pl-1">*</span>
            </label>
            <input type="text" name="authrization_code" id="authrization_code" placeholder="created by" className="input" />
            {/* <p>{errors?.authrization_code?.message}</p> */}
          </div>
          <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
            <label className="text-blue-300 text-sm" htmlFor="authrization_code">
              group id<span className="text-red-500 pl-1">*</span>
            </label>
            <input type="text" name="authrization_code" id="authrization_code" placeholder="group id" className="input" />
            {/* <p>{errors?.authrization_code?.message}</p> */}
          </div>
          <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
            <label className="text-blue-300 text-sm" htmlFor="authrization_code">
              event doc<span className="text-red-500 pl-1">*</span>
            </label>
            <input type="text" name="authrization_code" id="authrization_code" placeholder="event doc" className="input" />
            {/* <p>{errors?.authrization_code?.message}</p> */}
          </div>
        </div>
        <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
          <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">{"Save"}</button>
          <button className="border border-black bg-white text-black font-semibold rounded-lg focus:outline-none">Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateEventModal;
