import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import adminUserProfile from "./assets/images/adminUserProfile.svg";
import editIcon from "./assets/images/editIcon.svg";
import deleteIcon from "./assets/images/deleteIcon.svg";
import { IoMdAddCircleOutline } from "react-icons/io";
import ModalComponent from "./components/Modal/GroupManagementModal";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
export default function GroupManagement() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* header section */}
      <Header />

      {/* menu section */}
      <div className="flex justify-start">
        {/* left nav bar */}
        <NavBar />

        {/* right side section */}
        <div className="w-[90%] m-auto h-[41vw]">
          {/* top title */}
          <div className="flex justify-between px-1 mt-12">
            <h1 className="text-3xl font-bold">Group Management</h1>
            {/* search bar */}
            <div className="flex gap-1">
              <div className="flex justify-center items-center  border border-[#5f5f5f] rounded-md bg-white text-[#3c3c3c]">
                <input
                  type="text"
                  name="search"
                  placeholder="User Name"
                  className="px-3 py-2 rounded-lg outline-none focus:outline-none text-sm w-[250px]"
                />
                <i className="pr-3 flex items-center text-[#5a5a5a] text-lg">
                  <IoIosSearch />
                </i>
              </div>

              {/* create group btn */}
              <button className="bg-blue-900 flex justify-center text-white hover:-[#ccc]">
                <i className="my-0.4 pr-2 text-2xl">
                  <IoMdAddCircleOutline />
                </i>{" "}
                Create Group
              </button>
            </div>
          </div>

          {/* table section */}

          <div className="h-[440px] overflow-y-auto mt-6 mainFormSection">
            <div className="flex justify-between border-gray-100 py-2 px-10 ">
              <table className="min-w-full shadow-2xl shadow-[#969696] rounded-lg">
                {/* table heading */}
                <thead>
                  <tr className="border-b-1">
                    <th className="px-4 py-4   sticky bg-white top-0 border-gray-200 text-center rounded-tl-lg">
                      Group Name
                    </th>
                    <th className="text-center  sticky top-0 bg-white border-gray-200  px-4">
                      Total Members
                    </th>
                    <th className=" text-center  sticky top-0 bg-white border-gray-200">
                      Members Name
                    </th>

                    <th className="text-center  sticky top-0 bg-white">
                      Action
                    </th>
                  </tr>
                </thead>
                {/* table body */}
                <tbody>
                  {/* data 1 */}
                  <tr className="text-center ">
                    {/* user profile and name */}
                    <td className="px-4 py-4 flex justify-center gap-2">
                      <div className="userIcon">
                        <img
                          src={adminUserProfile}
                          alt="user "
                          className="rounded-full"
                        />
                      </div>
                      <span>Devon Lane</span>
                    </td>

                    {/* admin email id */}
                    <td className=" py-2 text-center px-4">50</td>

                    <td className=" px-4 py-2 capitalize">
                      Jaini Shah, Dipal Shah, Kinjal Patel, Yash Patel, vibha
                      shah....
                    </td>

                    <td className=" px-4 py-2 ">
                      <div className="flex justify-center gap-2">
                        <img
                          src={editIcon}
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer"
                          onClick={openModal}
                        />

                        <img
                          src={deleteIcon}
                          alt="edit icon"
                          className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr className="text-center ">
                    {/* user profile and name */}
                    <td className="px-4 py-4 flex justify-center gap-2">
                      <div className="userIcon">
                        <img
                          src={adminUserProfile}
                          alt="user "
                          className="rounded-full"
                        />
                      </div>
                      <span>Devon Lane</span>
                    </td>

                    {/* admin email id */}
                    <td className=" py-2 text-center px-4">50</td>

                    <td className=" px-4 py-2 capitalize">
                      Jaini Shah, Dipal Shah, Kinjal Patel, Yash Patel, vibha
                      shah....
                    </td>

                    <td className=" px-4 py-2 ">
                      <div className="flex justify-center gap-2">
                        <img
                          src={editIcon}
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer"
                          onClick={openModal}
                        />

                        <img
                          src={deleteIcon}
                          alt="edit icon"
                          className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="text-center ">
                    {/* user profile and name */}
                    <td className="px-4 py-4 flex justify-center gap-2">
                      <div className="userIcon">
                        <img
                          src={adminUserProfile}
                          alt="user "
                          className="rounded-full"
                        />
                      </div>
                      <span>Devon Lane</span>
                    </td>

                    {/* admin email id */}
                    <td className=" py-2 text-center px-4">50</td>

                    <td className=" px-4 py-2 capitalize">
                      Jaini Shah, Dipal Shah, Kinjal Patel, Yash Patel, vibha
                      shah....
                    </td>

                    <td className=" px-4 py-2 ">
                      <div className="flex justify-center gap-2">
                        <img
                          src={editIcon}
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer"
                          onClick={openModal}
                        />

                        <img
                          src={deleteIcon}
                          alt="edit icon"
                          className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr className="text-center ">
                    {/* user profile and name */}
                    <td className="px-4 py-4 flex justify-center gap-2">
                      <div className="userIcon">
                        <img
                          src={adminUserProfile}
                          alt="user "
                          className="rounded-full"
                        />
                      </div>
                      <span>Devon Lane</span>
                    </td>

                    {/* admin email id */}
                    <td className=" py-2 text-center px-4">50</td>

                    <td className=" px-4 py-2 capitalize">
                      Jaini Shah, Dipal Shah, Kinjal Patel, Yash Patel, vibha
                      shah....
                    </td>

                    <td className=" px-4 py-2 ">
                      <div className="flex justify-center gap-2">
                        <img
                          src={editIcon}
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer"
                          onClick={openModal}
                        />

                        <img
                          src={deleteIcon}
                          alt="edit icon"
                          className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr className="text-center ">
                    {/* user profile and name */}
                    <td className="px-4 py-4 flex justify-center gap-2">
                      <div className="userIcon">
                        <img
                          src={adminUserProfile}
                          alt="user "
                          className="rounded-full"
                        />
                      </div>
                      <span>Devon Lane</span>
                    </td>

                    {/* admin email id */}
                    <td className=" py-2 text-center px-4">50</td>

                    <td className=" px-4 py-2 capitalize">
                      Jaini Shah, Dipal Shah, Kinjal Patel, Yash Patel, vibha
                      shah....
                    </td>

                    <td className=" px-4 py-2 ">
                      <div className="flex justify-center gap-2">
                        <img
                          src={editIcon}
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer"
                          onClick={openModal}
                        />

                        <img
                          src={deleteIcon}
                          alt="edit icon"
                          className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr className="text-center ">
                    {/* user profile and name */}
                    <td className="px-4 py-4 flex justify-center gap-2">
                      <div className="userIcon">
                        <img
                          src={adminUserProfile}
                          alt="user "
                          className="rounded-full"
                        />
                      </div>
                      <span>Devon Lane</span>
                    </td>

                    {/* admin email id */}
                    <td className=" py-2 text-center px-4">50</td>

                    <td className=" px-4 py-2 capitalize">
                      Jaini Shah, Dipal Shah, Kinjal Patel, Yash Patel, vibha
                      shah....
                    </td>

                    <td className=" px-4 py-2 ">
                      <div className="flex justify-center gap-2">
                        <img
                          src={editIcon}
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer"
                          onClick={openModal}
                        />

                        <img
                          src={deleteIcon}
                          alt="edit icon"
                          className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr className="text-center ">
                    {/* user profile and name */}
                    <td className="px-4 py-4 flex justify-center gap-2">
                      <div className="userIcon">
                        <img
                          src={adminUserProfile}
                          alt="user "
                          className="rounded-full"
                        />
                      </div>
                      <span>Devon Lane</span>
                    </td>

                    {/* admin email id */}
                    <td className=" py-2 text-center px-4">50</td>

                    <td className=" px-4 py-2 capitalize">
                      Jaini Shah, Dipal Shah, Kinjal Patel, Yash Patel, vibha
                      shah....
                    </td>

                    <td className=" px-4 py-2 ">
                      <div className="flex justify-center gap-2">
                        <img
                          src={editIcon}
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer"
                          onClick={openModal}
                        />

                        <img
                          src={deleteIcon}
                          alt="edit icon"
                          className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr className="text-center ">
                    {/* user profile and name */}
                    <td className="px-4 py-4 flex justify-center gap-2">
                      <div className="userIcon">
                        <img
                          src={adminUserProfile}
                          alt="user "
                          className="rounded-full"
                        />
                      </div>
                      <span>Devon Lane</span>
                    </td>

                    {/* admin email id */}
                    <td className=" py-2 text-center px-4">50</td>

                    <td className=" px-4 py-2 capitalize">
                      Jaini Shah, Dipal Shah, Kinjal Patel, Yash Patel, vibha
                      shah....
                    </td>

                    <td className=" px-4 py-2 ">
                      <div className="flex justify-center gap-2">
                        <img
                          src={editIcon}
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer"
                          onClick={openModal}
                        />

                        <img
                          src={deleteIcon}
                          alt="edit icon"
                          className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* popup model */}
      <div className="flex items-center">
        <ModalComponent isOpen={isOpen} onClose={closeModal} />
      </div>
    </>
  );
}
