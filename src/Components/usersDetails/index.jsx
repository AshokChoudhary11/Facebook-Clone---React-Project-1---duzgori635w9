// @ts-nocheck
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import style from "../UserProfilePage.module.css";
import PerticulerUserPost from "../perticulerUserPost/index";
import { useParams } from "react-router-dom";
import InfoContainer from "../UserProfileComponents/InfoContainer/InfoContainer";

const Usersdetails = () => {
  const { userId } = useParams();
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const [user, setUser] = useState();

  async function getUserDetails() {
    const responce = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/user/${userId}`,
      {
        method: "GET",
        headers: {
          projectId: "duzgori635w9",
          Authorization: `Bearer ${parseUserDetails.token}`,
        },
      }
    );
    const parseData = await responce.json();
    if (responce.status >= 400) {
      console.log(parseData.message || "post not fetch");
      return;
    }
    setUser(parseData.data);
    console.log("parseData.data", parseData.data);
  }

  useEffect(() => {
    getUserDetails();
  }, [userId]);
  return (
    <section className={style.ProfileSection}>
      <Navbar />
      <section className={style.coverPage}>
        <div className={style.coverImg}>
          <img
            src="https://fontawesome.com/social/male?f=classic&s=&v=5"
            alt="Profile Image"
          />
        </div>
        <div className={style.profileWrapper}>
          <div className={style.profile}>
            <div className={style.profileImageWrapper}>
              <img
                src={
                  user?.profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                }
                alt="Profile Image"
              />

              {/* <input
                type="file"
                ref={choseProfileImageRef}
                className={style.choose_Profile_input}
                onChange={(e) => {
                  setFileInput(e.target.files ?? []);
                  setProfileImage(URL.createObjectURL(e.target.files[0]));
                }}
                accept="image/*"
              /> */}
            </div>
            <div className={style.profileContainer}>
              <div className={style.profileUsername}>{user?.name}</div>
              <div className={style.profileFollowerCount}>Followers 6.2k</div>
            </div>
            <hr></hr>
          </div>
          <div className={style.buttonBar}>
            <button>Posts</button>
            <button>About</button>
            <button>Mentions</button>
            <button>Reels</button>
            <button>Photos</button>
            <button>videos</button>
            {/* <select name="" id="">
              More
            </select> */}
          </div>
        </div>
      </section>
      <section className={style.ContentWrapper}>
        {user && <InfoContainer user={user} />}
        <div className={style.ContentContainer}>
          <div className={style.PreviousPost}>
            <PerticulerUserPost userId={userId} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Usersdetails;
