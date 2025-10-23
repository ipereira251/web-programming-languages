import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import './styles.css';


/* components/UserList component should provide navigation to the user 
details of all the users in the system. The component is embedded in 
the side bar and should provide a list of user names so that when a name 
is clicked, the content view area switches to display the details of that user.  */

function UserList() {
  return (
    <div>
      <Typography variant="body1">
        This is the user list, which takes up 3/12 of the window. You might
        choose to use
        {' '}
        <a href="https://mui.com/components/lists/" rel="noreferrer" target="_blank">Lists</a>
        {' '}
        and
        {' '}
        <a href="https://mui.com/components/dividers/" rel="noreferrer" target="_blank">Dividers</a>
        {' '}
        to
        display your users like so:
      </Typography>
      <List component="nav">
        <ListItem>
          <ListItemText primary="Item #1" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Item #2" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Item #3" />
        </ListItem>
        <Divider />
      </List>
      <Typography variant="body1">
        The model comes in from API: /user/list
      </Typography>
    </div>
  );
}

export default UserList;
