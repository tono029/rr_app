
import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signIn } from "../api/auth";
import { AuthContext } from "../App";
import {Button, Stack, TextField} from "@mui/material"

export const SignIn = () => {
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const params = generateParams();

    try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 整える
  return (
    <div className="container sign-form">
      <Stack
        alignItems="center"
      >
        <h3>LOG IN</h3>

        <form>
          <TextField
            required
            fullWidth
            label="メールアドレス"
            size="small"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            required
            label="パスワード"
            size="small"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth 
            variant="contained" 
            type="submit" 
            onClick={(e) => handleSignInSubmit(e)}
          >
            log in
          </Button>
        </form>

      </Stack>
      <Link to="/signup">新規登録ページへ</Link>

    </div>
  );
};