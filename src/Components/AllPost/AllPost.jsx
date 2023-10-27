// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import SinglePost from "../SinglePost/SinglePost";
import style from "./AllPost.module.css";
import NewPost from "../NewPost";
import AllStory from "../Story/AllStory";
import AllUploadPost from "../AllUploadPost/AllUploadPost";

const AllPost = () => {
  const [postDetail, setPostDetails] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [wasLastList, setWasLastList] = useState(false);
  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setCurrPage(prevPage + 1);
      }
    }
  };

  useEffect(() => {
    const handelPost = async () => {
      const responce = await fetch(
        `https://academics.newtonschool.co/api/v1/facebook/post/?limit=10&page=${prevPage}`,
        {
          method: "GET",
          headers: {
            projectId: "duzgori635w9",
          },
        }
      );
      const parseData = await responce.json();
      if (responce.status >= 400) {
        console.log(parseData.message || "post not fetch");
        return;
      }
      if (parseData.data.length == 0) {
        setWasLastList(true);
        return;
      }
      setPostDetails([...postDetail, ...parseData.data]);
      setPrevPage(currPage);
    };
    if (currPage !== prevPage && !wasLastList) {
      handelPost();
    }
  }, [currPage, wasLastList, prevPage]);

  return (
    <div
      onScroll={onScroll}
      ref={listInnerRef}
      className={style.all_post_container}
    >
      {/* <NewPost /> */}
      <AllUploadPost />
      {postDetail &&
        postDetail.map((post, index) => (
          <SinglePost item={post} index={index} />
        ))}
    </div>
  );
};

export default AllPost;
