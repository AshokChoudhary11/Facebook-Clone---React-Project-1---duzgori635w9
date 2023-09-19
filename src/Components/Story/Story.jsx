// @ts-nocheck
import React from "react";
import { Avatar } from "@mui/material";
import style from "./Story.module.css";

const Story = ({ image, profileSrc, title }) => {
  return (
    <div style={{ background: `url(${image})` }} className={style.story}>
      <Avatar className={style.story__avatar} src={profileSrc} />
      <h4>{title} </h4>
    </div>
  );
};

export default Story;
