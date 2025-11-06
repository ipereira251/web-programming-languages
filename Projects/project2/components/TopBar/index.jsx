import { React, useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

/*
    The left side of the TopBar should have your name. ---DONE

    The right side of the TopBar should provide app context by 
    reflecting what is being shown in the main content region. 
    For example, if the main content is displaying details on 
    a user, the TopBar should have the user's name. If it is 
    displaying a user's photos it should say "Photos of " and 
    the user's name.------------DONE
*/


import './styles.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function TopBar() {
  const [context, setContext] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    getUserFromUrl(location.pathname);
  }, [location]);

  const getUserFromUrl = async (url) => {
    const terms = url.split("/");
    console.log("terms", terms);
    if(terms[1]){
      try {
        const response = await axios.get(`http://localhost:3001/user/${terms[2]}`);
        if(response.data){
          console.log("response data", response.data);
          if(terms[1] === "photos"){
            setContext(`Photos of ${response.data.first_name} ${response.data.last_name}`);
          } else if(terms[1] === "users"){
            setContext(`${response.data.first_name} ${response.data.last_name}`);
          } else {
            setContext("Unknown");
          }
        }
      } catch(err){
        console.error("Error getting user from URL", err);
      }}
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className='topbar-toolbar'>
        <Typography variant="h5" color="inherit" className="topbar-name">
          Isabella Pereira
        </Typography>
        {context && 
          <Typography variant="h5">
            {context}
          </Typography>}
        
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
