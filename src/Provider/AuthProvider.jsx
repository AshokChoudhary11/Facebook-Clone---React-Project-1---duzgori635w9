import React, { useEffect, useState } from "react";
import { AuthContext } from "./context";

const getUserFromLocalStorage = () => {
  const userDetails = localStorage.getItem("userDetails");
  if (userDetails) {
    const parseData = JSON.parse(userDetails);
    return parseData;
  } else {
    return {};
  }
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());

  const handleFetchUserDetails = () => {
    const parseUserDetails = getUserFromLocalStorage();
    if (parseUserDetails.data) {
      fetch(
        `https://academics.newtonschool.co/api/v1/facebook/user/${parseUserDetails.data.user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parseUserDetails.token}`,
            projectId: "9fc41adjs85k",
          },
        }
      )
        .then((data) => data.json())
        .then((data) => setUser({ ...parseUserDetails, ...data.data }));
    }
  };

  useEffect(() => {
    handleFetchUserDetails();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
