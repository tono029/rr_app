import { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../api/auth";
import { GeneralControl } from "../App";
import {TextField, Stack} from "@mui/material"
import { LoadingButton } from "@mui/lab";

export const SignUp = () => {
  const { setFlash } = useContext(GeneralControl);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const confirmSuccessUrl = "https://subsc-manager-11559.web.app/";

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
    setIsLoading(true)
    e.preventDefault();
    const params = generateParams();
    try {
      const res = await signUp(params);
      console.log(res);
      
      setFlash("確認メールが送信されました。");
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setFlash("登録に失敗しました。")
      console.log("signupError", e);
    }
  };

  const passwordInput = useRef(null)
  const passConInput = useRef(null)

  function handleEnter(value, e) {
    e.key === "Enter" && value.current.focus()
  }

  return (
    <div className="container sign-form">
      <Stack
        alignItems="center"
      >
        <h3>新規登録</h3>

        <form>
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
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => handleEnter(passwordInput, e)}
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
            inputRef={passwordInput}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => handleEnter(passConInput, e)}
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
            inputRef={passConInput}
            onChange={e => setPasswordConfirmation(e.target.value)}
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

          <LoadingButton
            loading={isLoading}
            fullWidth
            variant="contained"
            onClick={(e) => handleSignUpSubmit(e)}
          >
            アカウント登録
          </LoadingButton>
        </form>
      </Stack>

      <div className="sign-form-footer">
        <Link to="/signin">ログインページへ</Link>
      </div>
    </div>
  );
};