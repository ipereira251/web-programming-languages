import { React } from "react";
import { Typography, Card, CardContent, CardMedia, Button, List, ListItem } from "@mui/material";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function PhotoCard({photoInfo}){
  const navigate = useNavigate();
  //const [comments, setComments] = useState(photoInfo.comments); keeping bc commenting is coming for sure
  const comments = photoInfo.comments;
  const fileName = `/images/${photoInfo.file_name}`;
  const date = new Date(photoInfo.date_time);
  const formattedDate = date.toLocaleString();
  const user = photoInfo.original_poster;

  //handle name click
  const handleProfileClick = (userId) => {
    navigate(`/users/${userId}`);
  }
  
  return (
    <Card className="photo-card">
      <CardMedia className="photo-card-photo"
      component="img" image={fileName} />

      <Button variant="text" className="user-name-button poster-user-name-button"
        onClick={() => handleProfileClick(user._id)}>
        {user.first_name} {user.last_name}  
      </Button>

      <CardContent> 
        <Typography variant="body2" noWrap={true} className="date-time">
          Posted {formattedDate}.
        </Typography>

        <List className="comments-container">
          {(comments.length > 0 ? (
            comments.map(comment => (comment && comment.user && comment.comment && 
              <ListItem key={comment._id} className="comment">
                <Button variant="text" className="user-name-button comment-user-name-button"
                  onClick={() => handleProfileClick(comment.user._id)}>
                  {comment.user.first_name} {comment.user.last_name} 
                </Button>
                <Typography variant="p" className="date-time date-time-comment">
                  {new Date(comment.date_time).toLocaleString()}
                </Typography>
                <Typography variant="p">{comment.comment}</Typography>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" className="no-comment-text">No comments found.</Typography>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

PhotoCard.propTypes = {
  photoInfo: PropTypes.shape({
    file_name: PropTypes.string.isRequired,
    date_time: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        comment: PropTypes.string,
        date_time: PropTypes.string,
        user_id: PropTypes.string
      })
    ),
    original_poster: PropTypes.shape({
        _id: PropTypes.string.isRequired, 
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
      }).isRequired
  }).isRequired
}

export default PhotoCard;