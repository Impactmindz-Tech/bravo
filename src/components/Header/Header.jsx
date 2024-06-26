import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from '../../assets/images/headerLogo.png'
export default function Header() {
  return (
    <header className="flex justify-between border-gray-100 py-2 px-10 shadow-md  min-w-[100%] sm:px-2 md:px-1 lg:px-2 xl:px-2 2xl:px-1 sm:py-1">
      <div className="logo pl-2 sm:pl-0 sm:pt-1 ">
        <Link to="/">
          <img src={logo} alt="header logo" className="w-40 sm:w-[25vw] lg:w-[18vw] sm:pt-2" />
        </Link>
      </div>

      {/* user section */}

      <div className="flex gap-3 sm:gap-1 md:gap-1 sm:text-sm/[1vw]">
        <i className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F2F2F2] userImage mt-1 cursor-pointer sm:w-[7vw] sm:h-[7vw] md:w-[7vw] md:h-[7vw] lg:w-[6vw] lg:h-[6vw] lg:mt-0 sm:mt-3">
          <FaRegUserCircle className="md:text-xl lg:text-2xl sm:text-sm"/>
        </i>

        <span className="font-semibold pl-1 py-3 cursor-pointer sm:py-[4vw] sm:font-medium md:text-md lg:text-xl sm:text-sm">
          My Account
        </span>
        <i className="mt-4 cursor-pointer sm:mt-5 md:mt-5">
          <IoIosArrowDown />
        </i>
      </div>
    </header>
  );
}
