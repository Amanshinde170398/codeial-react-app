import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { editProfile, login as userLogin } from "../api";
import {
  storeItemInLocaStorage,
  removeItemFromLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
} from "../utils";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      const user = jwt_decode(userToken);
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      setUser(response.data.user);
      storeItemInLocaStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : ""
      );
      return { success: true };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    toast.success("Logged out!", {
      duration: 1000,
      position: "top-center",
    });
  };

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);
    if (response.success) {
      setUser(response.data.user);
      storeItemInLocaStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : ""
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  return {
    user,
    login,
    logout,
    loading,
    updateUser,
  };
};
