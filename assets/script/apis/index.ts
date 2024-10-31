import { BE_URL } from "../constants";

const HEADER = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
  Authorization: localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : undefined,
};

export const loginByBot = async (data: any) => {
  const res = await fetch(BE_URL + "/api/auth/login-through-bot", {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      telegramData: data,
    }),
  });
  return await res.json();
};

export const getAllItems = async () => {
  const res = await fetch(BE_URL + "/api/account/get-all-items", {
    method: "GET",
    headers: HEADER,
  });
  return await res.json();
};

export const getMyItem = async () => {
  const res = await fetch(BE_URL + "/api/account/get-item", {
    method: "GET",
    headers: HEADER,
  });
  return await res.json();
};

export const buyItem = async (itemId: string) => {
  const res = await fetch(BE_URL + "/api/account/buy-item-by-star/" + itemId, {
    method: "GET",
    headers: HEADER,
  });
  return await res.json();
};
