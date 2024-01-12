// @ts-nocheck
import React, { useEffect } from "react";
import style from "./Navbar.module.css";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FlagIcon from "@mui/icons-material/Flag";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import ForumIcon from "@mui/icons-material/Forum";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Profile } from "./Profile";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const userDetail = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };
  const toStore = () => {
    navigate("/store");
  };
  const toPage = () => {
    navigate("/pages");
  };
  const tofeatureUpdateSoon = () => {
    navigate("/page-not-found");
  };
  return (
    <nav className={style.navbar}>
      <div className={style.navbar_logo}>
        <Link to={"/"}>
          <img
            className={style.facebookLogoname}
            src="https://logos-world.net/wp-content/uploads/2020/05/Facebook-Logo-2019.png"
          />
          <img
            className={style.logoicon}
            src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png"
            alt="facebook_Logo"
          />
        </Link>
        <div className={style.search_and_profile}>
          <div className={style.navbar_search}>
            <input type="text" placeholder="Search" onClick={tofeatureUpdateSoon}/>
          </div>
          <div className={style.navSearchIcon}>
            <SearchIcon />
          </div>
          <div className={style.navbar_mobile_profile}>
            {" "}
            <Profile />
          </div>
        </div>
      </div>

      <div className={style.navbar_icons}>
        <NavLink to="/">
          <button onClick={toHome}>
            <HomeRoundedIcon />
          </button>
        </NavLink>
        <NavLink to="/pages">
          <button onClick={toPage}>
            <FlagIcon />
          </button>
        </NavLink>
        <NavLink to="/video">
          <button>
            <OndemandVideoIcon />
          </button>
        </NavLink>
        <NavLink to="/store">
          <button onClick={toStore}>
            <StorefrontIcon />
          </button>
        </NavLink>
        <NavLink to="/friends">
          <button>
            <PeopleIcon />
          </button>
        </NavLink>
      </div>
      <div className={style.navbar_buttons}>
        <NavLink to="/home">
          <button>
            <AddIcon />
          </button>
        </NavLink>
        <NavLink to="/forum">
          <button>
            <ForumIcon />
          </button>
        </NavLink>
        <NavLink to="/notifications">
          <button>
            <NotificationsActiveIcon />
          </button>
        </NavLink>

        <Profile />
      </div>
    </nav>
  );
}

export default Navbar;
