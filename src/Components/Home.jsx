// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import style from "./Home.module.css";
import FlagIcon from "@mui/icons-material/Flag";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PeopleIcon from "@mui/icons-material/People";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import Navbar from "./Navbar";
import AllPost from "./AllPost/AllPost";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Provider/hooks";
import IconSet1 from "../assets/iconSet1.png";
import IconSet2 from "../assets/iconSet2.png";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const pages = () => {
    navigate("/pages");
  };
  const toDataNotFound = () => {
    navigate("/page-not-found");
  };
  const toMarketPlace = () => {
    navigate("/store");
  };
  return (
    <>
      <header>
        <Navbar />
      </header>
      <hr></hr>
      <main className={style.content}>
        <aside className={style.sidebar}>
          <Link to="/user-profile">
            <div className={style.sidebar_header}>
              <span>
                <img
                  src={
                    user.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  }
                  alt="pofile"
                />
              </span>
              <span>{user?.name}</span>
            </div>
          </Link>
          <Link to={"/page-not-found"}>
            <button>
              <div
                className={style.CovidIcon}
                style={{ backgroundImage: `url(${IconSet2})` }}
              />
              <span>COVID-19 Information Center</span>
            </button>
          </Link>
          <button onClick={pages}>
            <div
              className={style.PagesIcon}
              style={{ backgroundImage: `url(${IconSet2})` }}
            />
            <span>Pages</span>
          </button>
          <button onClick={toDataNotFound}>
            <div
              className={style.FriendsIcon}
              style={{ backgroundImage: `url(${IconSet2})` }}
            />
            <span>Friends</span>
          </button>
          <button onClick={toDataNotFound}>
            <div
              className={style.MessengerIcon}
              style={{ backgroundImage: `url(${IconSet1})` }}
            />
            <span>Messanger</span>
          </button>
          <button onClick={toMarketPlace}>
            <div
              className={style.MarketIcon}
              style={{ backgroundImage: `url(${IconSet2})` }}
            />
            <span>Marketplace</span>
          </button>
          <button onClick={toDataNotFound}>
            <div
              className={style.VideoIcon}
              style={{ backgroundImage: `url(${IconSet2})` }}
            />
            <span>Videos</span>
          </button>
        </aside>
        <main className={style.main_content}>
          <AllPost />
        </main>
        <aside className={style.advertise}>
          <img src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/67/08/1a/67081aea-e8de-60d0-9d45-13b6d1dccadc/436e9e8e-2dfc-47b5-adaa-2638bb96b3c9_Poster_Maker_-_Screenshot_6.5_-_2.jpg/300x0w.jpg" />
          {/* <aside className={style.advertise}>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCleverProgrammerr%2F&tabs=timeline&width=300&height=1500&small_header=false&adapt_container_width=true&hide_cover=false&showfacepile=true&appId"
              width="340"
              height="100%"
              style={{ border: "none", overflow: "hidden" }}
              allow="encrypted-media"
              title="ad"
            ></iframe>
                    
          </aside> */}
        </aside>
      </main>
    </>
  );
}

export default Home;
