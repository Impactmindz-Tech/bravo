import { IoMdClose } from "react-icons/io";
import { Modal } from "@mui/material";
import adminUserProfile from "../../assets/images/adminUserProfile.svg";
// eslint-disable-next-line react/prop-types
const ViewGroupModal = ({ viewModalState, setViewModalState, viewModalData }) => {
  return (
    <Modal open={viewModalState} onClose={() => setViewModalState(false)} className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto backdrop-filter   bg-opacity-50">
      <div className="h-[600px] overflow-y-auto sm:h-[50vh] mainFormSection md:h-[50vh] lg:h-[50vh] xl:h-[50vh]  2xl:h-[50vh] 3xl:h-[50vh] 4xl:h-[40vh]">
        <div className="relative w-[100%] max-w-[55vw] sm:max-w-[100vw] md:max-w-[100vw] lg:max-w-[70vw] xl:max-w-[65vw] 2xl:max-w-[65vw] 3xl:max-w-[85vw] 4xl:max-w-[65vw] mx-auto rounded-lg overflow-hidden sm:w-[90vw] md:w-[90vw] lg:w-[96vw]">
          <div className="relative bg-white  rounded-lg shadow-md pb-2 ">
            {/* top model section */}
            <div className="flex justify-between items-center  bg-blue-900 py-2">
              <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">{viewModalData?.name}</h2>
              <button onClick={() => setViewModalState(false)} className="text-red text-white  hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg">
                <IoMdClose />
              </button>
            </div>

            <div className="overflow-y-hidden sm:overflow-y-auto sm:max-h-[76vh] ">
              <div className="py-2 flex flex-col gap-y-4 sm:w-[800px] ">
                {/* table */}
                <div className="flex justify-between border-gray-100 py-2 px-1">
                  <table className="w-full boxShadow rounded-lg ">
                    {/* table heading */}
                    <thead>
                      <tr>
                        <th className="px-4 py-4   bg-white top-0 border-gray-200 text-left rounded-tl-lg w-[180px]">First Name</th>
                        <th className="text-left   bg-white border-gray-200  px-4">Last Name</th>
                        <th className=" text-center  bg-white border-gray-200 px-9">Username</th>
                        <th className=" text-center bg-white border-gray-200">Email</th>
                      </tr>
                    </thead>
                    {/* table body */}
                    <tbody>
                      {/* data 1 */}
                      {viewModalData?.data?.length > 0 && (
                        <>
                          {viewModalData.data.map((item) => (
                            <tr className="text-center" key={item.user_id}>
                              <td className="px-4 py-2 sm:max-w-[200px]">{item.first_name}</td>
                              <td className="px-4 py-2">{item.last_name}</td>
                              <td className="px-4 py-2">{item.username}</td>
                              <td className="px-4 py-2 capitalize">{item.email}</td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewGroupModal;
