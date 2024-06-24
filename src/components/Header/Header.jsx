import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between border-gray-100 py-2 px-10 shadow-md">
      <div className="logo pl-2 ">
        <Link to="/">
          <img src="logo.png" alt="header logo" className="w-40" />
        </Link>
      </div>

      {/* user section */}

      <div className="userSection flex gap-3">
        <i className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F2F2F2] userImage mt-1 cursor-pointer ">
          <FaRegUserCircle />
        </i>

        <span className="font-semibold pl-1 py-3 cursor-pointer">
          My Account
        </span>
        <i className="mt-4 cursor-pointer">
          <IoIosArrowDown />
        </i>
      </div>
    </header>
  );
}
