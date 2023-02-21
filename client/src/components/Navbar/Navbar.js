import React, { useState, useEffect } from "react";

import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memoriesLogo from "./../../images/memoriesLogo.png";
import memoriesText from "./../../images/memoriesText.png";
import useStyles from "./styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from 'jwt-decode';


const Navbar = () => {
  const classes = useStyles();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const check = (token) => {

    for(var i = 0; i < token.length; i++) {
        if(token.charAt(i) < '0' || token.charAt(i) > '9') return true;
    }
  
    return false;
  
  }

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push('/');

    setUser(null);
  }

  useEffect(() => {
    let token = user?.token;

    if(!token) token = "23";

    const isCustomAuth = check(token);

    // console.log(user.result);

    if(token && isCustomAuth) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
      
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="memories"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
            <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture} >{user.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
        ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
