import { FiUpload } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddRelativeModal from "./AddRelativeModal";
import { Modal } from "@mui/material";

// eslint-disable-next-line react/prop-types
const AdminManagementModalComponent = ({
  addAdminModalOpen,
  setAddAdminModalOpen,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [addRelativeModalOpen, setAddRelativeModalOpen] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <Modal
        open={addAdminModalOpen}
        onClose={() => setAddAdminModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-opacity-50 "
      >
        
          <div className="h-[600px] overflow-y-auto mt-6 sm:h-[80vh] mainFormSection md:h-[80vh] lg:h-[65vh] xl:h-[70vh]  2xl:h-[70vh] 4xl:h-[60vh]">
            <div className="relative w-[100%] max-w-[55vw] sm:max-w-[100vw] md:max-w-[100vw] lg:max-w-[75vw] xl:max-w-[65vw] 2xl:max-w-[65vw] 3xl:max-w-[65vw] 4xl:max-w-[65vw] mx-auto rounded-lg overflow-hidden sm:w-[90vw] md:w-[90vw] lg:w-[96vw]">
              <div className="relative w-full bg-white rounded-lg shadow-md pb-2">
                <div className="flex w-full justify-between items-center bg-blue-900 py-2 4xl:border-r-primary">
                  <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">
                    Add User
                  </h2>
                  <button
                    onClick={() => setAddAdminModalOpen(false)}
                    className="text-red text-white hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg"
                  >
                    <IoMdClose />
                  </button>
                </div>

                <div className="p-8 flex flex-col gap-y-4 w-full">
                  <div className="flex flex-col space-y-2">
                    <h1 className="text-gray-500">
                      Choose Group <span className="text-red-500">*</span>
                    </h1>
                    <div>
                      <select name="groupSection" className="input w-full">
                        <option value="">Select</option>
                      </select>
                    </div>
                  </div>

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
                      <span className="ml-2 text-gray-700">Relatives</span>
                    </label>
                  </div>

                  {/* file upload section */}
                  <div className="flex gap-2">
                    <h4 className="text-blue-300 pt-2 sm:text-sm">
                      Profile Picture
                    </h4>
                    <div className="flex w-[75%] items-center border input rounded-lg py-1 px-2 sm:flex-col sm:gap-y-1">
                      <label
                        htmlFor="file-upload"
                        className="flex items-center sm:justify-center sm:text-center bg-blue-900 text-white px-4 py-1 rounded-lg cursor-pointer font-semibold sm:w-[100%]"
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
                        <div className="flex justify-between items-center bg-blue-300 rounded-full ml-2 px-4 sm:justify-center sm:w-[100%] sm:ml-0">
                          <span className="text-sm pl-2">
                            {selectedFile.name}
                          </span>
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

                  <div className="flex flex-wrap list-none mt-6 gap-6">
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">
                        {" "}
                        Authentication Code{" "}
                        <span className="text-red-500 pl-1">*</span>
                      </h6>
                      <input
                        type="text"
                        name="Authentication_Code"
                        placeholder="385555"
                        className="input"
                      />
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">
                        {" "}
                        First Name<span className="text-red-500 pl-1">
                          *
                        </span>{" "}
                      </h6>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="Wade"
                        className="input"
                      />
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">
                        {" "}
                        Last Name<span className="text-red-500 pl-1">
                          *
                        </span>{" "}
                      </h6>
                      <input
                        type="text"
                        name="Authentication_Code"
                        placeholder="Willams"
                        className="input"
                      />
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">
                        Gender<span className="text-red-500 pl-1">*</span>{" "}
                      </h6>
                      <select name="gender" className="input">
                        <option value="">Select</option>
                      </select>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">
                        Email Id<span className="text-red-500 pl-1">*</span>
                      </h6>
                      <input
                        type="text"
                        name="Authentication_Code"
                        className="input"
                      />
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">
                        Contact No<span className="text-red-500 pl-1">*</span>
                      </h6>
                      <input
                        type="text"
                        name="Authentication_Code"
                        className="input"
                      />
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">DOB</h6>
                      <input
                        type="date"
                        name="Authentication_Code"
                        className="input"
                      />
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">Age</h6>
                      <input
                        type="text"
                        name="Authentication_Code"
                        className="input"
                      />
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">
                        Address<span className="text-red-500 pl-1">*</span>
                      </h6>
                      <input
                        type="text"
                        name="Authentication_Code"
                        className="input"
                      />
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">Postal Code</h6>
                      <input
                        type="text"
                        name="Authentication_Code"
                        className="input"
                      />
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">Suburb</h6>
                      <select name="gender" className="input">
                        <option value="">Select</option>
                      </select>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">State</h6>
                      <select name="gender" className="input">
                        <option value="">Select</option>
                      </select>
                    </div>

                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">Country</h6>
                      <input
                        type="text"
                        name="Authentication_Code"
                        className="input"
                      />
                    </div>
                    <div className="flex flex-col w-[22%] gap-y-2 sm:w-[100%] md:w-[47%] lg:w-[30%] xl:w-[30%] 2xl:w-[30%]">
                      <h6 className="text-blue-300 text-sm">Action</h6>
                      <select name="gender" className="input">
                        <option value="">Adult</option>
                        <option value="">Teen</option>
                        <option value="">Old</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex w-full flex-col space-y-2">
                    <h1 className="text-gray-500">Notes</h1>
                    <input
                      type="text"
                      name="Authentication_Code"
                      className="input"
                      placeholder="Add Text Here"
                    />
                  </div>

                  <div className="flex text gap-3 mt-3 sm:flex-col">
                    <span className="text-md font-medium text-blue-300 pt-2">
                      Relative Details
                    </span>
                    <button
                      className="flex justify-center text-center gap-3 bg-blue-900 text-white"
                      onClick={() => setAddRelativeModalOpen(true)}
                    >
                      <i className="text-lg pt-1">
                        {" "}
                        <IoIosAddCircleOutline />
                      </i>{" "}
                      Add Relative
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
                  <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">
                    Save
                  </button>
                  <button
                    onClick={() => setAddAdminModalOpen(false)}
                    className="border border-black bg-white text-black font-semibold rounded-lg focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
    
      </Modal>
      <div className="flex items-center">
        <AddRelativeModal
          addRelativeModalOpen={addRelativeModalOpen}
          setAddRelativeModalOpen={setAddRelativeModalOpen}
        />
      </div>
    </>
  );
};

export default AdminManagementModalComponent;
