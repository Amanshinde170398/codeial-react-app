import { useState, useContext, useEffect } from "react";
import { AuthContext, PostContext } from "../providers";
import { getFriendShips, editProfile, login as userLogin } from "../api";
import {
  storeItemInLocaStorage,
  removeItemFromLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
} from "../utils";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { getPosts } from "../api";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateUserOnRefresh = async () => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      const user = jwt_decode(userToken);
      let friendships = [];
      let resp = await getFriendShips();
      if (resp.success) {
        friendships = resp.data.friends;
      } else {
        friendships = [];
      }
      setUser({ ...user, friendships });
    }
    setLoading(false);
  };

  useEffect(() => {
    updateUserOnRefresh();
  }, []);

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      storeItemInLocaStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : ""
      );
      let friendships = [];
      const resp = await getFriendShips();
      if (resp.success) {
        friendships = resp.data.friends;
      } else {
        friendships = [];
      }
      setUser({ ...response.data.user, friendships });
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

  const updateUserFriendShip = (friend, friendship) => {
    if (friend) {
      setUser({ ...user, friendships: [...user.friendships, friendship] });
    } else {
      // remove friendship
      let friendships = user.friendships.filter(
        (f) => f.to_user._id != friendship.to_user._id
      );
      console.log(friendships);
      setUser({ ...user, friendships });
    }
  };

  return {
    user,
    login,
    logout,
    loading,
    updateUser,
    updateUserFriendShip,
  };
};

export const usePost = () => {
  return useContext(PostContext);
};

export const useProvidePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    let resp = await getPosts();
    if (resp.success) {
      setPosts(resp.data.posts);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const addPostToState = () => {};

  return {
    data: posts,
    loading,
    addPostToState,
  };
};
