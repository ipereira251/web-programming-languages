import { React, useState, useEffect } from 'react';
import {
  Divider,
  List,
  ListItemButton, /* changed from plain List Item */
  ListItemText,
  Typography,
} from '@mui/material';

import './styles.css';
import axios from 'axios';


/* components/UserList component should provide navigation to the user 
details of all the users in the system. The component is embedded in 
the side bar and should provide a list of user names so that when a name 
is clicked, the content view area switches to display the details of that user.  */

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/user/list');
        if (response.data) {
          setUsers(response.data);
          console.log(response.data);
          console.log("Fetched users.");
        } else {
          setError("No users found.");
          console.error("No users found.");
        }
      } catch (err) {
        setError("Failed to fetch users.");
        console.error("Error fetching users: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleUserClick = (user) => {
    console.log("Clicked on:", user.first_name, user.last_name, user._id);
    setSelectedUser(user);
  }

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
        {users.map(user => (
          <>
            <ListItemButton key={user.id} onClick={() => handleUserClick(user)}>
              <ListItemText primary={user.first_name + " " + user.last_name} />
            </ListItemButton>
            <Divider />
          </>
          
        ))}
        
      </List>
    </div>
  );
}

export default UserList;
