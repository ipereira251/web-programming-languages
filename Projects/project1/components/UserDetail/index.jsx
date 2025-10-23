import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

import './styles.css';

/* components/UserDetail component is passed a userId in the props by 
React Router. The view should display the details of the user in a 
pleasing way along with a link to switch the view area to the photos 
of the user using the UserPhotos component. */

function UserDetail({ userId }) {
  return (
    <Typography variant="body1">
      This should be the UserDetail view of the PhotoShare app. Since it is
      invoked from React Router the params from the route will be in the
      property userId. So this should show details of user:
      {' '}
      {userId}
      . You can
      fetch the model for the user from API: /user/:id
    </Typography>
  );
}

UserDetail.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserDetail;
