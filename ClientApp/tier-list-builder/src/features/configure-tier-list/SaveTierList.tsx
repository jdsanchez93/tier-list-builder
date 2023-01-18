import { Box, Button } from '@mui/material';
import React from 'react';
import { useEditTierListMutation } from '../api/apiSlice';
import { TierList } from '../tier-list/tierListSlice';

interface SaveTierListProps {
    tierList: TierList;
}

export const SaveTierList = (props: SaveTierListProps) => {
    const [patchTierList] = useEditTierListMutation();

    const onCancel = () => {
        // TODO
        console.log('cancel');
    }

    const onSubmit = async () => {
        try {
            if (props.tierList.tierListId === 0) {
                // TODO post new tier list
                console.log('create new tier list...')
                return;
            }
            let partialTierList: Partial<TierList> = props.tierList;
            patchTierList(partialTierList);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box>
            <Button variant="outlined" onClick={onCancel}>Cancel</Button>
            <Button variant="contained" onClick={onSubmit}>Save</Button>
        </Box>
    )
}