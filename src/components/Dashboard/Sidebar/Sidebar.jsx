/* eslint-disable no-unused-vars */
import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { MdManageHistory } from "react-icons/md";
import { MdOutlineSettingsInputComposite } from "react-icons/md";
import { BsFingerprint, BsFillHouseAddFill } from "react-icons/bs";
import { GrUserAdmin, GrUserNew } from "react-icons/gr";
import { MdHomeWork } from "react-icons/md";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import MenuItem from "../../Shared/Navlink/MenuItem";
import useRole from "../../../hooks/useRole";
import ToggleBtn from "../../../pages/Dashboard/Admin/Component/ToggleBtn";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Sidebar = () => {
  const { logOut, user } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role] = useRole();
const axiosPublc= useAxiosPublic();
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

   const handleBeAHost = () => {
      const userInfo = {
        name: user?.displayName,
        email: user?.email,
        role: "guest",
        image: user?.photoURL,
        timeStamp: Date.now(),
        status: "Requested",
      };
  
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to a host?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Request",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axiosPublc.put("/users", userInfo);
          if (data?.modifiedCount > 0) {
            Swal.fire({
              title: "Request success",
              text: "Please wait for admin approval",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Request on pending",
              text: "Please wait for admin approval",
              icon: "warning",
            });
          }
        }
      });
    };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src="https://i.ibb.co/4ZXzmq5/logo.png"
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src="https://i.ibb.co/4ZXzmq5/logo.png"
                  alt="logo"
                  width="100"
                  height="100"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}
            <ToggleBtn toggleHandler={handleToggle} />
            {/*  Menu Items */}
            <nav>
              {role === "guest" && (
                <>
                  <MenuItem
                    icon={BsGraphUp}
                    text="Statistics"
                    to="/dashboard"
                  />
                  <MenuItem
                    icon={MdOutlineSettingsInputComposite}
                    text="My Bookings"
                    to="my-bookings"
                  />
                  <button onClick={handleBeAHost} className="w-full flex item-center gap-3 px-4 font-medium">
                    {/* <MenuItem
                      icon={GrUserNew}
                      text="Become a Host"
                    /> */}
                    <GrUserNew className="w-5 h-5"/> Become a Host
                  </button>
                </>
              )}
              {role === "host" ? (
                isActive ? (
                  <>
                    <MenuItem
                      icon={BsGraphUp}
                      text="Statistics"
                      to="/dashboard"
                    />
                    <MenuItem
                      icon={BsFillHouseAddFill}
                      text="Add Room"
                      to="add-room"
                    />
                    <MenuItem
                      icon={MdManageHistory}
                      text="Manage Bookings"
                      to="manage-bookings"
                    />

                    <MenuItem
                      icon={MdHomeWork}
                      text="My Listings"
                      to="my-listings"
                    />
                  </>
                ) : (
                  <MenuItem
                    icon={BsGraphUp}
                    text="Statistics"
                    to="/dashboard"
                  />
                )
              ) : (
                ""
              )}
              {role === "admin" && (
                <>
                  <MenuItem
                    icon={BsGraphUp}
                    text="Statistics"
                    to="/dashboard"
                  />
                  <MenuItem
                    icon={GrUserAdmin}
                    text="Manage Users"
                    to="manage-users"
                  />
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
              }`
            }
          >
            <FcSettings className="w-5 h-5" />

            <span className="mx-4 font-medium">Profile</span>
          </NavLink>
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
