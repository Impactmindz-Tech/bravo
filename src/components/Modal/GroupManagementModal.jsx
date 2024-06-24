import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const GroupManagementModel = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  if (!isOpen) return null;
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto backdrop-filter  bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden">
        <div className="relative bg-white  rounded-lg shadow-md pb-4">
          {/* top model section */}
          <div className="flex justify-between items-center mb-4 bg-blue-900 py-2">
            <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">
              Edit Group
            </h2>
            <button
              onClick={onClose}
              className="bg-blue-900 hover:text-gray-900 hover:border-none hover:outline-none text-lg text-white border-none outline-none"
            >
              <IoClose />
            </button>
          </div>

          <div className="p-8 flex flex-col gap-y-4">
            {/* file upload section */}
            <div className="flex justify-center">
              <h4 className="text-blue-300 w-[25%]">
                Group Picture{" "}
                <span className="text-red-500 font-extrabold">*</span>
              </h4>

              <div className="flex w-[75%] items-center border rounded-lg py-1 px-2">
                <label
                  htmlFor="file-upload"
                  className="flex items-center bg-blue-900 px-4 py-2 rounded-lg cursor-pointer font-semibold text-white"
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
                  <div className="flex justify-between items-center bg-blue-300 rounded-full ml-2 px-4">
                    <span className="text-sm pl-2">{selectedFile.name}</span>
                    <button
                      onClick={handleRemoveFile}
                      className="bg-none noColor text-sm bg-blue-300 outline-none border-none text-textMainColor-900"
                    >
                      <IoIosCloseCircleOutline className="text-lg" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* group name section */}
            <div className="flex justify-center">
              <h4 className=" text-blue-300 w-[25%] ">
                Group Name{" "}
                <span className="text-red-500 font-extrabold">*</span>
              </h4>
              <div className="flex w-[75%]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Std 10 Group"
                  className="text-sm width:100% border w-[100%] rounded-md py-2 px-2 outline-none"
                />
              </div>
            </div>

            {/*  group member*/}
            <div className="flex justify-center">
              <h4 className="text-blue-300 w-[25%]">
                Group Member{" "}
                <span className="text-red-500 font-extrabold">*</span>
              </h4>
              <div className="flex flex-wrap border gap-3 w-[75%] rounded-md py-2 px-2 list-none">
                <li className="bg-blue-300 px-6 py-1.5 rounded-full text-sm flex justify-center mb-1 gap-2">
                  Jaini Shah
                  <i className="text-lg text-textMainColor-900">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>
              </div>
            </div>
          </div>

          {/* bottom button */}
          <div className="flex justify-end mr-9 gap-2">
            <button className=" bg-blue-900 text-textMainColor-900 font-semibold rounded-lg focus:outline-none border-none">
              Submit
            </button>
            <button
              onClick={onClose}
              className="border border-black bg-white  text-black font-semibold rounded-lg focus:outline-none hover:border-black"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupManagementModel;
