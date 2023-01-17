import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { TierListRow } from '../tier-list/tierListSlice';

interface AddRowFormProps {
    tierListId: number
}

export function AddRowForm(props: AddRowFormProps) {

    const [name, setName] = useState('');

    const onSubmit = () => {
        const row: TierListRow = {
            tierListRowId: 0,
            name: name,
            // TODO figure out index
            index: 0,
            tierListId: props.tierListId
        };
        // TODO 
    }

    return (
        <Box>
            <TextField
                id="outlined-basic"
                label="Row Name"
                variant="outlined"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="off"
            />
            <Button variant="text" onClick={onSubmit}>Add Row</Button>
        </Box>
    );

}