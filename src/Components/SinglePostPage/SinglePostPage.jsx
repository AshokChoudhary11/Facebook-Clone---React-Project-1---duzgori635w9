// @ts-nocheck
import React, { useEffect, useState } from "react";
import style from "./SinglePostPage.module.css";
import {
  ThumbUpOutlined,
  CommentOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { useNavigate, useParams } from "react-router-dom";
import { timePassedFromTimestamp } from "../../utils/time";
const SinglePostPage = () => {
  const params = useParams();
  const postID = params.postID;
  const [postData, setPostData] = useState();
  const userDetail = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const [like, setLike] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentscount, setCommentsCount] = useState(0);
  const [typeComment, setTypeComment] = useState();
  const fetchPostDetail = async () => {
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
      console.log(parseData.message || "like Failed");
      return;
    }
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
      console.log(parseData.message || "like Failed");
      return;
    }
    setLike(like + 1);
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

  if (!postData) {
    return "Loading";
  }

  return (
    <>
      <div className={style.singlePost_container}>
        <div className={style.singlePostImage}>
          <div className={style.header}>
            <div className={style.headerLeft}>
              <button className={style.crossButton} onClick={handleCross}>
                X
              </button>
              <img
                src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png"
                alt="facebook Logo"
              />
            </div>
            <div>
              <ZoomInIcon />
              <ZoomOutIcon />
              <ZoomOutMapIcon />
            </div>
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
            <div>
              <ThumbUpOutlined />
              {like}
            </div>
            <div>
              <CommentOutlined />
              {commentscount}
            </div>
          </div>
          <hr></hr>

          <div className={style.LikeCommentShare}>
            <button onClick={handleLike}>
              <ThumbUpOutlined />
              <span>Like</span>
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
          <hr></hr>
          <div className={style.commentSectionContainer}>
            Comments:
            {comments.map((comment) => (
              <div class="flex items-center justify-start  bg-white dark:bg-gray-800">
                <div class="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
                  <img
                    class="rounded-full h-8 w-8 mr-2 mt-1 "
                    src={postData.author.profileImage}
                  />
                  <div>
                    <div class="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
                      <div class="font-semibold text-sm leading-relaxed">
                        {postData.author.name}
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
            <textarea
              value={typeComment}
              onChange={(e) => {
                setTypeComment(e.target.value);
              }}
            />
            <button onClick={handleMessageSend}>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePostPage;
