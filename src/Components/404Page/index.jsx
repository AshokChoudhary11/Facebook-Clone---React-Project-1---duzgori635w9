import style from "./index.module.css";
import Image404 from "../../assets/404.svg";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
const Page404 = ({ onRetry }) => {
  const navigate = useNavigate();
  return (
    <div className={style.page404Container}>
      <img src={Image404} alt="iamge not found" />
      <div className={style.page404Heading}>Page no Found</div>
      {typeof onRetry == "function" && (
        <div className={style.buttons}>
          <button className={style.page404Button} onClick={onRetry}>
            Retry
          </button>
          <button className={style.page404Button} onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      )}
      {typeof onRetry != "function" && (
        <button className={style.page404Button} onClick={() => navigate("/")}>
          Back
        </button>
      )}
    </div>
  );
};

export default Page404;
