import React, {useEffect }from "react";
import { TextField, Typography, Grid, Container, Button } from "@material-ui/core";
import SigninButton from "../Components/signInButton";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../api/mutations";


export interface Login_login_user {
  __typename: "User";
  username: string;
  password: string;
  address: string;
}

export interface Login_login {
  __typename: "LoginPayload";
  student: Login_login_user;
  jwt: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  code: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


export const LoginPage = () => {
  const [login] = useMutation<Login>(LOGIN);
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const loginMethod = async () => {
      const code = query.get("code");
      if (code != null) {
        try {
          const { data } = await login({ variables: { code } });
          if (data != null) {
            localStorage.setItem("token", data.login.jwt)
            console.log(data)
          }
        } catch (e) {
          console.log(e);
        }
        history.push('/home');
      }
    };
    loginMethod();
  }, []);

  return (
    <Container className="form_container">
      <Typography variant="h3">Login Page</Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-basic"
            label="User Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-basic"
            label="Password"
            fullWidth
          />
        </Grid>
        </Grid>
        <Button color="primary">Log In</Button>
        <SigninButton></SigninButton>
      </Container>
  );

  
};
