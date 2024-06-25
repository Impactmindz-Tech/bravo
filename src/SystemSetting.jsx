import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { useState } from "react";
import settingUser from "./assets/images/settingUser.png";
export default function SystemSetting() {
  const [files, setFiles] = useState({
    postCodeFile: null,
    aboutDocumentFileDocument: null,
    privacyDocumentFileDocument: null,
  });

  const handleFileChange = (type) => (event) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [type]: event.target.files[0],
    }));
    console.log(files);
  };

  const handleRemoveFile = (type) => () => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [type]: null,
    }));
  };

  return (
    <>
      {/* header section */}
      <Header />

      {/* menu section */}
      <div className="flex justify-start ">
        {/* left nav bar */}
        <NavBar />

        {/* right side section */}
        <div className="w-[90%] m-auto h-[41vw] sm:m-0">

        <div className="sm:max-h-[90vh]  sm:overflow-hidden sm:overflow-y-auto mainFormSection pb-2 ">

          {/* top title */}
          <div className="flex justify-between px-1 my-3 ">
            <h1 className="text-3xl font-bold sm:text-sm sm:pl-3">System Setting</h1>
          </div>

          <div className="flex my-6 justify-between sm:flex-col sm:mx-2">
            {/* left section */}
            <div className="w-[60%]  shadow-2xl shadow-[#969696] rounded-2xl sm:w-[98%]">
              {/* category */}
              <h1 className="my-2 mx-5 text-blue-300 sm:text-sm sm:mx-2 ">Category</h1>
              <div className="flex flex-wrap border gap-3 w-[95%] rounded-md py-2 px-2 list-none border-borderOutlineColor-900 mx-5 sm:mx-1 sm:w-[96%] sm:py-1">


                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-start mb-1 gap-2 pr-2">
                  <div className="rounded-full">
                    <img
                      src={settingUser}
                      alt="user image"
                      className="object-contain h-8"
                    />
                  </div>
                  <span className="pt-1.5 sm:text-sm">Jaini Shah.PNG</span>
                  <i className="text-lg text-black pt-1.5">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>

            
              </div>
              {/* relation */}

              <h1 className="my-3 mx-5 text-blue-300 sm:mx-2">Relation</h1>
              <div className="flex flex-wrap border gap-3 w-[95%] rounded-md py-2 px-2 list-none border-borderOutlineColor-900 mx-5 sm:mx-1 sm:w-[96%] sm:py-1">
                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-center py-1 gap-2 px-5">
                  <span className="">Father</span>
                  <i className="text-lg text-black">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>

              </div>

              {/* admin management */}
              <div className="flex ml-5 mt-10 gap-3 sm:flex-col sm:mt-0 sm:ml-2">
                <span className="font-medium py-8 w-[20%] sm:w-[100%] sm:text-sm sm:py-0 sm:pt-4 sm:ml-0" >
                  Admin Management
                </span>

                <div className="font-normal text-secondary ">
                  <h1 className="sm:text-sm">Level 1</h1>
                  <input
                    type="text"
                    name="level1"
                    className="border rounded-lg px-2 outline-none py-1 mt-2 border-borderOutlineColor-900 font-normal text-black sm:w-[96%]"
                  />
                </div>

                <div className="font-normal text-secondary">
                  <h1 className="sm:text-sm">Level 2</h1>
                  <input
                    type="text"
                    name="level1"
                    className="border rounded-lg px-2 outline-none py-1 mt-2 border-borderOutlineColor-900 font-normal text-black sm:w-[96%]"
                  />
                </div>
              </div>

              {/* user management */}
              <div className="flex ml-5 gap-3 sm:flex-col sm:ml-2">
                <span className="font-medium py-8 w-[20%] sm:w-[100%] sm:py-1">
                  User Management
                </span>

                <div className="font-normal text-secondary">
                  <h1 className="sm:text-sm">Level 1</h1>
                  <input
                    type="text"
                    name="level1"
                    className="border rounded-lg px-2 outline-none py-1 mt-2 border-borderOutlineColor-900 font-normal text-black sm:w-[96%]"
                  />
                </div>

                <div className="font-normal text-secondary">
                  <h1 className="sm:text-sm">Level 2</h1>
                  <input
                    type="text"
                    name="level1"
                    className="border rounded-lg px-2 outline-none py-1 mt-2 border-borderOutlineColor-900 font-normal text-black sm:w-[96%]"
                  />
                </div>
              </div>

              {/* file management */}

              <div className="flex mb-10 pl-5 mt-4 sm:flex-col sm:pl-3 sm:gap-y-2">
                <h4 className="text-blue-300 w-[25%] font-medium sm:w-[100%]">
                  Import Post Code Table
                </h4>

                <div className="flex w-[72%] items-center border rounded-lg py-1 px-2 border-borderOutlineColor-900 sm:flex-col sm:w-[96%] sm:gap-y-1">
                  <label
                    htmlFor="file-upload"
                    className="flex items-center bg-blue-900 px-4 py-2 rounded-lg cursor-pointer font-semibold text-white sm:w-[100%]"
                  >
                    <FiUpload className="font-semibold mr-1" />
                    Upload
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange("postCodeFile")}
                  />
                  {files.postCodeFile && (
                    <div className="flex justify-between items-center bg-blue-300 rounded-full ml-2 px-4 sm:w-[100%] sm:ml-0">
                      <span className="text-sm pl-2 sm:pl-0">
                        {files.postCodeFile.name}
                      </span>
                      <button
                        onClick={handleRemoveFile("postCodeFile")}
                        className="bg-none noColor text-sm bg-blue-300 outline-none border-none text-textMainColor-900"
                      >
                        <IoIosCloseCircleOutline className="text-lg" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* right section */}
            <div className="w-[38%] shadow-2xl shadow-[#969696] rounded-2xl sm:w-[98%] sm:mt-5">
              <h1 className="font-bold mx-5 my-5 sm:text-sm">About Us</h1>

              <div className="flex pl-5 mt-4 gap-2 sm:flex-col sm:gap-y-1 sm:pl-3">
                <h4 className="text-blue-300 w-[25%] font-medium text-sm py-3 sm:py-1  sm:w-[96%] sm:text-sm">
                  Upload Document
                </h4>

                <div className="flex w-[71%] items-center border rounded-lg py-1 px-1 border-borderOutlineColor-900 sm:flex-col sm:w-[96%] sm:gap-y-1">
                  <label
                    htmlFor="file-upload-document"
                    className="flex items-center bg-blue-900 px-2 py-1 rounded-lg cursor-pointer font-semibold text-white sm:w-[100%]"
                  >
                    <FiUpload className="font-semibold mr-1 text-sm" />
                    Upload
                  </label>
                  <input
                    id="file-upload-document"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange("aboutDocumentFileDocument")}
                  />
                  {files.aboutDocumentFileDocument && (
                    <div className="flex justify-between items-center bg-blue-300 rounded-full ml-1 px-2  sm:w-[100%] sm:ml-0">
                      <span className="text-sm pl-2 ">
                        {files.aboutDocumentFileDocument.name}
                      </span>
                      <button
                        onClick={handleRemoveFile("aboutDocumentFileDocument")}
                        className="bg-none text-sm bg-blue-300 outline-none border-none text-textMainColor-900"
                      >
                        <IoIosCloseCircleOutline className="text-lg" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h2 className="mx-5 text-sm mt-2 text-secondary sm:mx-3">Text</h2>
              <textarea
                name="text"
                className="border mx-5 my-2 w-[94%] resize-none h-40 rounded-md border-borderOutlineColor-900 outline-none px-2 sm:mx-3 sm:w-[92%]"
              ></textarea>

              {/*  divider*/}
              <hr className="border-borderOutlineColor-900" />
              <h1 className="font-bold mx-5 my-5 sm:my-1">Privacy Policy</h1>

              <div className="flex pl-5 mt-4 gap-2 sm:flex-col">
                <h4 className="text-blue-300 w-[25%] font-medium text-sm py-3 sm:w-[100%]">
                  Upload Document
                </h4>

                <div className="flex w-[71%] items-center border rounded-lg py-1 px-1 border-borderOutlineColor-900 sm:w-[96%] sm:flex-col sm:gap-y-1">
                  <label
                    htmlFor="file-upload-privacy"
                    className="flex items-center bg-blue-900 px-2 py-1 rounded-lg cursor-pointer font-semibold text-white sm:w-[100%]"
                  >
                    <FiUpload className="font-semibold mr-1 text-sm" />
                    Upload
                  </label>
                  <input
                    id="file-upload-privacy"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange("privacyDocumentFileDocument")}
                  />
                  {files.privacyDocumentFileDocument && (
                    <div className="flex justify-between items-center bg-blue-300 rounded-full ml-1 px-2 sm:w-[100%] sm:ml-0">
                      <span className="text-sm pl-2">
                        {files.privacyDocumentFileDocument.name}
                      </span>
                      <button
                        onClick={handleRemoveFile(
                          "privacyDocumentFileDocument"
                        )}
                        className="bg-none text-sm bg-blue-300 outline-none border-none text-textMainColor-900"
                      >
                        <IoIosCloseCircleOutline className="text-lg" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h2 className="mx-5 text-sm mt-2 text-secondary sm:mx-3">Text</h2>
              <textarea
                name="text"
                className="border mx-5 my-2 w-[94%] resize-none h-40 rounded-md border-borderOutlineColor-900 outline-none px-2 sm:mx-3 sm:w-[92%]"
              ></textarea>
            </div>
          </div>
          {/* bottom btn section */}
          <div className="flex justify-end mr-9 gap-2 mb-4 sm:justify-center sm:mr-0 sm:pb-5">
            <button className=" bg-blue-900 text-textMainColor-900 font-semibold rounded-lg focus:outline-none border-none w-[120px]">
              Save
            </button>
            <button className="border border-black bg-white  text-black font-semibold rounded-lg focus:outline-none hover:border-black">
              cancel
            </button>
          </div>




        </div>
        </div>
      </div>
    </>
  );
}
