import { IoMdClose } from "react-icons/io";
import { Modal } from "@mui/material";
// eslint-disable-next-line react/prop-types
const ViewGroupModal = ({ viewModalState, setViewModalState, viewModalData }) => {
  return (
    <Modal open={viewModalState} onClose={() => setViewModalState(false)} className="fixed modalContainer inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="overflow-y-auto mainFormSection sm:w-[90vw] sm:h-[70vh] md:w-[90vw] md:h-[70vh] lg:w-[80vw] lg:h-[65vh] xl:w-[60vw] xl:h-[60vh] w-[55vw] h-[60vh]">
        <div className="relative w-full mx-auto rounded-lg overflow-hidden">
          <div className="relative bg-white rounded-lg shadow-md pb-4">
            <div className="flex justify-between items-center mb-4 bg-blue-900 py-2">
              <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">{viewModalData?.name}</h2>
              <button onClick={() => setViewModalState(false)} className="bg-blue-900 hover:text-gray-900 hover:border-none hover:outline-none text-lg text-white border-none outline-none">
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
                        <th className="px-4 py-4   bg-white top-0 border-gray-200 text-center rounded-tl-lg w-[180px]">First Name</th>
                        <th className="text-center   bg-white border-gray-200  px-4">Last Name</th>
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
