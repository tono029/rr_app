import client from "./client";
import Cookies from "js-cookie";
// import { Redirect } from "react-router-dom";

// サインアップ
export const signUp = (params) => {
  return client.post("/auth", params);
};

// サインイン
export const signIn = (params) => {
  return client.post("/auth/sign_in", params);
};

// サインアウト
export const signOut = () => {
  return client.delete("/auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// ログインユーザーの取得
export const getCurrentUser = () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return;

  return client.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

// ユーザー削除
export const deleteUser = () => {
  return client.delete("/auth", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    }
  })
}

// ユーザーと紐づいたデータ削除
export function deleteUserResource() {
  
}

// パスワードの再発行
