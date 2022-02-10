import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import style from "./styles.module.css";
import { Link } from "react-router-dom";

function LoginPage() {
  const [userEmail, setuserEmail] = useState("");
  const [userEmailError, setuserEmailError] = useState(false);

  const [userPass, setUserPass] = useState("");
  const [userPassError, setUserPassError] = useState(false);

  const [loadingBtn, setLoadingBtn] = useState("contained");

  const handelSubmit = (e) => {
    e.preventDefault();

    setuserEmailError(false);
    setUserPassError(false);

    if (userEmail === "") {
      setuserEmailError(true);
    }
    if (userPass.length < 8) {
      setUserPassError(true);
    }

    if (userEmail && !(userPass.length < 8)) {
      setLoadingBtn("disabled");
      const email = userEmail;
      const password = userPass;
      fetch("http://localhost:8000/post/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(userEmail, userPass);
          console.log(result.token);
          // window.location.href = 'http://localhost:3000'
          setLoadingBtn("contained");
        })
        .catch(() => setLoadingBtn("contained"));
    }
  };

  return (
    <>
      <Typography variant="h2" marginTop={5} align="center" color="secondary">
        Login Page
      </Typography>
      <div className={style.fromSize}>
        <form noValidate autoComplete="off" onSubmit={handelSubmit}>
          <div className={style.inputSection}>
            <TextField
              onChange={(e) => setuserEmail(e.target.value)}
              className={style.inputSection}
              label="User Email"
              type="email"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={userEmailError}
            />
          </div>
          <div className={style.inputSection}>
            <TextField
              onChange={(e) => setUserPass(e.target.value)}
              label="password"
              type="password"
              variant="outlined"
              color="secondary"
              fullWidth
              required
              error={userPassError}
            />
          </div>
          <div className={style.buttonSection}>
            <Button
              className={style.buttonSection}
              type="submit"
              variant={loadingBtn}
              color="secondary"
            >
              Login
            </Button>
          </div>
        </form>
      </div>

      <div className={style.bottomSection}>
        if not register yet{" "}
        <Link to="/register" className={style.Link}>
          Register
        </Link>{" "}
        here
      </div>
    </>
  );
}

export default LoginPage;
