import { useContext } from "react";
import { Button } from "@mui/material"
import {signOut} from "../api/auth"
import { Link, useHistory } from "react-router-dom";
import { AuthContext, GeneralControl } from "../App";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function Header(props: {user: string}) {
  const {isSignedIn, setIsSignedIn} = useContext(AuthContext)
  const {setSubs, setUser, setMainSlide, setFlash} = useContext(GeneralControl)
  const history = useHistory()

  function greeting() {
    const now = new Date().getHours()
    if (now >= 6 && now < 12) {
      return "おはようございます"
    } else if (now >= 12 && now < 18) {
      return "こんにちは"
    } else {
      return "こんばんは"
    }
  }

  function toSetting() {
    history.push("/main")
    setMainSlide({dire: "left", in: false})
  }

  function handleSignOut() {
    const is_ok = window.confirm("ログアウトしてよろしいですか。") 
      
    if (is_ok) {
      setFlash("ログアウトしました。")
      setIsSignedIn(false)
      setSubs([])
      setUser("")
      signOut()
      history.push("/")
    }
  }

  const handleLogoClick = () => {
    history.push("/")
    setMainSlide({dire: "right", in: true, appear: false})
  }

  return (
    <header>
      <div className="header-left">
        <h2 onClick={handleLogoClick}>
          SubscManager
        </h2>
      </div>

      <div className="header-right">
        <div className="nav-items">
          {isSignedIn ?
            <>
              <div className="greeting">
                <p>{greeting()}, {props.user}さん</p>
              </div>

              <Button
                onClick={() => history.push("/main")}
                size="small"
              >
                管理
              </Button>

              <Button
                onClick={handleSignOut}
                size="small"
              >
                ログアウト
              </Button>

              <ManageAccountsIcon
                fontSize="large"
                onClick={toSetting}
              >
              </ManageAccountsIcon>
            </> 

          :

            <>
              <Button
                size="small"
                component={Link}
                to="/signin"
              >
                ログイン
              </Button>
              
              <Button
                size="small"
                component={Link}
                to="/signup"
              >
                新規登録
              </Button>
            </>
          }
          
        </div>
      </div>
    </header>
  )
}