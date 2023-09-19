import React, { useEffect, useState } from "react";
import style from "./SinglePost.module.css";
import {
  ThumbUpOutlined,
  CommentOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Link, json } from "react-router-dom";

const SinglePost = ({ item }) => {
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
        // setLike(like + 1);
        setSelfLike(true);
      }
      return;
    }
    setSelfLike(true);
    setLike(like + 1);
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
      <Link to={`/post/${item._id}/`}>
        <>
          <div className={style.profile}>
            <span>
              <img src={item.author.profileImage} alt="pofile"></img>
            </span>
            <span>{item.author.name}</span>
          </div>

          <p>{item.content}</p>
          {item.channel?.image && (
            <img
              src={item.channel.image}
              alt="image"
              className={style.PostImage}
            />
          )}
        </>
      </Link>

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
          {item.commentCount}
        </button>
        <button>
          <ShareOutlined />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
