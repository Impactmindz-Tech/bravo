import { CiUser } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { GrGroup } from "react-icons/gr";
import { VscSettingsGear } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
export default function NavBar() {
  const location = useLocation();
  return (<>

    <nav className="flex justify-center bg-blue-900 h-[43.24vw] w-[80px] sm:h-[100vh]  ">
      <ul className="mt-8 w-full">
        <Link to="/" className="text-gray-950 text-2xl hover:text-gray-950 sm:text-sm">
          <li
            className={`w-full py-3 flex justify-center mb-2 hover:bg-white  cursor-pointer  hover:text-black ${
              location.pathname === "/" ? "bg-white text-black" : "text-white"
            }`}
          >
            <CiHome />
          </li>
        </Link>

        <Link
          to="/adminmanagement"
          className="text-gray-950 text-2xl hover:text-gray-950 sm:text-sm"
        >
          <li
            className={`w-full  py-3 flex justify-center mb-2 hover:bg-white  cursor-pointer  hover:text-black ${
              location.pathname === "/adminmanagement"
                ? "bg-white text-black"
                : "text-white"
            }`}
          >
            <CiUser />
          </li>
        </Link>

        <Link
          to="/groupmanagement"
          className="text-gray-950 text-2xl hover:text-gray-950 sm:text-sm"
        >
          <li
            className={`w-full  py-3 flex justify-center mb-2 hover:bg-white  cursor-pointer  hover:text-black ${
              location.pathname === "/groupmanagement"
                ? "bg-white text-black"
                : "text-white"
            }`}
          >
            <GrGroup />
          </li>
        </Link>

        <Link to="/calender" className="text-gray-950 text-2xl hover:text-gray-950 sm:text-sm">
          <li
            className={
              location.pathname == "/calender"
                ? "bg-white w-full  py-3 flex justify-center mb-2 hover:bg-white  cursor-pointer text-black hover:text-black"
                : "w-full  py-3 flex justify-center mb-2 hover:bg-white  cursor-pointer text-white hover:text-black"
            }
          >
            <SlCalender />
          </li>
        </Link>

        <Link
          to="/systemsetting"
          className="text-gray-950 text-2xl hover:text-gray-950 sm:text-sm"
        >
          <li
            className={`w-full  py-3 flex justify-center mb-2 hover:bg-white  cursor-pointer  hover:text-black ${
              location.pathname === "/systemsetting"
                ? "bg-white text-black"
                : "text-white"
            }`}
          >
            <VscSettingsGear />
          </li>
        </Link>
      </ul>
    </nav>
    </>
  );
}
