import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

/*
    The left side of the TopBar should have your name.

    The right side of the TopBar should provide app context by 
    reflecting what is being shown in the main content region. 
    For example, if the main content is displaying details on 
    a user, the TopBar should have the user's name. If it is 
    displaying a user's photos it should say "Photos of " and 
    the user's name.
*/


import './styles.css';

function TopBar() {
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          This is the TopBar component
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
