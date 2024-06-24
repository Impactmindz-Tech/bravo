import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { useState } from "react";

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
        <div className="w-[90%] m-auto">
          {/* top title */}
          <div className="flex justify-between px-1 my-3">
            <h1 className="text-3xl font-bold">System Setting</h1>
          </div>

          <div className="flex my-6 justify-between">
            {/* left section */}
            <div className="w-[60%]  shadow-2xl shadow-[#969696] rounded-2xl">
              {/* category */}
              <h1 className="my-2 mx-5 text-blue-300">Category</h1>
              <div className="flex flex-wrap border gap-3 w-[95%] rounded-md py-2 px-2 list-none border-borderOutlineColor-900 mx-5">
                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-start mb-1 gap-2 pr-2">
                  <div className="rounded-full">
                    <img
                      src="settingUser.png"
                      alt="user image"
                      className="object-contain h-8"
                    />
                  </div>
                  <span className="pt-1.5">Jaini Shah.PNG</span>
                  <i className="text-lg text-black pt-1.5">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>

                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-start mb-1 gap-2 pr-2">
                  <div className="rounded-full">
                    <img
                      src="settingUser.png"
                      alt="user image"
                      className="object-contain h-8"
                    />
                  </div>
                  <span className="pt-1.5">Jaini Shah.PNG</span>
                  <i className="text-lg text-black pt-1.5">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>

                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-start mb-1 gap-2 pr-2">
                  <div className="rounded-full">
                    <img
                      src="settingUser.png"
                      alt="user image"
                      className="object-contain h-8"
                    />
                  </div>
                  <span className="pt-1.5">Jaini Shah.PNG</span>
                  <i className="text-lg text-black pt-1.5">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>

                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-start mb-1 gap-2 pr-2">
                  <div className="rounded-full">
                    <img
                      src="settingUser.png"
                      alt="user image"
                      className="object-contain h-8"
                    />
                  </div>
                  <span className="pt-1.5">Jaini Shah.PNG</span>
                  <i className="text-lg text-black pt-1.5">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>

                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-start mb-1 gap-2 pr-2">
                  <div className="rounded-full">
                    <img
                      src="settingUser.png"
                      alt="user image"
                      className="object-contain h-8"
                    />
                  </div>
                  <span className="pt-1.5">Jaini Shah.PNG</span>
                  <i className="text-lg text-black pt-1.5">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>
              </div>
              {/* relation */}

              <h1 className="my-3 mx-5 text-blue-300">Relation</h1>
              <div className="flex flex-wrap border gap-3 w-[95%] rounded-md py-2 px-2 list-none border-borderOutlineColor-900 mx-5">
                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-center py-1 gap-2 px-5">
                  <span className="">Father</span>
                  <i className="text-lg text-black">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>

                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-center py-1 gap-2 px-5">
                  <span className="">Father</span>
                  <i className="text-lg text-black">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>

                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-center py-1 gap-2 px-5">
                  <span className="">Grand Father</span>
                  <i className="text-lg text-black">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>

                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-center py-1 gap-2 px-5">
                  <span className="">Grand Mother</span>
                  <i className="text-lg text-black">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>

                <li className="bg-[#BCC1D0]  rounded-full  text-sm flex justify-center py-1 gap-2 px-5">
                  <span className="">Uncle</span>
                  <i className="text-lg text-black">
                    <IoIosCloseCircleOutline className="cursor-pointer" />
                  </i>
                </li>
              </div>

              {/* admin management */}
              <div className="flex ml-5 mt-10 gap-3">
                <span className="font-medium py-8 w-[20%]">
                  Admin Management
                </span>

                <div className="font-normal text-secondary">
                  <h1>Level 1</h1>
                  <input
                    type="text"
                    name="level1"
                    className="border rounded-lg px-2 outline-none py-1 mt-2 border-borderOutlineColor-900 font-normal text-black"
                  />
                </div>

                <div className="font-normal text-secondary">
                  <h1>Level 2</h1>
                  <input
                    type="text"
                    name="level1"
                    className="border rounded-lg px-2 outline-none py-1 mt-2 border-borderOutlineColor-900 font-normal text-black"
                  />
                </div>
              </div>

              {/* user management */}
              <div className="flex ml-5 gap-3">
                <span className="font-medium py-8 w-[20%]">
                  User Management
                </span>

                <div className="font-normal text-secondary">
                  <h1>Level 1</h1>
                  <input
                    type="text"
                    name="level1"
                    className="border rounded-lg px-2 outline-none py-1 mt-2 border-borderOutlineColor-900 font-normal text-black"
                  />
                </div>

                <div className="font-normal text-secondary">
                  <h1>Level 2</h1>
                  <input
                    type="text"
                    name="level1"
                    className="border rounded-lg px-2 outline-none py-1 mt-2 border-borderOutlineColor-900 font-normal text-black"
                  />
                </div>
              </div>

              {/* file management */}

              <div className="flex mb-10 pl-5 mt-4">
                <h4 className="text-blue-300 w-[25%] font-medium">
                  Import Post Code Table
                </h4>

                <div className="flex w-[72%] items-center border rounded-lg py-1 px-2 border-borderOutlineColor-900">
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
                    onChange={handleFileChange("postCodeFile")}
                  />
                  {files.postCodeFile && (
                    <div className="flex justify-between items-center bg-blue-300 rounded-full ml-2 px-4">
                      <span className="text-sm pl-2">
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
            <div className="w-[38%] shadow-2xl shadow-[#969696] rounded-2xl">
              <h1 className="font-bold mx-5 my-5">About Us</h1>

              <div className="flex pl-5 mt-4 gap-2">
                <h4 className="text-blue-300 w-[25%] font-medium text-sm py-3">
                  Upload Document
                </h4>

                <div className="flex w-[71%] items-center border rounded-lg py-1 px-1 border-borderOutlineColor-900">
                  <label
                    htmlFor="file-upload-document"
                    className="flex items-center bg-blue-900 px-2 py-1 rounded-lg cursor-pointer font-semibold text-white"
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
                    <div className="flex justify-between items-center bg-blue-300 rounded-full ml-1 px-2">
                      <span className="text-sm pl-2">
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

              <h2 className="mx-5 text-sm mt-2 text-secondary">Text</h2>
              <textarea
                name="text"
                className="border mx-5 my-2 w-[94%] resize-none h-40 rounded-md border-borderOutlineColor-900 outline-none px-2"
              ></textarea>

              {/*  divider*/}
              <hr className="border-borderOutlineColor-900" />
              <h1 className="font-bold mx-5 my-5">Privacy Policy</h1>

              <div className="flex pl-5 mt-4 gap-2">
                <h4 className="text-blue-300 w-[25%] font-medium text-sm py-3">
                  Upload Document
                </h4>

                <div className="flex w-[71%] items-center border rounded-lg py-1 px-1 border-borderOutlineColor-900">
                  <label
                    htmlFor="file-upload-privacy"
                    className="flex items-center bg-blue-900 px-2 py-1 rounded-lg cursor-pointer font-semibold text-white"
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
                    <div className="flex justify-between items-center bg-blue-300 rounded-full ml-1 px-2">
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

              <h2 className="mx-5 text-sm mt-2 text-secondary">Text</h2>
              <textarea
                name="text"
                className="border mx-5 my-2 w-[94%] resize-none h-40 rounded-md border-borderOutlineColor-900 outline-none px-2"
              ></textarea>
            </div>
          </div>
          {/* bottom btn section */}
          <div className="flex justify-end mr-9 gap-2 mb-4 ">
            <button className=" bg-blue-900 text-textMainColor-900 font-semibold rounded-lg focus:outline-none border-none w-[120px]">
              Save
            </button>
            <button className="border border-black bg-white  text-black font-semibold rounded-lg focus:outline-none hover:border-black">
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
