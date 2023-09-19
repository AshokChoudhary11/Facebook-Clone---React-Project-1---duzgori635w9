import React, { useState } from "react";
import style from "./SingleUplodedPost.module.css";
import {
  ThumbUpOutlined,
  CommentOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const SingleUplodedPost = ({ item }) => {
  const userDetail = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const [like, setLike] = useState(item?.likeCount || 0);
  const [selfLike, setSelfLike] = useState(false);

  const handleLike = async () => {
    const responce = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/like/${item?._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDetail.token}`,
          projectId: "9fc41adjs85k",
        },
      }
    );
    const parseData = await responce.json();
    if (responce.status >= 400) {
      console.log(parseData.message || "like Failed");
      if (parseData.message === "You already liked this post") {
        setLike(like + 1);
        setSelfLike(true);
      }
      return;
    }
    setLike(like + 1);
    setSelfLike(true);
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

  return (
    <div className={style.SinglePost_container}>
      <>
        <div className={style.profile}>
          <span>
            <img src={item.author.profileImage} alt="pofile"></img>
          </span>
          <span>{item.author.name}</span>
        </div>

        <p>{item.content}</p>
        {item.images?.length && (
          <img src={item.images[0]} alt="image" className={style.PostImage} />
        )}
      </>

      <div className={style.LikeCommentShareCount}></div>
      <div className={style.LikeCommentShare}>
        <button
          onClick={selfLike ? handleRemoveLike : handleLike}
          style={{ color: selfLike ? "blue" : "black" }}
        >
          <ThumbUpOutlined />
          <span>Like</span> {like}
        </button>
        <button>
          <CommentOutlined />
          <span>Comments</span>
        </button>
        <button>
          <ShareOutlined />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default SingleUplodedPost;
