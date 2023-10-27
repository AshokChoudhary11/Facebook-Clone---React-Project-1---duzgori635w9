// @ts-nocheck
import React, { useState } from "react";
import Navbar from "../Navbar";
import style from "./createNewPage.module.css";
import AllChannels from "../AllChannels/AllChannels";
import Spinner from "../Spinner";
const CreateNewPage = () => {
  const [pageName, setPageName] = useState("");
  const [category, setCatagory] = useState("");
  const [bio, setBio] = useState("");
  const [newPages, setNewPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(false);
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
        setError(data?.message || "Something went wrong");
        setLoading(false);
        console.log(data.message);
        return;
      } else {
        setLoading(false);
        setNewPages([data, ...newPages]);
        setPageName("");
        setBio("");
        setCatagory("");
      }
    } catch {
      setLoading(false);
      setError("Network Failure");
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
            value={pageName}
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
            value={category}
            onChange={(e) => setCatagory(e.target.value)}
            placeholder="Catetory(required)"
            required
          />
          <p>Enter a category that best describes you.</p>
          <textarea
            value={bio}
            className={style.bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio (optional)"
          />
          <p>Tell people a little about what you do.</p>
          {error && <div className={style.errorComponent}>{error}</div>}
          <button className={style.submitButton} onClick={handleSubmit}>
            Create Page {loading && <Spinner />}
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
