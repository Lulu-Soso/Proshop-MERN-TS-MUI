import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Rating = ({ value, text, color }) => {
  return (
    <Box display="flex" alignItems="center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {value >= star ? (
            <FaStar style={{ color }} />
          ) : value >= star - 0.5 ? (
            <FaStarHalfAlt style={{ color }} />
          ) : (
            <FaRegStar style={{ color }} />
          )}
        </span>
      ))}
      {text && (
        <Typography variant="body2" sx={{ ml: 1 }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;
