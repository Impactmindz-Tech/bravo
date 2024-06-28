import { yupResolver } from "@hookform/resolvers/yup";
import { FiUpload } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {  useState } from "react";
import { IoMdClose } from "react-icons/io";

import { Modal } from "@mui/material";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { CreateUser } from "../../utils/service/DashboardService";
import { useForm } from "react-hook-form";
import { createUser } from "../../utils/validation/FormValidation";

// eslint-disable-next-line react/prop-types
const CreateGroupModal = ({
  createGroupModalOpen,
  setCreateGroupModalOpen,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
const[memberTag,setMemberTag]=useState([])
  const [addRelativeModalOpen, setAddRelativeModalOpen] = useState(false);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createUser) });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const userCreate = async () => {
    try {
      const response = await CreateUser();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };


// handle space bar 
const handleChange = (tags) => {
   setMemberTag(tags)
  }

  return (
    <>
      <Modal
        open={createGroupModalOpen}
        onClose={() => setCreateGroupModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-opacity-50 "
      >
        <div className="h-[600px] overflow-y-auto mt-6 sm:h-[70vh] mainFormSection md:h-[80vh] lg:h-[60vh] xl:h-[70vh]  2xl:h-[75vh] 4xl:h-[60vh]">
          <div className="relative w-[100%] max-w-[55vw] sm:max-w-[100vw] md:max-w-[100vw] lg:max-w-[70vw] xl:max-w-[65vw] 2xl:max-w-[60vw] 3xl:max-w-[65vw] 4xl:max-w-[65vw] mx-auto rounded-lg overflow-hidden sm:w-[90vw] md:w-[90vw] lg:w-[96vw]">
            <div className="relative w-full bg-white rounded-lg shadow-md pb-2">
              <div className="flex w-full justify-between items-center bg-blue-900 py-2 4xl:border-r-primary">
                <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">
                  Create Group
                </h2>
                <button
                  onClick={() => setCreateGroupModalOpen(false)}
                  className="text-red text-white hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg"
                >
                  <IoMdClose />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col min-w-[50vw] gap-y-3 p-2 my-5">
                  <div className="flex flex-col gap-2 p-4">
                    <div className="flex gap-2 justify-between flex-wrap">
                      <h1 className="text-gray-500 sm:w-[100%] md:w-[100%] lg:w-[100%] 2xl:w-[25%]">
                        Group Name
                      </h1>
                      <input
                        type="text"
                        name="Authentication_Code"
                        className="input w-[80%] sm:w-[100%] md:w-[100%] lg:w-[100%] 2xl:w-[73%]"
                        placeholder="Add Text Here"
                      />
                    </div>

                    <div className="flex gap-2 justify-between flex-wrap">
                      <h1 className="text-gray-500 sm:w-[100%] md:w-[100%] lg:w-[100%] 2xl:w-[25%] ">
                        Members Name
                      </h1>


                      <TagsInput value={memberTag} onChange={handleChange} className="input w-[80%] sm:w-[100%] md:w-[100%] lg:w-[100%] 2xl:w-[73%] " />
                   
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 p-4">
                    <div className="flex gap-2 justify-between w-full">
                      <h4 className="text-blue-300 pt-2 sm:text-sm">
                        {" "}
                        Group Picture
                      </h4>
                      <div className="flex w-[80%] items-center border input rounded-lg py-1 px-2 sm:flex-col sm:gap-y-1">
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
                  </div>
                </div>

                <div className="flex justify-end mr-9 gap-2 sm:mr-0 sm:justify-center">
                  <button className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">
                    Save
                  </button>
                  <button
                    onClick={() => setCreateGroupModalOpen(false)}
                    className="border border-black bg-white text-black font-semibold rounded-lg focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateGroupModal;
