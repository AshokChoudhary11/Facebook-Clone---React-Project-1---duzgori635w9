import React, { useEffect, useState } from "react";
import style from "./SingleChannel.module.css";
import {
  ThumbUpOutlined,
  CommentOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Link, json } from "react-router-dom";

const SingleChannel = ({ item }) => {
  const userDetail = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const [like, setLike] = useState(item?.likeCount || 0);

  return (
    <Link to={`/all-pages/${item._id}/`}>
      <section className={style.pageContainer}>
        <div className={style.coverImage}>
          <img src={item.image} alt="pageProfile" />
        </div>
        <div className={style.pageContant}>
          <div className={style.PageProfile}>
            <img src={item.image} alt="pageProfile" />
          </div>
          <div>
            <div className={style.PageName}>{item.name}</div>
            <div className={style.PageDescription}>{item.description}</div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default SingleChannel;
