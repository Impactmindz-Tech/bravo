import { CiUser } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { GrGroup } from "react-icons/gr";
import { VscSettingsGear } from "react-icons/vsc";

const NavBar = () => {
  const navLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: <CiHome /> },
    {
      to: "/admin/adminmanagement",
      label: "Admin Management",
      icon: <CiUser />,
    },
    {
      to: "/admin/groupmanagement",
      label: "Group Management",
      icon: <GrGroup />,
    },
    { to: "/admin/calendar", label: "Calender", icon: <SlCalender /> },
    { to: "/admin/settings", label: "Settings", icon: <VscSettingsGear /> },
  ];
  return (
    <nav className="flex justify-center ">
      <ul className="mt-8 w-full">
        {navLinks?.map((item, index) => {
          return (
            <li key={index} className="cursor-pointer hover:text-black">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `w-full py-3 hover:bg-white hover:text-blue-900 mb-2 flex flex-col items-center text-xl ${
                    isActive ? "bg-white text-blue-900" : "text-white"
                  }`
                }
              >
                {item.icon}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
