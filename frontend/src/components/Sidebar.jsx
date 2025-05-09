import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      });
      // Add toast and redirect if needed
    } catch (err) {
      // Add error toast if needed
    }
  };

  const gotoPage = (path) => {
    navigateTo(path);
  };

  return (
    <>
      {/* Sidebar */}
      <nav
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`fixed top-0 left-0 h-full bg-[#03001C] text-white 
        flex flex-col items-center py-6 shadow-lg transition-all duration-300 ease-in-out 
        ${expanded ? "w-48 rounded-r-3xl" : "w-[70px] rounded-r-xl"}`}
      >
        <div className="flex flex-col gap-8 items-center w-full mt-6">
          <SidebarIcon
            icon={<TiHome />}
            text="Home"
            onClick={() => gotoPage("/admin-dashboard")}
            expanded={expanded}
          />
          <SidebarIcon
            icon={<FaUserDoctor />}
            text="Add Equipment"
            onClick={() => gotoPage("/dashboard")}
            expanded={expanded}
          />
          <SidebarIcon
            icon={<MdAddModerator />}
            text="Club Inventory"
            onClick={() => gotoPage("/club-inventory")}
            expanded={expanded}
          />
          <SidebarIcon
            icon={<IoPersonAddSharp />}
            text="Summary Report"
            onClick={() => gotoPage("/summary-report")}
            expanded={expanded}
          />
        </div>
      </nav>

      {/* Mobile Hamburger (optional if not needed) */}
      <div className="md:hidden fixed top-4 left-4 text-white p-2 z-50">
        <GiHamburgerMenu className="w-6 h-6" />
      </div>
    </>
  );
};

// Icon + Text Wrapper
const SidebarIcon = ({ icon, text, onClick, expanded }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-4 cursor-pointer px-4 py-2 hover:bg-[#B6EADA]/20 transition-all rounded-lg group"
  >
    <div className="text-2xl group-hover:scale-110 transition-transform">{icon}</div>
    {expanded && <span className="text-sm transition-opacity">{text}</span>}
  </div>
);

export default Sidebar;
