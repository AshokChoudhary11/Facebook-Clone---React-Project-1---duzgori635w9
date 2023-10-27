// @ts-nocheck
import React, { useEffect, useState } from "react";
import style from "./SinglePostPage.module.css";
import {
  ThumbUpOutlined,
  CommentOutlined,
  ShareOutlined,
  ThumbUp,
  CommentRounded,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { useNavigate, useParams } from "react-router-dom";
import { timePassedFromTimestamp } from "../../utils/time";
import ShareIcon from "../../assets/share.svg";
import CommentIcon from "../../assets/comment.svg";
import LikeIcon from "../../assets/like.svg";
import LikedIcon from "../../assets/liked.svg";
import LikeCount from "../../assets/likeCount.svg";
import LoadingComponent from "../../Loading";
import Page404 from "../404Page";

const SinglePostPage = () => {
  const params = useParams();
  const postID = params.postID;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState();
  const userDetail = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const [like, setLike] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentscount, setCommentsCount] = useState(0);
  const [typeComment, setTypeComment] = useState();
  const [selfLike, setSelfLike] = useState(false);

  const fetchPostDetail = async () => {
    setLoading(true);
    setError(false);
    const responce = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/post/${postID}`,
      {
        headers: {
          Authorization: `Bearer ${userDetail.token}`,
          projectId: "9fc41adjs85k",
        },
      }
    );
    const parseData = await responce.json();
    if (responce.status >= 400) {
      setLoading(false);
      setError(true);
      console.log(parseData.message || "like Failed");
      return;
    }
    setLoading(false);
    setPostData(parseData.data);
    setLike(parseData.data.likeCount);
  };

  const fetchPostMessages = async () => {
    const responce = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/post/${postID}/comments`,
      {
        headers: {
          Authorization: `Bearer ${userDetail.token}`,
          projectId: "9fc41adjs85k",
        },
      }
    );
    const parseData = await responce.json();
    if (responce.status >= 400) {
      console.log(parseData.message || "comment Failed");
      return;
    }
    console.log(parseData.data);
    setComments(parseData.data);
    setCommentsCount(parseData.results);
  };

  useEffect(() => {
    fetchPostDetail();
    fetchPostMessages();
  }, []);

  const handleLike = async () => {
    const responce = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/like/${postID}`,
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
      if (parseData?.message === "You already liked this post") {
        setSelfLike(true);
      } else {
        console.log(parseData.message || "like Failed");
      }
      return;
    }
    setLike(like + 1);
    setSelfLike(true);
  };
  const handleRemoveLike = async () => {
    const responce = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/like/${postID}`,
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

  const handleMessageSend = async () => {
    const responce = await fetch(
      `https://academics.newtonschool.co/api/v1/facebook/comment/${postID}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDetail.token}`,
          projectId: "9fc41adjs85k",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: typeComment }),
      }
    );
    const parseData = await responce.json();
    if (responce.status >= 400) {
      console.log(parseData.message || "like Failed");
      return;
    }
    fetchPostMessages();
    setTypeComment("");
  };
  const navigate = useNavigate();

  const handleCross = () => {
    navigate("/");
  };

  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    return <Page404 onRetry={fetchPostDetail} />;
  }

  return (
    <>
      <div className={style.singlePost_container}>
        <div className={style.singlePostImage}>
          <div className={style.header}>
            {/* <div className={style.headerLeft}> */}
            <button className={style.crossButton} onClick={handleCross}>
              X
            </button>
            <img
              src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png"
              alt="facebook Logo"
            />
            {/* </div> */}
            {/* <div>
              <ZoomInIcon />
              <ZoomOutIcon />
              <ZoomOutMapIcon />
            </div> */}
          </div>
          <img
            src={postData.channel.image}
            alt="image"
            className={style.PostImage}
          />
        </div>
        <div className={style.containt}>
          <div className={style.profile}>
            <span>
              <img src={postData.author.profileImage} alt="pofile"></img>
            </span>
            <span>{postData.author.name}</span>
          </div>
          <p>{postData.content}</p>
          <div className={style.LikeCommentShareCount}>
            <div className={style.LikeCountContainer}>
              <img src={LikeCount} alt="like" />
              {like}
            </div>
            <div>
              {commentscount}
              &nbsp;
              <CommentRounded style={{ color: "gray", fontSize: "16px" }} />
            </div>
          </div>
          <hr className={style.LikeCountContainerHR}></hr>

          <div className={`${style.LikeCommentShare}`}>
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
              <span>Like</span>
            </button>
            <button className={style.postBottomButton}>
              <img src={CommentIcon} alt="comment" />
              <span>Comments</span>
            </button>
            <button className={style.postBottomButton}>
              <img src={ShareIcon} alt="Share" />
              <span>Share</span>
            </button>
          </div>
          <hr></hr>
          <div className={style.commentSectionContainer}>
            Comments:
            {comments.map((comment) => (
              <div class="flex items-center justify-start  bg-white dark:bg-gray-800">
                <div class="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-1 antialiased flex max-w-lg">
                  <img
                    class="rounded-full h-8 w-8 mr-2 mt-2 "
                    src={postData.author.profileImage}
                  />
                  <div>
                    <div class="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
                      <div class="font-semibold text-sm leading-relaxed">
                        {userDetail?.data?.user?.name}
                      </div>
                      <div class="text-normal leading-snug md:leading-normal">
                        {comment.content}
                      </div>
                    </div>
                    <div class="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">
                      {timePassedFromTimestamp(comment.createdAt)}
                    </div>
                    <div class="bg-white dark:bg-gray-700 border border-white dark:border-gray-700 rounded-full float-right -mt-8 mr-0.5 flex shadow items-center "></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={style.typeComment}>
            <img
              class="rounded-full h-8 w-8 mr-2 mt-2 "
              src={postData.author.profileImage}
            />
            <textarea
              rows={typeComment?.split("\n").length || 1}
              value={typeComment}
              onChange={(e) => {
                setTypeComment(e.target.value);
              }}
              placeholder="Write a comment..."
            />
            <button onClick={handleMessageSend}>
              <SendIcon style={{ fontSize: "16px" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePostPage;
