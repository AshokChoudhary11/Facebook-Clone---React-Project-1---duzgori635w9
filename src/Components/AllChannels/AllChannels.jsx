// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import SingleChannel from "../SingleChannel/SingleChannel";
// import style from "../AllChannels/AllChannels.module.css";
import LoadingComponent from "../../Loading";
import Page404 from "../404Page";
const AllChannels = ({ newPages = [] }) => {
  const [postDetail, setPostDetails] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [wasLastList, setWasLastList] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log(postDetail)

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
      setLoading(true);
      setError(false);
      try {
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
          setLoading(false);
          setError(true);
          console.log(parseData.message || "post not fetch");
          return;
        }
        if (parseData.data.length == 0) {
          setLoading(false);
          setWasLastList(true);
          return;
        }
        let newPosts = [...postDetail, ...parseData.data];
        newPages.forEach((item) => {
          newPosts.filter((newPostFromApi) => newPostFromApi._id !== item._id);
        });
        setPostDetails(newPosts);
        setPrevPage(currPage);
        setLoading(false);
      } catch {
        setLoading(false);
        setError(true);
      }
    };
    if (currPage !== prevPage && !wasLastList) {
      handelPost();
    }
  }, [currPage, wasLastList, prevPage]);

  if (error) {
    return <Page404 />;
  }
  return (
    <>
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
        {postDetail && postDetail.map((post) => <SingleChannel item={post} />)}
      </div>
      {loading && <LoadingComponent />}
    </>
  );
};

export default AllChannels;
