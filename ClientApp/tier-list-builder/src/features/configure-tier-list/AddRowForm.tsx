import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { TierListRow } from '../tier-list/TierList.models';
import AddIcon from '@mui/icons-material/Add';

interface AddRowFormProps {
    tierListId: number;
    rows: TierListRow[];
    onChange: (x: TierListRow[]) => void
}

export function AddRowForm(props: AddRowFormProps) {

    const [name, setName] = useState('');

    const onSubmit = () => {

        if (name === '') {
            // TODO consider displaying error to user
            console.error('Cannot have blank name');
            return;
        }

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
        <Box sx={{ margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '10px' }}>
            <TextField
                id="row-name-input"
                label="Row Name"
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="off"
            />

            <Button
                id="add-row-button"
                variant="outlined"
                onClick={onSubmit}
                startIcon={<AddIcon />}>
                Add Row
            </Button>
        </Box>
    );

}