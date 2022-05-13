import { useContext, useState } from "react";
import { IconButton, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { deleteUser, deleteUserResource } from "../api/auth";
import { AuthContext, GeneralControl } from "../App";
import { useHistory } from "react-router-dom";

export default function UserSetting(props: {user: string, currentUser: {uid: string} | undefined}) {
  const {setIsSignedIn} = useContext(AuthContext)
  const {setMainSlide, setFlash} = useContext(GeneralControl)
  const [open, setOpen] = useState(false)
  const history = useHistory()

  function handleUserDelete() {
    console.log("delete user")
    setOpen(false)

    // 削除前にユーザーが作成したリソースを削除
    deleteUserResource()

    // ログイン状態を解除
    setIsSignedIn(false)

    // ユーザーを削除
    deleteUser()

    setFlash("削除が完了しました。")
    history.push("/signup")
  }

  return (
    <>
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
          <p>{props.currentUser && props.currentUser.uid}</p>
        </div>
        
        <div className="setting-footer">
          <Button
            onClick={() => setOpen(true)}
          >
            ユーザー登録の削除
          </Button>
        </div>
      </div>

      {/* ユーザー削除のダイアログ */}
      <Dialog
        // fullWidth
        className="user-delete-dialog"
        open={open} 
        onClose={() => setOpen(false)}
      >
        <DialogTitle>ユーザー登録を削除してよろしいですか？</DialogTitle>
        <DialogActions>
          <Button
            onClick={handleUserDelete}
            className="delete-yes"
            variant="contained"
          >
            はい
          </Button>
          <Button onClick={() => setOpen(false)}>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}