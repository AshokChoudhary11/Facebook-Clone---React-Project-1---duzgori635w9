// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import LoginPage from "./Components/LoginPage";
import SingUp from "./Components/SingUp";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { AuthNavigator } from "./Navigator/AuthNavigator";
import { AuthProvider } from "./Provider/AuthProvider";
import CreateNewPage from "./Components/pages/CreateNewPage";
import AllChannels from "./Components/AllChannels/AllChannels";
import SingleChannelPage from "./Components/SingleChannelPage/SingleChannelPage";
import StoreChannel from "./Components/StoreChannel/StoreChannel";
import SinglePostPage from "./Components/SinglePostPage/SinglePostPage";
import UserProfilePage from "./Components/UserProfilePage";
import DataNotAvailable from "./Components/DataNotAvailable/DataNotAvailable";
import Usersdetails from "./Components/usersDetails";

export const ThemeContext = createContext();
function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthNavigator>
                <Home />
              </AuthNavigator>
            }
          />
          <Route
            path="/home"
            element={
              <AuthNavigator>
                <Home />
              </AuthNavigator>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/pages" element={<CreateNewPage />} />
          <Route path="/all-pages" element={<AllChannels />} />
          <Route path="/store" element={<StoreChannel />} />
          <Route path="/post/:postID" element={<SinglePostPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/all-pages/:channelID" element={<SingleChannelPage />} />
          <Route path="/UsersDetails/:userId" element={<Usersdetails />} />
          <Route path="*" element={<DataNotAvailable />} />
        </Routes>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}

export default App;
