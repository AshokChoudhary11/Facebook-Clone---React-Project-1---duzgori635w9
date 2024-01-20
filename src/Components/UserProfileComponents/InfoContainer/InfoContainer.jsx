// @ts-nocheck
import React, { useState } from "react";
import SchoolIcon from "@mui/icons-material/School";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import FavoriteIcon from "@mui/icons-material/Favorite";
import style from "./InfoContainer.module.css";

export default function InfoContainer({ user }) {
  const [editForm, setEditForm] = useState(false);
  const [SchoolStudied, setSchoolStudied] = useState(user.school_studies);
  const [currentLocation, setCurrentLocation] = useState(user.current_location);
  const [homeTown, setHomeTown] = useState(user.home_town);
  const [joinDate, setJoinDate] = useState(user.join_data);
  const [Hobbies, setHobbies] = useState(user.hobbies);
  const [followers, setFollowers] = useState(user.followers);
  const [relationShipStatus, setRelationShipStatus] = useState(user.followers);

  if (editForm) {
    <div className={style.InfoContainer}>
      <div className={style.heading}>Intro</div>
      <div className={style.bio}>
        <span>Use Bio</span>
      </div>
      <div>
        <SchoolIcon />
        <input
          value={SchoolStudied}
          onChange={(e) => setSchoolStudied(e.target.value)}
          placeholder="school or Collage name"
        >
          Studied at (school or Collage name)
        </input>
      </div>
      <div>
        <HouseIcon />
        <input
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
          placeholder="current Location"
        >
          Lives in (Location)
        </input>
      </div>
      <div>
        <LocationOnIcon />
        <input
          value={homeTown}
          onChange={(e) => setHomeTown(e.target.value)}
          placeholder="Home Town"
        >
          From (HomeTown)
        </input>
      </div>
      <div>
        <FavoriteIcon />
        <input
          value={relationShipStatus}
          onChange={(e) => setRelationShipStatus(e.target.value)}
          placeholder="Home Town"
        >
          RelationShip status
        </input>
      </div>
      <div>
        <RssFeedIcon />
        <span>Followed by 415 People</span>
      </div>

      <input value={Hobbies} onChange={(e) => setHobbies(e.target.value)}>
        Hobbies (sfdfs dsdfs sdfsdf)
      </input>
      <button className={style.EditButton}>Save</button>
    </div>;
  }

  return (
    <div className={style.InfoContainer}>
      <div className={style.heading}>Intro</div>

      <div className={style.userDetails_info_row_container}>
        <SchoolIcon />
        <span>
          Studied at <b>{user?.education?.[0]?.schoolName || "Royal Oak School"}</b>
        </span>
      </div>
      <div className={style.userDetails_info_row_container}>
        <HouseIcon />
        <span>
          Lives in{" "}
          <b>{user?.address[0]?.street
            ? `${user?.address[0]?.street}, ${user?.address[0]?.city}`
            : "India" || "India"}</b>
        </span>
      </div>
      <div className={style.userDetails_info_row_container}>
        <LocationOnIcon />
        <span>From <b>{user?.address[0]?.state || "Japiur"}</b></span>
      </div>

      <div className={style.userDetails_info_row_container}>
        <WatchLaterIcon />
        <span>
          Joined on <b>{new Date(user?.createdAt).getMonth()+1}/{" "}
          {new Date(user?.createdAt).getFullYear()}</b>
        </span>
      </div>
    </div>
  );
}
