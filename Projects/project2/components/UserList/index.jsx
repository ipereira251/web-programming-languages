import React, { useState, useEffect } from 'react';
import {
  Divider,
  List,
  ListItemButton, /* changed from plain List Item */
  ListItemText,
} from '@mui/material';

import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


/* components/UserList component should provide navigation to the user 
details of all the users in the system. ----DONE
The component is embedded in 
the side bar and should provide a list of user names so that when a name 
is clicked, the content view area switches to display the details of that user. ---DONE
 */

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/list');
      if (response.data) {
        setUsers(response.data);
        console.log("UserList: Response:", response.data); 
        console.log("UserList: Fetched users.");
      } else {
        console.error("UserList: No users found.");
      }
    } catch (err) {
      console.error("UserList: Error fetching users: ", err);
    }
  };

  const handleUserClick = (user) => {
    console.log("Clicked on user", user.first_name, user.last_name, user._id);
    navigate(`/users/${user._id}`);
  }

  return (
    <div>
      <List component="nav">
        {users.map(user => (
          <React.Fragment key={user._id}>
            <ListItemButton onClick={() => handleUserClick(user)}>
              <ListItemText primary={user.first_name + " " + user.last_name} />
            </ListItemButton>
            <Divider/>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
