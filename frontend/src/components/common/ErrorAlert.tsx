import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ErrorAlertProps {
  message: string;
  title?: string;
  onClose?: () => void;
}

const ErrorAlert = ({
  message,
  title = 'Error',
  onClose,
}: ErrorAlertProps) => {
  return (
    <Alert severity="error" onClose={onClose} sx={{ mb: 2 }}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorAlert;
