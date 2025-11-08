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

  //handle name click
  const handleProfileClick = (userId) => {
    navigate(`/users/${userId}`);
  }
  
  return (
    <Card className="photo-card">
      <CardMedia className="photo-card-photo"
      component="img" image={fileName} />

      <CardContent> 
        <Typography variant="body2" className="date-time">
          Posted {formattedDate}.
        </Typography>

        <List>
          {(comments ? (
            comments.map(comment => (
              <ListItem key={comment._id}>
                <Button variant="text" className="user-name-button"
                  onClick={() => handleProfileClick(comment.user._id)}>
                  {comment.user.first_name} {comment.user.last_name}  {/* Not populated */}
                </Button>
                <Typography variant="p" noWrap={true} className="date-time date-time-comment">
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
        comment: PropTypes.string.isRequired,
        date_time: PropTypes.string.isRequired,
        user_id: PropTypes.string.isRequired
      })
    ),
  }).isRequired
}

export default PhotoCard;