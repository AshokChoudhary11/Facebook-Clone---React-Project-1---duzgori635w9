import { useContext } from "react";
import { AuthContext } from "./context";

// custom hooks
export const useAuth = () => {
  return useContext(AuthContext);
};
