import { Box, TextField, Button } from '@mui/material';
import React from 'react';
import { TierList } from '../tier-list/tierListSlice';

interface SaveTierListProps {
    tierList: TierList;
}

export const SaveTierList = (props: SaveTierListProps) => {

    const onCancel = () => {
        // TODO
        console.log('cancel');
    }

    const onSubmit = async () => {
        try {

            console.log(props.tierList)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box>
            <Button variant="outlined" onClick={onCancel}>Cancel</Button>
            <Button variant="contained" onClick={onSubmit}>Save</Button>
        </Box>
    )
}