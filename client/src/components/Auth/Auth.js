import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

import jwt_decode from 'jwt-decode';

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";
import Input from "./Input";

import { GoogleLogin, googleLogout } from "@react-oauth/google";

import Icon from "./icon";
import { AUTH } from "../../constants/actionTypes";

import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const history = useHistory();

  //   let isSignup = false;

  const handleSubmit = (e) => {
      e.preventDefault();

      // console.log(formData);

      if(isSignup) {
        dispatch(signup(formData, history));
      } else {
        dispatch(signin(formData, history));
      }

  };

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((prevSignup) => !prevSignup);
    setShowPassword(false);
  };

  const googleSuccess = (res) => {
    // console.log(res);

    const decoded = jwt_decode(res?.credential);

    console.log(decoded);

    const result = decoded;
    const token = decoded?.sub;

    try {

      dispatch({ type: AUTH, data : { result, token } });

      history.push('/');

    } catch(error) {
      console.log(error.message);        
    }
    

  };

  const googleFailure = (error) => {
    console.log("Google Sign In was Unsuccessful. Try Again Later !!!");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
            onSuccess={googleSuccess}
            onError={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
