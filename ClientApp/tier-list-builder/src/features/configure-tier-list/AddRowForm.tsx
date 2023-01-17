import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { TierListRow } from '../tier-list/tierListSlice';

interface AddRowFormProps {
    tierListId: number;
    rows: TierListRow[];
    onChange: (x: TierListRow[]) => void
}

export function AddRowForm(props: AddRowFormProps) {

    const [name, setName] = useState('');

    const onSubmit = () => {

        const duplicateRow = props.rows.find(r => r.name === name);
        if (duplicateRow !== undefined) {
            // TODO consider displaying error to user
            console.error('Cannot add duplicate row name:', duplicateRow.name);
            return;
        }

        let nextIndex = 0;
        if (props.rows.length > 0) {
            nextIndex = Math.max(...props.rows.map(x => x.index)) + 1
        }
        const newRow: TierListRow = {
            tierListRowId: 0,
            name: name,
            index: nextIndex,
            tierListId: props.tierListId
        };

        const newRows = [...props.rows, newRow];
        props.onChange(newRows);
    }

    return (
        <Box>
            <TextField
                id="row-name-input"
                label="Row Name"
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="off"
            />
            <Button id="add-row-button" variant="text" onClick={onSubmit}>Add Row</Button>
        </Box>
    );

}