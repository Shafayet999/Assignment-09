import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser().then().catch();
  };

  const activeClass = "bg-pink-600 text-white";

  return (
    <div className="navbar bg-pink-50 shadow-sm">
      <div className="navbar-start">
        
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-lg mt-3 w-52 p-2">
            <NavLink
              to="/"
              className={({ isActive }) => `btn btn-ghost w-full ${isActive ? activeClass : ""}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/Services"
              className={({ isActive }) => `btn btn-ghost w-full ${isActive ? activeClass : ""}`}
            >
              Services
            </NavLink>
            <NavLink
              to="/MyProfile"
              className={({ isActive }) => `btn btn-ghost w-full ${isActive ? activeClass : ""}`}
            >
              My Profile
            </NavLink>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-4xl font-bold text-pink-600">
          PetCare
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-10 font-semibold">
          <NavLink className="btn" to={"/"}>
            Home
          </NavLink>
          <NavLink className="btn" to={"/Services"}>
            Services
          </NavLink>
          <NavLink className="btn" to={"/MyProfile"}>
            My Profile
          </NavLink>
        </ul>
      </div>

      <div className="navbar-end flex gap-3 items-center">
        {user && (
          <div
            className="tooltip tooltip-bottom"
            data-tip={user.displayName || "User"}
          >
            <img
              className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm cursor-pointer"
              src={
                user.photoURL ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
              }
              alt="user"
            />
          </div>
        )}

        {user ? (
          <a onClick={handleSignOut} className="btn">
            Log Out
          </a>
        ) : (
          <NavLink to="/auth/login" className="btn">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
