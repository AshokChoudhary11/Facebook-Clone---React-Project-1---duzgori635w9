// @ts-nocheck
import React, { useState } from "react";
import Navbar from "../Navbar";
import style from "./createNewPage.module.css";
import { Form } from "react-router-dom";
import AllChannels from "../AllChannels/AllChannels";

const CreateNewPage = () => {
  const [pageName, setPageName] = useState("");
  const [category, setCatagory] = useState("");
  const [bio, setBio] = useState("");
  const [newPages, setNewPages] = useState([]);

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("name", pageName);
    form.append("description", bio);
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const response = await fetch(
      "https://academics.newtonschool.co/api/v1/facebook/channel/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
          projectId: "9fc41adjs85k",
        },
        body: form,
      }
    );
    const data = await response.json();
    if (response.status >= 400) {
      console.log(data.message);
      return;
    } else {
      setNewPages([data, ...newPages]);
      setPageName("");
      setBio("");
      setCatagory("");
    }
  };
  return (
    <>
      <Navbar />
      <div className={style.pageContent}>
        <section className={style.createPage}>
          <h2 className={style.heading}>Create a Page</h2>
          <div className={style.subHeading}>
            Your Page is where people go to learn more about you. Make sure that
            yours has all of the information they may need.
          </div>
          <input
            type="text"
            onChange={(e) => setPageName(e.target.value)}
            placeholder="Page name (required)"
            required
          />
          <p>
            Use the name of your business, brand or organisation, or a name that
            helps explain your Page.
          </p>
          <input
            type="text"
            onChange={(e) => setCatagory(e.target.value)}
            placeholder="Catetory(required)"
            required
          />
          <p>Enter a category that best describes you.</p>
          <textarea
            className={style.bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio (optional)"
          />
          <p>Tell people a little about what you do.</p>
          <button className={style.submitButton} onClick={handleSubmit}>
            Create Page
          </button>
        </section>
        <section className={style.channelList}>
          <AllChannels />
        </section>
      </div>
    </>
  );
};

export default CreateNewPage;
