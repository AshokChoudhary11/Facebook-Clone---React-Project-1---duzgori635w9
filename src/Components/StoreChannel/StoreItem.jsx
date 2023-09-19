import React, { useEffect, useState } from "react";
import style from "./SingleChannel.module.css";
import {
  ThumbUpOutlined,
  CommentOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Link, json } from "react-router-dom";

const SingleChannel = ({ item }) => {
  return (
    <div className={style.SinglePost_container}>
      <div className={style.profile}>
        <span>{item.name}</span>
      </div>
      <p>{item.description}</p>
    </div>
  );
};

export default SingleChannel;
