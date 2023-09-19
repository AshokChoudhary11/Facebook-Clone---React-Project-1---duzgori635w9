// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import SingleChannel from "../SingleChannel/SingleChannel";
// import style from "../AllChannels/AllChannels.module.css";

const AllChannels = ({ newPages = [] }) => {
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
        `https://academics.newtonschool.co/api/v1/facebook/channel/?limit=10&page=${prevPage}`,
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
      let newPosts = [...postDetail, ...parseData.data];
      newPages.forEach((item) => {
        newPosts.filter((newPostFromApi) => newPostFromApi._id !== item._id);
      });
      setPostDetails(newPosts);
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
      style={{
        display: "flex",
        flexWrap: "wrap",
        rowGap: "20px",
        columnGap: "0px",
        height: "99%",
        overflow: "scroll",
        overscrollBehavior: "contain",
        justifyContent: "center",
      }}
    >
      {/* {newPages.map((page) => (
        <SingleChannel item={page} />
      ))} */}
      {postDetail && postDetail.map((post) => <SingleChannel item={post} />)}
    </div>
  );
};

export default AllChannels;
