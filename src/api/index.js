import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from "../utils/index";
import { getFormBody } from "../utils/index";

// custom fetch function
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    // Accept: "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = getFormBody(body);
  }
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }
    throw new Error(data.message);
  } catch (err) {
    console.log(err);
    return {
      message: err.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), { method: "GET" });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    body: { email: email, password: password },
    method: "POST",
  });
};

export const signup = (email, name, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: "POST",
    body: {
      name,
      email,
      password,
      confirm_password: confirmPassword,
    },
  });
};

export const editProfile = (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: "POST",
    body: {
      id: userId,
      name,
      password,
      confirm_password: confirmPassword,
    },
  });
};

export const getUserDetails = (userId) => {
  return customFetch(API_URLS.userInfo(userId), { method: "GET" });
};

export const getFriendShips = () => {
  return customFetch(API_URLS.friends(), { method: "GET" });
};

export const createFriendship = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), { method: "POST" });
};

export const removeFriendship = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), { method: "POST" });
};

export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: "POST",
    body: { content },
  });
};

export const addComment = (postId, content) => {
  return customFetch(API_URLS.comment(), {
    method: "POST",
    body: {
      post_id: postId,
      content,
    },
  });
};

export const toggleLike = (likeableId, likeableType) => {
  return customFetch(API_URLS.toggleLike(likeableId, likeableType), {
    method: "POST",
  });
};

export const searchUsers = (searchText) => {
  return customFetch(API_URLS.searchUsers(searchText), { method: "GET" });
};
