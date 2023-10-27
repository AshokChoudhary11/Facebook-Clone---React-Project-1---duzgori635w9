// @ts-nocheck
import React, { useRef, useState } from "react";
import style from "./NewPost.module.css";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import TimesIcon from "../assets/times.svg";
import { useAuth } from "../Provider/hooks";
function NewPost() {
  const { user } = useAuth();
  const [postHeading, setPostHeading] = useState("");
  const [fileInput, setFileInput] = useState([]);
  const chooseImageInputRef = useRef();
  const [newPostImage, setNewPostImage] = useState();
  const uploadPost = async () => {
    var myHeaders = new Headers();
    myHeaders.append("projectId", "9fc41adjs85k");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    var formdata = new FormData();
    formdata.append("title", postHeading);
    formdata.append("content", postHeading);
    formdata.append("images", fileInput[0], "abc-abc.jpg");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/facebook/post/",
      requestOptions
    );
    const result = await response.json();
    if (response.status >= 400) {
      console.log(result.message || "post not fetch");
      return;
    } else {
      setFileInput("");
      setPostHeading("");
      setNewPostImage("");
    }
  };
  return (
    <>
      <div className={style.postSection}>
        <div className={style.postSection_Profile}>
          <span>
            <img src={user.profileImage} alt="pofile" />
          </span>
          <textarea
            rows={postHeading?.split("\n").length || 1}
            className={style.postInput1}
            id="post"
            name="post"
            placeholder={`What's on your mind ${user?.name}? `}
            value={postHeading}
            onChange={(e) => {
              setPostHeading(e.target.value);
            }}
          />
          <button
            className={style.PostButton}
            type="button"
            onClick={uploadPost}
          >
            Submit
          </button>
        </div>

        {newPostImage && (
          <div className={style.uploadImageContainer}>
            <div
              className={style.crossOnImg}
              onClick={() => {
                setFileInput([]);
                setNewPostImage("");
              }}
            >
              <img src={TimesIcon} alt="close" />
            </div>
            <img src={newPostImage} className={`${style.uploadImg}`} />
          </div>
        )}
        <hr></hr>
        <div className={style.AddActivity}>
          <div className={style.AddActivity_button}>
            <button disabled>
              <VideocamOutlinedIcon style={{ color: "red" }} />
              <span>Live Video</span>
            </button>
          </div>
          <div
            className={`${style.AddActivity_button} ${
              !!fileInput?.length && style.AddActivity_button_disabled
            }`}
            onClick={() => {
              if (chooseImageInputRef.current && !fileInput?.length) {
                chooseImageInputRef.current.click();
              }
            }}
          >
            <button
            // disabled={!!fileInput?.length}
            >
              <PhotoLibraryOutlinedIcon style={{ color: "green" }} />
              <span>Photo/Video</span>
            </button>
          </div>
          <input
            type="file"
            ref={chooseImageInputRef}
            className={style.choose_file_input}
            onChange={(e) => {
              setFileInput(e.target.files ?? []);

              setNewPostImage(URL.createObjectURL(e.target.files[0]));
            }}
            accept="image/*"
          />

          <div className={style.AddActivity_button}>
            <button disabled>
              <SentimentSatisfiedOutlinedIcon style={{ color: "yellow" }} />
              <span>Feeling/Activity</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPost;
