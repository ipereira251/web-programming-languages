import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

import './styles.css';

/* components/UserPhotos component is passed a userId, and should display 
all the photos of the specified user. It must display all of the photos 
belonging to that user. For each photo you must display the photo itself, 
the creation date/time for the photo, and all of the comments for that 
photo. For each comment you must display the date/time when the comment 
was created, the name of the user who created the comment, and the text 
of the comment. The creator for each comment should be a link that can 
be clicked to switch to the user detail page for that user.

Note: The date/time for photos and comments should be formatted as 
user-friendly strings and not as raw JavaScript dates.  */

function UserPhotos({ userId }) {
  return (
    <Typography variant="body1">
      This should be the UserPhotos view of the PhotoShare app. Since it is
      invoked from React Router the params from the route will be in property
      userId. So this should show photos of user:
      {' '}
      {userId}
      . You can fetch the
      model for the user&apos;s photos from API: /photosOfUser/:id
    </Typography>
  );
}

UserPhotos.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserPhotos;
