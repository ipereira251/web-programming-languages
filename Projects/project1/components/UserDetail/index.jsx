import { React, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Typography, Button } from '@mui/material';

import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/* components/UserDetail component is passed a userId in the props by 
React Router. The view should display the details of the user in a 
pleasing way ---Details done
along with a link to switch the view area to the photos 
of the user using the UserPhotos component. ----DONE
*/

function UserDetail({ userId }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, [userId]); //NOT!!!! user

  const handleViewImgClick = () => {
    console.log("Clicked to view images from userId", userId);
    navigate(`/photos/${userId}`);
  }

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`/user/${userId}`);
      if(response.data){
        console.log(response.data);
        setUser(response.data);
      }
    } catch (err){
      console.error("Error fetching user info: ", err);
    }
  };

  if(!user){
    return <p>No such user found.</p>;
  }

  return (
    <>
    <div> {/*TODO, add everything and style */}
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="h6" className="user-occ-loc">
        {user.occupation} from {user.location}.
      </Typography>
      <Typography variant="body1" className="user-desc">
        {user.description}
      </Typography>
    </div>
    <Button variant="contained" onClick={() => handleViewImgClick()}>View {user.first_name}'s images</Button>
    </>
    
  );
}

UserDetail.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserDetail;
