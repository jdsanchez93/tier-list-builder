import React from 'react';
import { Alert, AlertColor, Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface SimpleSnackBarProps {
    open: boolean;
    onClose: () => void;
    message: string;
    severity: AlertColor;
}

export default function SimpleSnackBar({ open, onClose, message, severity }: SimpleSnackBarProps) {

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        onClose();
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}