import React from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/hooks/useAuth.js";
import { IoMusicalNotesSharp } from "react-icons/io5";

const Navbar = () => {
  const { handelLogOut } = useAuth();
  const navigate = useNavigate();

 const handelLogoutButton = async () => {
  console.log("Logout button clicked");

  await handelLogOut();

  console.log("Logout completed");

  navigate("/login");
};
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h1><IoMusicalNotesSharp size={30} className="music-icon"/>Moodify</h1>
        </div>
        <div className="logout">
          <button onClick={handelLogoutButton}>Logout</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
