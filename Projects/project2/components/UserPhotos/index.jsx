import { React, useState, useEffect } from 'react';
import { Typography, List, ListItem } from '@mui/material';
import PhotoCard from "./PhotoCard";
import PropTypes from 'prop-types';

import './styles.css';
import axios from 'axios';

/* components/UserPhotos component is passed a userId, and should display 
all the photos of the specified user. ----DONE
It must display all of the photos belonging to that user. ---DONE
For each photo you must display the photo itself, ---DONE
the creation date/time for the photo, ---DONE
and all of the comments for that photo. ----DONE
For each comment you must display the date/time ---DONE 
the name of the user who created the comment ----DONE
and the text of the comment. ----DONE 
The creator for each comment should be a link that can 
be clicked to switch to the user detail page for that user. ----DONE
The date/time for photos and comments should be formatted as 
user-friendly strings and not as raw JavaScript dates. -----DONE

*/

function UserPhotos({ userId }) {
  const [photos, setPhotos] = useState([]);
  
  useEffect(() => {
    fetchUserPhotos();
  }, [userId]);

  const fetchUserPhotos = async () => {
    console.log("User photos: checking", userId);
    try {
      const response = await axios.get(`http://localhost:3001/photosOfUser/${userId}`);
      console.log(response);
      if(response.data){
        console.log("UserPhotos:", response.data);
        const photos = response.data;
        setPhotos(photos);
      }
    } catch (err) {
      console.error("UserPhotos: Error fetching photos: ", err);
    }
  }

  return (
    <>
      {/* Arrow */}
      <List>
        {photos ? (
          photos.map((photo) => (
            <ListItem key={photo._id}>
              <PhotoCard photoInfo={photo} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1"> </Typography>
        )}
      </List>
      {/* Arrow */}
    </>

  );
}

UserPhotos.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPhotos;
