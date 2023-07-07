import { json } from "react-router-dom";

export * from "./constant";

export const storeItemInLocaStorage = (key, value) => {
  if (!key || !value) {
    return console.error("Cannot store in LS");
  }

  let valueToStore = typeof value !== "string" ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error("Cannot get value from LS");
  }

  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error("cannot remove from LS");
  }
  return localStorage.removeItem(key);
};

export const getFormBody = (params) => {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aman 123 => aman%20%20123
    formBody.push(encodedKey + "=" + encodedValue);
  }
  return formBody.join("&"); // username=akash&password=aman123
};
