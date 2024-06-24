import { IoMdClose } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
// eslint-disable-next-line react/prop-types
const AddRelativeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // add more relation on btn click
  const addRelation = () => {};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto backdrop-filter  bg-black bg-opacity-50">
      <div className="overflow-y-auto mt-6 mainFormSection">
        <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden">
          <div className="relative bg-white  rounded-lg shadow-md pb-2 ">
            {/* top model section */}
            <div className="flex justify-between items-center  bg-blue-900 py-2">
              <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">
                Add Relative
              </h2>
              <button
                onClick={onClose}
                className="text-red text-white  hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg"
              >
                <IoMdClose />
              </button>
            </div>
            {/* main section */}
            <div className="py-2 flex flex-col gap-y-4">
              <div className="flex gap-2 my-2 mx-4">
                <div className="flex flex-col gap-y-2">
                  <span className="text-sm">User Name</span>
                  <select
                    name="username"
                    className="w-[200px] border rounded-md py-1 text-sm"
                  >
                    <option>John Doe</option>
                    <option>John Doe</option>
                    <option>John Doe</option>
                  </select>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <span className="text-sm">Relation</span>
                  <select
                    name="username"
                    className="w-[200px] border rounded-md py-1 text-sm"
                  >
                    <option>Father</option>
                    <option>Sister</option>
                    <option>Son</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 text-2xl  mt-6 ml-2">
                  <i>
                    <BiSolidEdit className="cursor-pointer hover:text-blue-300" />
                  </i>
                  <i>
                    <RiDeleteBin6Line className="cursor-pointer hover:text-blue-300" />
                  </i>
                </div>
                <div className="mt-6 text-3xl px-5 text-blue-900 flex justify-center items-center">
                  <MdAddCircleOutline
                    className="cursor-pointer hover:text-blue-300"
                    onClick={addRelation}
                  />
                </div>
              </div>

              <div className="flex gap-2 my-2 mx-4">
                <div className="flex flex-col gap-y-2">
                  <span className="text-sm">User Name</span>
                  <select
                    name="username"
                    className="w-[200px] border rounded-md py-1 text-sm"
                  >
                    <option>John Doe</option>
                    <option>John Doe</option>
                    <option>John Doe</option>
                  </select>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <span className="text-sm">Relation</span>
                  <select
                    name="username"
                    className="w-[200px] border rounded-md py-1 text-sm"
                  >
                    <option>Father</option>
                    <option>Sister</option>
                    <option>Son</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 text-2xl  mt-6 ml-2">
                  <i>
                    <BiSolidEdit className="cursor-pointer hover:text-blue-300" />
                  </i>
                  <i>
                    <RiDeleteBin6Line className="cursor-pointer hover:text-blue-300" />
                  </i>
                </div>
                <div className="mt-6 text-3xl px-5 text-blue-900 flex justify-center items-center">
                  <MdAddCircleOutline
                    className="cursor-pointer hover:text-blue-300"
                    onClick={addRelation}
                  />
                </div>
              </div>

              <div className="flex gap-2 my-2 mx-4">
                <div className="flex flex-col gap-y-2">
                  <span className="text-sm">User Name</span>
                  <select
                    name="username"
                    className="w-[200px] border rounded-md py-1 text-sm"
                  >
                    <option>John Doe</option>
                    <option>John Doe</option>
                    <option>John Doe</option>
                  </select>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <span className="text-sm">Relation</span>
                  <select
                    name="username"
                    className="w-[200px] border rounded-md py-1 text-sm"
                  >
                    <option>Father</option>
                    <option>Sister</option>
                    <option>Son</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 text-2xl  mt-6 ml-2">
                  <i>
                    <BiSolidEdit className="cursor-pointer hover:text-blue-300" />
                  </i>
                  <i>
                    <RiDeleteBin6Line className="cursor-pointer hover:text-blue-300" />
                  </i>
                </div>
                <div className="mt-6 text-3xl px-5 text-blue-900 flex justify-center items-center">
                  <MdAddCircleOutline
                    className="cursor-pointer hover:text-blue-300"
                    onClick={addRelation}
                  />
                </div>
              </div>
            </div>

            {/* bottom button */}
            <div className="flex justify-end  mr-9 gap-2 my-8">
              <button className=" bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]">
                Save
              </button>
              <button
                onClick={onClose}
                className="border border-black bg-white  text-black font-semibold rounded-lg focus:outline-none"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRelativeModal;
