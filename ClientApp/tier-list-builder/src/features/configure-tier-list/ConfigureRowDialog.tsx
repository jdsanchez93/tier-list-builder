import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { AddRowForm } from './AddRowForm';

interface ConfigureRowDialogProps {
    onClose: any;
    open: boolean;
}

export default function ConfigureRowDialog(props: ConfigureRowDialogProps) {

    const { onClose, open } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Configure Row</DialogTitle>
            <DialogContent>
                {/* <AddRowForm /> */}
            </DialogContent>
        </Dialog>
    )
}