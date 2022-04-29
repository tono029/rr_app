import React from "react";
import { Button } from "@mui/material";
import { deleteUser } from "../api/auth";

export default function UserSetting(props) {
  function handleUserDelete() {
    return deleteUser()
  }

  return (
    <div className="container">
      <div className="setting-item">
        <p>メールアドレス: </p>
        <p>{props.currentUser.uid}</p>
      </div>
      
      <Button
        onClick={handleUserDelete}
      >
        ユーザー登録の削除
      </Button>
    </div>  
  )
}