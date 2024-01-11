import React, { useEffect, useState } from "react";
import style from "./SingleChannel.module.css";

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
