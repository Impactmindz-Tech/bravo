import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import { Modal } from "@mui/material";
// eslint-disable-next-line react/prop-types
const GroupManagementModel = ({ groupModalOpen, setGroupModalOpen }) => {

  const [selectedFile, setSelectedFile] = useState(null);


 
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };


 


  return (
    <Modal open={groupModalOpen} onClose={()=>setGroupModalOpen(false)} className="fixed modalContainer inset-0 z-50 flex items-center justify-center  overflow-x-hidden overflow-y-auto">
      
      <div className="overflow-y-auto mainFormSection sm:w-[90vw] sm:h-[70vh] md:w-[90vw] md:h-[70vh] lg:w-[80vw] lg:h-[65vh] xl:w-[60vw] xl:h-[60vh] w-[55vw] h-[60vh]">
      <div   className="relative w-full  mx-auto rounded-lg  overflow-hidden ">
        <div className="relative bg-white  rounded-lg shadow-md pb-4">
          {/* top model section */}
          <div className="flex justify-between items-center mb-4 bg-blue-900 py-2">
            <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">
              Edit Group
            </h2>
            <button
              onClick={()=>setGroupModalOpen(false)}
              className="bg-blue-900 hover:text-gray-900 hover:border-none hover:outline-none text-lg text-white border-none outline-none"
            >
              <IoClose />
            </button>
          </div>

          <div className="p-8 flex flex-col gap-y-4 ">
            {/* file upload section */}
            <div className="flex justify-center sm:flex-col md:flex-col sm:gap-y-2 md:gap-y-2 lg:flex-col lg:gap-y-1">
              <h4 className="text-blue-300 font-semibold w-[20%] lg:w-[100%] xl:w-[25%] sm:w-[100%] 3xl:text-xl md:w-[100%]">
                Group Picture{" "}
              </h4>

              <div className="flex w-[80%] lg:w-[100%] xl:w-[75%] items-center input   py-1 px-2 sm:flex-col sm:gap-y-1 sm:w-[100%] md:w-[100%]">
                <label
                  htmlFor="file-upload"
                  className="flex items-center bg-blue-900 px-4 py-2 sm:justify-center sm:text-center rounded-lg cursor-pointer font-semibold text-white sm:w-[100%]"
                >
                  <FiUpload className="font-semibold mr-1" />
                  Upload
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <div className="flex justify-between items-center bg-blue-300 rounded-full ml-2 px-4 sm:justify-center sm:w-[100%] sm:ml-0 ">
                    <span className="text-sm pl-2">{selectedFile.name}</span>
                    <button
                      onClick={handleRemoveFile}
                      className="text-black text-sm bg-transparent border-none"
                    >
                      <IoIosCloseCircleOutline className="text-lg bg-none" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* group name section */}
            <div className="flex  sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-1 lg:flex-col lg:gap-y-1">
              <h4 className=" text-blue-300 w-[20%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[25%]">
                Group Name{" "}
                <span className="text-red-500 font-extrabold">*</span>
              </h4>
              <div className="flex w-[80%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[75%]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Std 10 Group"
                  className="text-sm width:100% input w-[100%]  py-2 px-2 outline-none"
                />
              </div>
            </div>

            {/*  group member*/}
            <div className="flex  sm:flex-col sm:gap-y-1 md:flex-col md:gap-y-1 lg:flex-col lg:gap-y-1">
              <h4 className="text-blue-300 w-[20%] sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[25%]">
                Group Member{" "}
                <span className="text-red-500 font-extrabold">*</span>
              </h4>
              <div className="flex flex-wrap  gap-3 w-[80%] md:w-[100%] lg:w-[100%] xl:w-[75%] sm:w-[100%] input py-2 px-2 list-none ">
                <li className="bg-blue-300 px-6 py-1.5 rounded-full text-sm flex justify-center mb-1 gap-2 ">
                  Jaini Shah
                  <i className="text-lg text-textMainColor-900">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>
              </div>
            </div>
          </div>

          {/* bottom button */}
          <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
            <button className=" bg-blue-900 text-textMainColor-900 font-semibold rounded-lg focus:outline-none border-none">
              Submit
            </button>
            <button
              onClick={()=>setGroupModalOpen(false)}
              className="border border-black bg-white  text-black font-semibold rounded-lg focus:outline-none hover:border-black"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
      </div>
        </Modal>
    // </div>
  );
};

export default GroupManagementModel;
