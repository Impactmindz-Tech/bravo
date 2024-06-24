import { FiUpload } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
// eslint-disable-next-line react/prop-types
const AdminManagementModalComponent = ({ isOpen, onClose }) => {
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
      <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
        <div className="relative bg-white  rounded-lg shadow-md pb-2">
          {/* top model section */}
          <div className="flex justify-between items-center  bg-blue-900 py-2">
            <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">
              Add Admin
            </h2>
            <button
              onClick={onClose}
              className="text-red text-white  hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg"
            >
              <IoMdClose />
            </button>
          </div>

          <div className="p-8 flex flex-col gap-y-4">
            {/* chose group section */}
            <div className="flex flex-col space-y-2">
              <h1 className="text-gray-500">
                Choose Group <span className="text-red-500">*</span>
              </h1>
              <div className="">
                <select
                  name="groupSection"
                  className="border text-blue-900 w-full outline-none rounded-md px-2 py-1 text-sm"
                >
                  <option value="">Select</option>
                </select>
              </div>
            </div>
            {/* radio btn */}

            <div className="flex gap-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="fav_language"
                  className="form-radio border-2 border-yellow-400 rounded-full appearance-none h-6 w-6 checked:bg-blue-900 checked:border-transparent"
                />
                <span className="ml-2 text-gray-700">Admin</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="fav_language"
                  className="form-radio border-2 border-yellow-400 rounded-full appearance-none h-6 w-6 checked:bg-blue-900 checked:border-transparent"
                />
                <span className="ml-2 text-gray-700">Regional Admin</span>
              </label>
            </div>

            {/* file upload section */}
            <div className="flex gap-2">
              <h4 className="text-blue-300 ">Profile Picture</h4>

              <div className="flex w-[75%] items-center border rounded-lg py-1 px-2">
                <label
                  htmlFor="file-upload"
                  className="flex items-center bg-blue-900 text-white  px-4 py-1 rounded-lg cursor-pointer font-semibold"
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
                  <div className="flex justify-between items-center bg-[#FBF3DE] rounded-full ml-2 px-4">
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

            {/* form section */}
            <div className="flex flex-wrap list-none mt-6 gap-6">
              {/*  Authentication Code */}
              <div className="flex flex-col gap-y-2">
                <h6 className="text-blue-300 text-sm">
                  Authentication Code{" "}
                  <span className="text-red-500 pl-1">*</span>
                </h6>
                <input
                  type="text"
                  name="Authentication_Code"
                  className="border rounded-lg px-2 py-1 focus:bg-gray-100 text-sm outline-none border-blue-900"
                />
              </div>
              {/* first name */}
              <div className="flex flex-col gap-y-2">
                <h6 className="text-blue-300 text-sm">
                  First Name<span className="text-red-500 pl-1">*</span>
                </h6>
                <input
                  type="text"
                  name="Authentication_Code"
                  className="border rounded-lg px-2 py-1 text-sm outline-none focus:bg-gray-100"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <h6 className="text-blue-300 text-sm">
                  Last Name<span className="text-red-500 pl-1">*</span>
                </h6>
                <input
                  type="text"
                  name="Authentication_Code"
                  className="border rounded-lg px-2 py-1 text-sm outline-none focus:bg-gray-100"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <h6 className="text-blue-300 text-sm">
                  Email Id<span className="text-red-500 pl-1">*</span>
                </h6>
                <input
                  type="text"
                  name="Authentication_Code"
                  className="border rounded-lg px-2 py-1 text-sm outline-none focus:bg-gray-100"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <h6 className="text-blue-300 text-sm">
                  Gender<span className="text-red-500 pl-1">*</span>
                </h6>
                <select
                  name="gender"
                  className="border rounded-lg px-2 py-1 text-sm outline-none focus:bg-gray-100 w-[180px]"
                >
                  <option value="">Select</option>
                </select>
              </div>

              <div className="flex flex-col gap-y-2">
                <h6 className="text-blue-300 text-sm">
                  Contact No<span className="text-red-500 pl-1">*</span>
                </h6>
                <input
                  type="text"
                  name="Authentication_Code"
                  className="border rounded-lg px-2 py-1 text-sm outline-none focus:bg-gray-100"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <h6 className="text-blue-300 text-sm">
                  Address<span className="text-red-500 pl-1">*</span>
                </h6>
                <input
                  type="text"
                  name="Authentication_Code"
                  className="border rounded-lg px-2 py-1 text-sm outline-none focus:bg-gray-100"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <h6 className="text-blue-300 text-sm">Postal Code</h6>
                <input
                  type="text"
                  name="Authentication_Code"
                  className="border rounded-lg px-2 py-1 text-sm outline-none focus:bg-gray-100"
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <h6 className="text-blue-300 text-sm">Suburb</h6>
                <select
                  name="gender"
                  className="border rounded-lg px-2 py-1 text-sm outline-none focus:bg-gray-100 w-[180px]"
                >
                  <option value="">Select</option>
                </select>
              </div>

              <div className="flex flex-col gap-y-2">
                <h6 className="text-blue-300 text-sm">State</h6>
                <select
                  name="gender"
                  className="border rounded-lg px-2 py-1 text-sm outline-none focus:bg-gray-100 w-[180px]"
                >
                  <option value="">Select</option>
                </select>
              </div>

              <div className="flex flex-col gap-y-2">
                <h6 className="text-blue-300 text-sm">Country</h6>
                <input
                  type="text"
                  name="Authentication_Code"
                  className="border rounded-lg px-2 py-1 text-sm outline-none focus:bg-gray-100"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <h1 className="text-gray-500">Notes</h1>

              <input
                type="text"
                name="Authentication_Code"
                className="border outline-none text-blue-900 w-full rounded-md px-2 py-1 text-sm"
                placeholder="Add Text Here"
              />
            </div>
          </div>

          {/* bottom button */}
          <div className="flex justify-end mr-9 gap-2">
            <button className=" bg-blue-900 text-white font-semibold rounded-lg focus:outline-none">
              Save
            </button>
            <button
              onClick={onClose}
              className="border border-black bg-white  text-black font-semibold rounded-lg focus:outline-none"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagementModalComponent;
