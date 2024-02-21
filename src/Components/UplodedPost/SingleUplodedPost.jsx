// @ts-nocheck
import React, { useEffect, useState } from "react";
import style from "./SingleUplodedPost.module.css";
import { Link, useNavigate } from "react-router-dom";
import { timePassedFromTimestamp } from "../../utils/time";
import { useAuth } from "../../Provider/hooks";
import ShareIcon from "../../assets/share.svg";
import CommentIcon from "../../assets/comment.svg";
import LikeIcon from "../../assets/like.svg";
import LikedIcon from "../../assets/liked.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleUplodedPost = ({ item }) => {
  const userDetail = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const [like, setLike] = useState(item?.likeCount || 0);
  const [comment, setComment] = useState(item?.likeCount || 0);
  const [selfLike, setSelfLike] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();
  const getUserDetails = async () => {
    const responce = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/user/${item.author}`,
      {
        method: "GET",
        headers: {
          projectId: "duzgori635w9",
          Authorization: `Bearer ${userDetail.token}`,
        },
      }
    );
    const parseData = await responce.json();
    if (responce.status >= 400) {
      console.log(parseData.message || "post not fetch");
      return;
    }
    setUserDetails(parseData.data);
    console.log("parseData.data", parseData.data);
  };
  console.log("item", item);
  const handleLike = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/like/${item?._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userDetail.token}`,
            projectId: "9fc41adjs85k",
          },
        }
      );

      if (response.status >= 400) {
        const parseData = await response.json();
        console.error(parseData.message || "Like failed");

        if (parseData.message === "You already liked this post") {
          setLike((prevLike) => prevLike + 1);
          setSelfLike(true);
          return;
        }
      } else {
        setLike((prevLike) => prevLike + 1);
        setSelfLike(true);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const fetchPostDetail = async () => {
    const responce = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/post/${item?._id}`,
      {
        headers: {
          Authorization: `Bearer ${userDetail.token}`,
          projectId: "9fc41adjs85k",
        },
      }
    );
    const parseData = await responce.json();
    setLike(parseData.data.likeCount);
    setComment(parseData.data.commentCount);
  };
  const handleRemoveLike = async () => {
    const responce = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/like/${item?._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDetail.token}`,
          projectId: "9fc41adjs85k",
        },
      }
    );
    const parseData = await responce.json();
    if (responce.status >= 400) {
      console.log(parseData.message || "like Failed");
      return;
    }
    setLike(like - 1);
    setSelfLike(false);
  };
  const handleComment = () => {
    navigate(`/post/${item._id}/`);
  };
  const featureUpdateSoon = () => {
    toast.error("feature update soon", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  useEffect(() => {
    getUserDetails();
    fetchPostDetail();
  }, []);

  return (
    <div className={style.SinglePost_container}>
      <>
        <div className={style.profile}>
          <span>
            <img
              src={
                userDetails?.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              alt="pofile"
            ></img>
          </span>
          <span>
            <div>{userDetails?.name}</div>
            <div className={style.CreatedTime}>
              {timePassedFromTimestamp(item.createdAt)}
            </div>
          </span>
        </div>
        <Link to={`/post/${item?._id}/`}>
          <p>{item.content}</p>
          {/* {item?.images?.length} */}
          {item.images?.length > 0 ? (
            <img
              src={item.images[0]}
              alt="image2"
              className={style.PostImage}
            />
          ) : null}
        </Link>
      </>

      <div className={style.LikeCommentShareCount}></div>
      <div className={style.LikeCommentShare}>
        <button
          className={style.postBottomButton}
          onClick={selfLike ? handleRemoveLike : handleLike}
          style={{ color: selfLike ? "blue" : "black" }}
        >
          {selfLike ? (
            <img src={LikedIcon} alt="like" />
          ) : (
            <img src={LikeIcon} alt="like" />
          )}
          <span>Like</span> {like}
        </button>
        {/* <Link to={`/post/${item?.data?._id}/`}> */}
        <button onClick={handleComment} className={style.postBottomButton}>
          <img src={CommentIcon} alt="comment" />
          <span>Comments</span> {comment}
        </button>
        {/* </Link> */}
        <button className={style.postBottomButton} onClick={featureUpdateSoon}>
          <img src={ShareIcon} alt="Share" />
          <span>Share</span>
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SingleUplodedPost;
