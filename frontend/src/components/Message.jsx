import React from 'react';
import Alert from '@mui/material/Alert';

const Message = ({ variant, children }) => {
  const convertVariant = (variantInfo) => {
    switch (variantInfo) {
      case 'danger':
        return 'error';
      case 'info':
        return 'info';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  return <Alert severity={convertVariant(variant)}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
