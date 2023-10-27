// @ts-nocheck
import React, { useContext, useEffect, useRef, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";
import style from "./Profile.module.css";
import { useAuth } from "../Provider/hooks";

export const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useAuth();
  const { theme, setTheme } = useContext(ThemeContext);
  const ProfileIconRef = useRef(null);
  const navigate = useNavigate();

  // const userDetail = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);

  const handleLogOut = () => {
    localStorage.removeItem("userDetails");
    setUser({});
    navigate("/login");
  };

  useEffect(() => {
    const hideModal = (e) => {
      if (ProfileIconRef.current) {
        if (ProfileIconRef.current.contains(e.target)) {
          return;
        }
        setShowModal(false);
      }
    };
    if (showModal) {
      document.addEventListener("click", hideModal);
    }
    return () => {
      document.removeEventListener("click", hideModal);
    };
  }, [showModal]);
  const toProfile = () => {
    navigate("/user-profile");
  };
  return (
    <section className="profile">
      <section
        className={style.ProfileImage}
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(!showModal);
        }}
      >
        <img
          src={
            user?.profileImage ||
            "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
          }
          alt="Profile Image"
        />
      </section>
      {showModal && (
        <section
          ref={ProfileIconRef}
          className="useProfile"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="profileSection" onClick={toProfile}>
            <div className="userProfileDetails">
              <img
                src={
                  user?.profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                }
                alt="Profile Image"
              />
              <span>{user?.name}</span>
            </div>
            <hr></hr>
            <div style={{ color: "blue", margin: "5px" }}>see all profile</div>
          </div>
          <div className="buttons">
            <SettingsIcon />
            Settings & Privacy
          </div>
          <div className="buttons">
            <HelpIcon />
            Help & support
          </div>
          <div
            className="buttons"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            <Brightness3Icon style={{ rotate: "150deg" }} />
            Display & accessibility
          </div>
          <div className="buttons">
            <FeedbackIcon />
            Give feedback
          </div>
          <div className="buttons" onClick={handleLogOut}>
            <ExitToAppIcon />
            Log out
          </div>
          <p>
            Privacy . Term . Advertising . Ad choice . Cookies . More . Meta
            &#169; 2023
          </p>
        </section>
      )}
    </section>
  );
};
