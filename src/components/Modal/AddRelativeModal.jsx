import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Modal } from "@mui/material";

const AddRelativeModal = ({ addRelativeModalOpen, setAddRelativeModalOpen }) => {
  const [relatives, setRelatives] = useState([
    { username: "", relation: "" },
  ]);

  const addInput = () => {
    setRelatives([...relatives, { username: "", relation: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const newRelatives = [...relatives];
    newRelatives[index][field] = value;
    setRelatives(newRelatives);
  };

  const saveData = () => {
    console.log(relatives);
    // Save logic here
  };

  return (
    <Modal
      open={addRelativeModalOpen}
      onClose={() => setAddRelativeModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
    >
      <div className="overflow-y-auto 4xl:h-[40vh] 3xl:h-[40vh] 2xl:h-[45vh] xl:h-[45vh] lg:h-[45vh] md:h-[55vh] sm:h-[50vh]">
        <div className="relative w-[30vw] sm:w-[80vw] px-2 rounded-lg overflow-hidden md:w-[70vw] lg:w-[50vw] xl:w-[50vw] 2xl:w-[40vw] 3xl:w-[40vw] 4xl:w-[45vw]">
          <div className="relative bg-white rounded-lg shadow-md pb-2">
            <div className="flex justify-between items-center bg-blue-900 py-2">
              <h2 className="text-xl font-semibold text-gray-800 pl-4 text-white">
                Add Relative
              </h2>
              <button
                onClick={() => setAddRelativeModalOpen(false)}
                className="text-red text-white hover:text-gray-900 hover:outline-none border-none outline-none bg-blue-900 text-lg"
              >
                <IoMdClose />
              </button>
            </div>
            <div className="py-2 flex flex-col gap-y-4">
              {relatives.map((relative, index) => (
                <div key={index} className="flex md:flex-wrap gap-2 my-2 mx-4">
                  <div className="flex w-[33%] md:w-full flex-col gap-y-2">
                    <span className="text-sm">User Name</span>
                    <select
                      name="username"
                      className="input"
                      value={relative.username}
                      onChange={(e) =>
                        handleInputChange(index, "username", e.target.value)
                      }
                    >
                      <option>John Doe</option>
                      <option>Jane Doe</option>
                      <option>Someone Else</option>
                    </select>
                  </div>
                  <div className="flex w-[33%] md:w-full flex-col gap-y-2">
                    <span className="text-sm">Relation</span>
                    <select
                      name="relation"
                      className="input"
                      value={relative.relation}
                      onChange={(e) =>
                        handleInputChange(index, "relation", e.target.value)
                      }
                    >
                      <option>Father</option>
                      <option>Sister</option>
                      <option>Son</option>
                    </select>
                  </div>
                  <div className="flex w-[33%] md:w-full pt-6 items-center justify-between">
                    <div className="flex items-center gap-2 text-2xl">
                      <i>
                        <BiSolidEdit className="cursor-pointer text-3xl hover:text-blue-300" />
                      </i>
                      {relatives?.length > 1 && <i>
                        <RiDeleteBin6Line className="cursor-pointer text-3xl hover:text-blue-300" onClick={() => setRelatives(relatives.filter((_, i) => i !== index))} />
                      </i>}
                    </div>
                    <div className="flex justify-center">
                      <MdAddCircleOutline
                        onClick={addInput}
                        className="cursor-pointer text-3xl text-blue-900 hover:text-blue-300"
                      />
                    </div>
                  </div>
                </div>
              ))}

            </div>

            <div className="flex justify-end mr-9 gap-2 my-8">
              <button
                onClick={saveData}
                className="bg-blue-900 text-white font-semibold rounded-lg focus:outline-none w-[120px]"
              >
                Save
              </button>
              <button
                onClick={() => setAddRelativeModalOpen(false)}
                className="border border-black bg-white text-black font-semibold rounded-lg focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddRelativeModal;
