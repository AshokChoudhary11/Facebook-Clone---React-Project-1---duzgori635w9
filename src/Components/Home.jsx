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

function Home() {
  const navigate = useNavigate();
  const userDetail = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const listInnerRef = useRef();

  const pages = () => {
    navigate("/pages");
  };
  const toDataNotFound = () => {
    navigate("/page-not-found");
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
                  src="https://scontent.fblr22-1.fna.fbcdn.net/v/t1.6435-9/193568038_618569472433760_6264659855323861090_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=CkwNUOWYB1IAX9iEnSC&_nc_ht=scontent.fblr22-1.fna&oh=00_AfDwJmNFB_sQ_7CXWBP3rPO57zk5Mmlhf7izpmsCVZsf_A&oe=6524A4CC"
                  alt="pofile"
                />
              </span>
              <span>{userDetail?.data?.user?.name}</span>
            </div>
          </Link>
          <Link to={"/page-not-found"}>
            <button>
              <AddBoxOutlinedIcon />
              <span>COVID-19 Information Center</span>
            </button>
          </Link>
          <button onClick={pages}>
            <FlagIcon />
            <span>Pages</span>
          </button>
          <button onClick={toDataNotFound}>
            <PeopleIcon />
            <span>Friends</span>
          </button>
          <button onClick={toDataNotFound}>
            <ChatOutlinedIcon />
            <span>Messanger</span>
          </button>
          <button>
            <StorefrontIcon />
            <span>Marketplace</span>
          </button>
          <button onClick={toDataNotFound}>
            <VideoLibraryOutlinedIcon />
            <span>Videos</span>
          </button>
        </aside>
        <main className={style.main_content}>
          <AllPost />
        </main>
        <aside className={style.advertise}>
          <img src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/67/08/1a/67081aea-e8de-60d0-9d45-13b6d1dccadc/436e9e8e-2dfc-47b5-adaa-2638bb96b3c9_Poster_Maker_-_Screenshot_6.5_-_2.jpg/300x0w.jpg" />
        </aside>
      </main>
    </>
  );
}

export default Home;
