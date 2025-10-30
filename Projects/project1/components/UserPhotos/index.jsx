import { React, useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Typography, ImageListItem, Card, CardContent, Button, Divider } from '@mui/material';

import './styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchUserInfo();
    fetchUserPhotos();
  }, [userId]);


  const fetchUserInfo = async () => {
    try {
     const response = await axios.get(`http://localhost:3001/user/${userId}`);
      if(response.data){
        console.log(response.data);
        setUser(response.data);
      }
    } catch (err){
      console.error("Error fetching user info: ", err);
    }
  };

  const fetchUserPhotos = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/photosOfUser/${userId}`);
      if(response.data){
        console.log(response.data);
        setPhotos(response.data);
      }
    } catch (err) {
      console.error("Error fetching photos: ", err);
    }
  }

  const handleButtonClick = (userId) => {
    console.log("Clicked on user", userId);
    navigate(`/users/${userId}`);
  }

  const formatDate = (date) => {
    /*2009-09-13 20:00:00 */
    const dateAndTime = date.split(" ");
    const dateInfo = dateAndTime[0].split("-");
    const timeInfo = dateAndTime[1].split(":");

    let ret = "";
    console.log("Month", dateInfo[1]);
    switch(dateInfo[1]){
      case "01": ret += "January"; break;
      case "02": ret += "February"; break;
      case "03": ret += "March"; break;
      case "04": ret += "April"; break;
      case "05": ret += "May"; break;
      case "06": ret += "June"; break;
      case "07": ret += "July"; break;
      case "08": ret += "August"; break;
      case "09": ret += "September"; break;
      case "10": ret += "October"; break;
      case "11": ret += "November"; break;
      case "12": ret += "December"; break;
    }
    ret += ` ${dateInfo[2]}, ${dateInfo[0]}`; //TODO: take zero off of single-digit nums
    if(timeInfo[0] > 0 && timeInfo[0] < 13){
      ret += ` at ${timeInfo[0]}:${timeInfo[1]} am`;
    }
    else if(timeInfo[0] > 12){
      ret += ` at ${timeInfo[0] - 12}:${timeInfo[1]} pm`;
    } else if(timeInfo[0] == 0){
      ret += ` at 12:${timeInfo[1]} am`;
    }
    return ret;
  }

  return (
    <div className="image-container">
      {photos.map((photo, index) => (
        <>
        <div key={photo._id}>
            <CardContent>
              <div className="image-section">
                <img 
                  src={`../images/${photo.file_name}`}
                  alt={photo.file_name}
                /> 
                <Typography variant="body2" className="date-time">
                  Posted {formatDate(photo.date_time)}.
                </Typography>
              </div>
              <div className="comment-section">
                <Typography variant="h5">Comments</Typography>
                {photo.comments ? (
                  photo.comments.map(comment => (
                    <div key={comment._id} className="comment-indiv"> 
                      <Button variant="text" className="user-name-button"
                        onClick={() => handleButtonClick(comment.user._id)}>
                        {comment.user.first_name} {comment.user.last_name}
                      </Button>
                      <Typography variant="p" noWrap={true} className="date-time date-time-comment">
                        {formatDate(comment.date_time)}
                      </Typography>
                      <Typography variant="body1">{comment.comment}</Typography>
                    </div>
                  ))
                ) : (
                  <Typography variant="body2" className="no-comment-text">No comments found.</Typography>
                )}
              </div>
            </CardContent>
        </div>
        {index < photos.length - 1 && <Divider />}
        </>
      ))}
    </div>   
  );
}

UserPhotos.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPhotos;
