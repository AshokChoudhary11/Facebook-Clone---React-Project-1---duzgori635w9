// @ts-nocheck
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import style from "./UserProfilePage.module.css";
import AllUploadPost from "./AllUploadPost/AllUploadPost";
import InfoContainer from "./UserProfileComponents/InfoContainer/InfoContainer";

const UserProfilePage = () => {
  const userDetails = localStorage.getItem("userDetails");
  const parseUserDetails = JSON.parse(userDetails);
  const [user, setUser] = useState();
  const handleFetchUserDetails = async () => {
    if (parseUserDetails.data) {
      fetch(
        `https://academics.newtonschool.co/api/v1/facebook/user/${parseUserDetails.data.user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "9fc41adjs85k",
          },
        }
      )
        .then((data) => data.json())
        .then((data) => setUser(data.data));
    }
  };

  useEffect(() => {
    handleFetchUserDetails();
  }, []);

  if (!user) {
    return null;
  }
  return (
    <section className={style.ProfileSection}>
      <Navbar />
      <section className={style.coverPage}>
        <div className={style.coverImg}>
          <img
            src="https://scontent.fblr22-1.fna.fbcdn.net/v/t1.6435-9/193568038_618569472433760_6264659855323861090_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=CkwNUOWYB1IAX9iEnSC&_nc_ht=scontent.fblr22-1.fna&oh=00_AfDwJmNFB_sQ_7CXWBP3rPO57zk5Mmlhf7izpmsCVZsf_A&oe=6524A4CC"
            alt="Profile Image"
          />
        </div>
        <div className={style.profileWrapper}>
          <div className={style.profile}>
            <div className={style.profileImageWrapper}>
              <img
                src="https://scontent.fblr22-1.fna.fbcdn.net/v/t1.6435-9/193568038_618569472433760_6264659855323861090_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=CkwNUOWYB1IAX9iEnSC&_nc_ht=scontent.fblr22-1.fna&oh=00_AfDwJmNFB_sQ_7CXWBP3rPO57zk5Mmlhf7izpmsCVZsf_A&oe=6524A4CC"
                alt="Profile Image"
              />
            </div>
            <div className={style.profileContainer}>
              <div className={style.profileUsername}>{user.name}</div>
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
        <InfoContainer user={user} />
        <div className={style.ContentContainer}>
          <div className={style.PreviousPost}>
            <AllUploadPost />
          </div>
        </div>
      </section>
    </section>
  );
};

export default UserProfilePage;
