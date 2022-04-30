import React from "react";
import { useHistory } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { deleteUser } from "../api/auth";

export default function UserSetting(props) {
  const history = useHistory()

  return (
    <div className="container">
      <div className="setting-header">
        <h2>ユーザー設定</h2>
        <IconButton onClick={() => history.push('/')}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </div>

      <div className="setting-item">
        <p>メールアドレス: </p>
        <p>{props.currentUser.uid}</p>
      </div>
      
      {/* <Button
        onClick={handleUserDelete}
      >
        ユーザー登録の削除
      </Button> */}
    </div>  
  )
}