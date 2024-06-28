import { IoMdClose } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal } from "@mui/material";

// eslint-disable-next-line react/prop-types
const AddRelativeModal = ({
  addRelativeModalOpen,
  setAddRelativeModalOpen,
}) => {
  return (
    <Modal
      open={addRelativeModalOpen}
      onClose={() => setAddRelativeModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto "
    >
      <div className="overflow-y-auto mainFormSection 4xl:h-[20vh]">
        <div className="relative w-[30vw] md:w-[60vw]  sm:w-full px-2 rounded-lg overflow-hidden xl:w-[60vw] 2xl:w-[50vw] 4xl:w-[55vw]">
          <div className="relative bg-white  rounded-lg shadow-md pb-2 ">
            <div className="flex justify-between items-center  bg-blue-900 py-2">
              <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">
                Add Relative
              </h2>
              <button
                onClick={() => setAddRelativeModalOpen(false)}
                className="text-red text-white  hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg"
              >
                <IoMdClose />
              </button>
            </div>
            <div className="py-2 flex flex-col gap-y-4">
              <div className="flex md:flex-wrap gap-2 my-2 mx-4">
                <div className="flex w-[33%] md:w-full flex-col gap-y-2">
                  <span className="text-sm">User Name</span>
                  <select name="username" className="input">
                    <option>John Doe</option>
                    <option>John Doe</option>
                    <option>John Doe</option>
                  </select>
                </div>
                <div className="flex w-[33%] md:w-full flex-col gap-y-2 ">
                  <span className="text-sm">Relation</span>
                  <select name="username" className="input">
                    <option>Father</option>
                    <option>Sister</option>
                    <option>Son</option>
                  </select>
                </div>
                <div className="flex w-[33%]  md:w-full pt-6 items-center justify-between">
                  <div className="flex items-center gap-2 text-2xl">
                    <i>
                      <BiSolidEdit className="cursor-pointer text-3xl hover:text-blue-300" />
                    </i>
                    <i>
                      <RiDeleteBin6Line className="cursor-pointer text-3xl hover:text-blue-300" />
                    </i>
                  </div>
                  <div className="text-3xl text-blue-900">
                    <MdAddCircleOutline
                      className="cursor-pointer hover:text-blue-300"
                      // onClick={addRelation}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* bottom button */}
            <div className="flex justify-end  mr-9 gap-2 my-8">
              <button className=" bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">
                Save
              </button>
              <button
                onClick={() => setAddRelativeModalOpen(false)}
                className="border border-black bg-white  text-black font-semibold rounded-lg focus:outline-none"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddRelativeModal;
