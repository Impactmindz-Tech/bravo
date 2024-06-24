import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import UserManagementModalComponent from "./components/Modal/UserManagementModal";
import { IoChevronDown } from "react-icons/io5";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import { FaEye } from "react-icons/fa";
import ViewRelativeModal from "./components/Modal/ViewRelativeModal";
export default function UserManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [relativeModal, setRelativeModal] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openRelativeModal = () => setRelativeModal(true);
  const closeRelativeModal = () => setRelativeModal(false);

  return (
    <>
      {/* header section */}
      <Header />

      {/* menu section */}
      <div className="flex justify-start ">
        {/* left nav bar */}
        <NavBar />

        {/* right side section */}
        <div className="w-[90%] m-auto h-[41vw]">
          {/* top title */}
          <div className="flex justify-between px-1 mt-12">
            <h1 className="text-3xl font-bold">User Management</h1>
            {/* search bar */}
            <div className="flex gap-1">
              <div className="flex justify-center items-center border border-[#ccc] rounded-md bg-white text-[#3c3c3c]">
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  className="px-3 py-2 rounded-lg outline-none focus:outline-none text-md w-[270px]"
                />
                <i className="pr-3 flex items-center text-[#5a5a5a] text-lg">
                  <IoIosSearch />
                </i>
              </div>

              {/* filter btn */}
              <button className="bg-blue-300 flex justify-center gap-8 text-sm text-white hover:border-[#ccc]">
                Filter
                <i className="text-white text-md my-1">
                  <IoChevronDown />
                </i>
              </button>
              {/* add admin btn */}
              <button
                className="bg-blue-900 text-white flex justify-center  hover:border-[#ccc]"
                onClick={openModal}
              >
                <i className="my-0.4 pr-2 text-2xl">
                  <IoMdAddCircleOutline />
                </i>{" "}
                Add User
              </button>
            </div>
          </div>

          {/* table section */}

          <div className="h-[440px] overflow-y-auto mainFormSection mt-6">
            <div className="flex justify-between border-gray-100 py-2 px-10">
              <table className="min-w-full shadow-2xl shadow-[#969696] rounded-lg">
                {/* table heading */}
                <thead>
                  <tr>
                    <th className="px-4 py-4   sticky bg-white top-0 border-gray-200 text-left rounded-tl-lg">
                      User Name
                    </th>
                    <th className="text-left  sticky top-0 bg-white border-gray-200  px-4">
                      Email Id
                    </th>
                    <th className=" text-center  sticky top-0 bg-white border-gray-200">
                      Contact No
                    </th>
                    <th className=" text-center  sticky top-0 bg-white border-gray-200 w-[150px] px-9">
                      Authentication Code
                    </th>
                    <th className="text-center  sticky top-0 bg-white">
                      Status
                    </th>
                    <th className="text-center  sticky top-0 bg-white">
                      Relation
                    </th>
                    <th className="text-center  sticky top-0 bg-white">
                      Relative
                    </th>
                    <th className="text-center  sticky top-0 bg-white">
                      Action
                    </th>
                  </tr>
                </thead>
                {/* table body */}
                <tbody>
                  {/* data 1 */}
                  <tr className="text-center">
                    {/* user profile and name */}
                    <td className="  px-4 py-4 flex gap-2">
                      <div className="userIcon">
                        <img
                          src="adminUserProfile.svg"
                          alt="user "
                          className="rounded-full"
                        />
                      </div>
                      <span>Devon Lane</span>
                    </td>

                    {/* admin email id */}
                    <td className=" py-2 text-left px-4">
                      debra.holt@exaple.com
                    </td>
                    <td className=" px-4 py-2 ">(406) 555-0120</td>
                    <td className=" px-4 py-2 ">3467895768</td>

                    <td className=" px-4">
                      <select
                        id="role"
                        name="role"
                        className="py-1 px-6 rounded-full bg-[#E2E9D7]  focus:outline-none  text-[#036507] focus:border-none "
                      >
                        <option value="admin">Active</option>
                        <option value="user">Inactive</option>
                      </select>
                    </td>
                    <td className=" px-4 py-2 capitalize">student</td>
                    <td className=" px-4 py-2 capitalize text-lg ">
                      <div
                        className="flex justify-center text-[#065813] cursor-pointer"
                        onClick={openRelativeModal}
                      >
                        <FaEye />
                      </div>
                    </td>
                    <td className=" px-4 py-2 ">
                      <div className="flex justify-center gap-2">
                        <img
                          src="editIcon.svg"
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer"
                        />

                        <img
                          src="deleteIcon.svg"
                          alt="edit icon"
                          className="mr-2 text-[#4E493E] hover:text-red-800 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>

                  {/* data 2 */}

                  <tr className="order-[#9f9f9f] text-center">
                    {/* user profile and name */}
                    <td className=" px-4 py-4 flex gap-2">
                      <div className="userIcon">
                        <img
                          src="adminUserProfile.svg"
                          alt="user "
                          className="rounded-full"
                        />
                      </div>
                      <span>Devon Lane</span>
                    </td>

                    {/* admin email id */}
                    <td className=" py-2 text-left px-4">
                      debra.holt@exaple.com
                    </td>
                    <td className=" px-4 py-2 ">(406) 555-0120</td>
                    <td className=" px-4 py-2 ">3467895768</td>

                    <td className=" px-4">
                      <select
                        id="role"
                        name="role"
                        className="py-1 px-6 rounded-full bg-[#FFADAD]  focus:outline-none  text-danger focus:border-none "
                      >
                        <option value="admin">Inactive</option>
                        <option value="user">Active</option>
                      </select>
                    </td>
                    <td className=" px-4 py-2 capitalize">student</td>
                    <td className=" px-4 py-2 capitalize text-lg ">
                      <div className="flex justify-center text-[#065813] cursor-pointer">
                        <FaEye />
                      </div>
                    </td>
                    <td className=" px-4 py-2 ">
                      <div className="flex justify-center gap-2">
                        <img
                          src="editIcon.svg"
                          alt="edit icon"
                          className="mr-2  text-[#826007] hover:text-blue-800 cursor-pointer"
                        />

                        <img
                          src="deleteIcon.svg"
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
      <div className="flex items-center ">
        <UserManagementModalComponent isOpen={isOpen} onClose={closeModal} />
      </div>

      {/* relative modal */}
      <div className="flex items-center ">
        <ViewRelativeModal
          isOpen={relativeModal}
          onClose={closeRelativeModal}
        />
      </div>
    </>
  );
}
