import { LOCALSTORAGE_TOKEN_KEY } from "../utils/index";

// custom fetch function
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  const headers = {
    "content-type": "application/json",
    Accept: "application/json",
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
    config.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (response.success) {
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

const getPosts = (page, limit) => {
  return customFetch();
};
