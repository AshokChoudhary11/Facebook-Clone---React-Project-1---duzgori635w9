import React, { useEffect, useState } from "react";
import style from "./SingleChannel.module.css";

import { Link } from "react-router-dom";

const SingleChannel = ({ item }) => {
  console.log("item",item)

  return (
    <Link to={`/all-pages/${item._id}/`}>
      <section className={style.pageContainer}>
        <div className={style.coverImage}>
          <img src={item?.image} alt="pageProfile" />
          
        </div>
        <div className={style.pageContant}>
          <div className={style.PageProfile}>
            <img src={item?.image} alt="pageProfile" />
          </div>
          <div>
            <div className={style.PageName}>{item?.name}</div>
            <div className={style.PageDescription}>{item?.description}</div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default SingleChannel;
