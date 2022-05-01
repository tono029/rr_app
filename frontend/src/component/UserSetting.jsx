import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { deleteUser } from "../api/auth";
import { GeneralControl } from "../App";

export default function UserSetting(props) {
  const {setMainSlide} = useContext(GeneralControl)

  return (
    <div className="container setting">
      <div className="setting-header">
        <h3>ユーザー設定</h3>
        <IconButton onClick={() => setMainSlide({dire: "right", in: true})}>
          <ArrowBackRoundedIcon />
        </IconButton>
      </div>

      <div className="setting-item">
        <p>ユーザー名: </p>
        <p>{props.user}</p>
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