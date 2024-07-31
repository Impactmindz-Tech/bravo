import { IoMdClose } from "react-icons/io";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";

// Define the styles for 3D animation
const scaleTranslateInStyle = {
  animation: "scaleTranslateIn 0.5s ease-in-out",
};

const scaleTranslateOutStyle = {
  animation: "scaleTranslateOut 0.5s ease-in-out",
};

// eslint-disable-next-line react/prop-types
const ViewGroupModal = ({ viewModalState, setViewModalState, viewModalData }) => {
  const [show, setShow] = useState(viewModalState);

  useEffect(() => {
    if (viewModalState) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 500); // Duration should match the animation time
      return () => clearTimeout(timer);
    }
  }, [viewModalState]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setViewModalState(false);
    }, 250); // Duration should match the animation time
  };

  return (
    <Modal open={viewModalState} onClose={handleClose} className="fixed inset-0 z-50 flex items-center justify-center  overflow-x-hidden overflow-y-auto" closeAfterTransition>
      <div style={show ? scaleTranslateInStyle : scaleTranslateOutStyle} className="relative w-[65vw] sm:w-[90vw] md:w-[90vw] mainFormSection lg:w-[80vw] xl:w-[60vw] h-[60vh] sm:h-[70vh] md:h-[70vh] lg:h-[65vh] xl:h-[60vh] mx-auto rounded-lg overflow-hidden">
        <div className="relative bg-white rounded-lg shadow-md h-full overflow-hidden ">
          <div className="flex justify-between items-center mb-4 bg-blue-900 py-2">
            <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">{viewModalData?.name}</h2>
            <button onClick={handleClose} className="bg-blue-900 hover:text-gray-900 hover:border-none hover:outline-none text-lg text-white border-none outline-none">
              <IoMdClose />
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100%-56px)] px-4 mainFormSection overflow-x-auto">
            <div className="flex flex-col gap-y-4">
              {/* table */}
              <div className="flex justify-between border-gray-100 px-1">
                <table className="w-full">
                  {/* table heading */}
                  <thead>
                    <tr>
                      <th className="px-4 py-4 bg-white top-0 border-gray-200 text-center rounded-tl-lg ">First Name</th>
                      <th className="text-center bg-white border-gray-200 px-4">Last Name</th>
                      <th className="text-center bg-white border-gray-200 px-9">Username</th>
                      <th className="text-center bg-white border-gray-200">Email</th>
                    </tr>
                  </thead>
                  {/* table body */}
                  <tbody>
                    {/* data rows */}
                    {viewModalData?.data?.length > 0 &&
                      viewModalData.data.map((item) => (
                        <tr className="text-center" key={item.user_id}>
                          <td className="px-4 py-2 sm:max-w-[200px]">{item.first_name}</td>
                          <td className="px-4 py-2">{item.last_name}</td>
                          <td className="px-4 py-2">{item.username}</td>
                          <td className="px-4 py-2 capitalize">{item.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewGroupModal;
