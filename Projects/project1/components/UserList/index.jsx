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
      const response = await axios.get('/user/list');
      if (response.data) {
        setUsers(response.data);
        console.log(response.data);
        console.log("Fetched users.");
      } else {
        console.error("No users found.");
      }
    } catch (err) {
      console.error("Error fetching users: ", err);
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
