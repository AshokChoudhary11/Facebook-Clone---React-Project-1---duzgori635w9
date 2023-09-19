import React, { useContext, useEffect, useRef, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ThemeContext } from "../App";
import { useNavigate } from "react-router-dom";
import style from "./Profile.module.css";
export const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const ProfileIconRef = useRef(null);
  const navigate = useNavigate();

  const userDetail = JSON.parse(localStorage.getItem("userDetails") || "{}");

  const handleLogOut = () => {
    localStorage.removeItem("userDetails");
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
          src="https://scontent.fblr22-1.fna.fbcdn.net/v/t1.6435-9/193568038_618569472433760_6264659855323861090_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=CkwNUOWYB1IAX9iEnSC&_nc_ht=scontent.fblr22-1.fna&oh=00_AfDwJmNFB_sQ_7CXWBP3rPO57zk5Mmlhf7izpmsCVZsf_A&oe=6524A4CC"
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
                src="https://scontent.fblr22-1.fna.fbcdn.net/v/t1.6435-9/193568038_618569472433760_6264659855323861090_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=CkwNUOWYB1IAX9iEnSC&_nc_ht=scontent.fblr22-1.fna&oh=00_AfDwJmNFB_sQ_7CXWBP3rPO57zk5Mmlhf7izpmsCVZsf_A&oe=6524A4CC"
                alt="Profile Image"
              />
              <span>{userDetail?.data?.user?.name}</span>
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
