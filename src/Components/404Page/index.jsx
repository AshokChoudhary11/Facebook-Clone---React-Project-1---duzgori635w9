import style from "./index.module.css";
import Image404 from "../../assets/404.svg";
import React from "react";
const Page404 = ({ onRetry }) => {
  return (
    <div className={style.page404Container}>
      <img src={Image404} alt="iamge not found" />
      <div className={style.page404Heading}>Page no Found</div>
      {typeof onRetry == "function" && (
        <button className={style.page404Button} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default Page404;
