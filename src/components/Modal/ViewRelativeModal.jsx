import { IoMdClose } from "react-icons/io";
// eslint-disable-next-line react/prop-types
const ViewRelativeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto backdrop-filter  bg-black bg-opacity-50">
      <div className="h-[600px] overflow-y-auto mt-6 mainFormSection">
        <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden">
          <div className="relative bg-white  rounded-lg shadow-md pb-2 ">
            {/* top model section */}
            <div className="flex justify-between items-center  bg-blue-900 py-2">
              <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">
                View Relative
              </h2>
              <button
                onClick={onClose}
                className="text-red text-white  hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg"
              >
                <IoMdClose />
              </button>
            </div>

            <div className="py-2 flex flex-col gap-y-4">
              {/* table */}
              <div className="flex justify-between border-gray-100 py-2 px-2">
                <table className="w-full shadow-2xl shadow-[#969696] rounded-lg">
                  {/* table heading */}
                  <thead>
                    <tr>
                      <th className="px-4 py-4   bg-white top-0 border-gray-200 text-left rounded-tl-lg w-[180px]">
                        User Name
                      </th>
                      <th className="text-left   bg-white border-gray-200  px-4">
                        Email Id
                      </th>
                      <th className=" text-center bg-white border-gray-200">
                        Contact No
                      </th>

                      <th className="text-center   bg-white">Address</th>
                      <th className=" text-center  bg-white border-gray-200 px-9">
                        Authentication Code
                      </th>
                      <th className="text-center  bg-white">Relation</th>
                    </tr>
                  </thead>
                  {/* table body */}
                  <tbody>
                    {/* data 1 */}
                    <tr className="text-center">
                      {/* user profile and name */}
                      <td className="px-4 py-4  ">
                        <div className="flex gap-2">
                          <div className="userIcon">
                            <img
                              src="adminUserProfile.svg"
                              alt="user "
                              className="rounded-full"
                            />
                          </div>
                          <span>Devon Lane</span>
                        </div>
                      </td>

                      {/* admin email id */}
                      <td className=" py-2 text-left px-4">
                        debra.holt@exaple.com
                      </td>
                      <td className=" px-4 py-2 ">(406) 555-0120</td>
                      <td className=" px-4 py-2 ">6391 Elgin st c....</td>
                      <td className=" px-4 py-2 ">3467895768</td>

                      <td className=" px-4 py-2 capitalize">father</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRelativeModal;
