import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { TierList } from './tierListSlice';
import { useEditTierListMutation } from '../api/apiSlice';

interface TierListProps {
    tierList: TierList
};

export function ConfigureTierListForm(props: TierListProps) {

    const [name, updateName] = useState(props.tierList.name);
    const [patchTierList] = useEditTierListMutation();

    const onSubmit = async () => {
        try {
            await patchTierList({ tierListId: props.tierList.tierListId, name: name }).unwrap()
        } catch (error) {
            console.error('Failed to patch tier list', error)
        }
        return '';
    }
    return (
        <div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Tier List Name"
                    variant="outlined"
                    value={name}
                    onChange={e => updateName(e.target.value)}
                    autoComplete="off"
                />
                <Button variant="contained" onClick={onSubmit}>Save Name</Button>
            </div>
        </div>
    );
}