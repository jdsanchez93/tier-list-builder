import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { TierListRow } from '../tier-list/TierList.models';
import { AddRowForm } from './AddRowForm';

interface ConfigureRowDialogProps {
    onClose: any;
    open: boolean;
    onChange: (x: TierListRow[]) => void;
    rows: TierListRow[];
    tierListId: number;
}

export default function ConfigureRowDialog(props: ConfigureRowDialogProps) {

    const { onClose, open, onChange, rows, tierListId } = props;

    const onAdd = (x: TierListRow[]) => {
        onChange(x);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Configure Row</DialogTitle>
            <DialogContent>
                <AddRowForm onChange={onAdd} rows={rows} tierListId={tierListId} />
            </DialogContent>
        </Dialog>
    )
}