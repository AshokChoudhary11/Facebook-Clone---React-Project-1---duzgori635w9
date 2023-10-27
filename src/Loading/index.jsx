import Lottie from "lottie-react";
import style from "./index.module.css";
import { LoadingData } from "./Loading.js";
import React from "react";
const Loading = () => {
  return (
    <div className={style.LottieLoading}>
      <Lottie animationData={LoadingData} loop />
    </div>
  );
};

export default Loading;
