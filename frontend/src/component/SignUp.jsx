import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../api/auth";
import { AuthContext } from "../App";
import {Button, TextField, Stack} from "@mui/material"

export const SignUp = () => {
  const { setFlash } = useContext(AuthContext);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const confirmSuccessUrl = "https://subsc-manager-api.herokuapp.com/";

  const generateParams = () => {
    const signUpParams = {
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      confirmSuccessUrl: confirmSuccessUrl,
    };
    return signUpParams;
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();
    try {
      const res = await signUp(params);
      console.log(res);
      
      setFlash("確認メールが送信されました。");
    } catch (e) {
      setFlash("登録に失敗しました。")
      console.log("signupError", e);
    }
  };

  return (
    <div className="container sign-form">
      <Stack
        alignItems="center"
      >
        <h3>新規登録</h3>

        <form>
          {/* !! error-message出す */}
          <TextField
            required
            autoFocus
            label="メールアドレス"
            fullWidth
            size="small"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            required
            label="パスワード"
            fullWidth
            size="small"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            required
            label="パスワード確認"
            fullWidth
            size="small"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSignUpSubmit(e)
              }
            }}
          />

          <input
            type="hidden"
            id="confirm_success_url"
            name="confirm_success_url"
            value={confirmSuccessUrl}
          />

          <Button 
            fullWidth
            variant="contained" 
            type="submit" 
            onClick={(e) => handleSignUpSubmit(e)}
          >
            アカウント登録
          </Button>
        </form>
      </Stack>

      <Link to="/signin">ログインページへ</Link>
    </div>
  );
};