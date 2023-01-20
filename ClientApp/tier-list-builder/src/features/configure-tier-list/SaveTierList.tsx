import { Box, Button, Fab } from '@mui/material';
import React from 'react';
import { useEditTierListMutation, usePostTierListMutation } from '../api/apiSlice';
import { TierList } from '../tier-list/TierList.models';
import SaveIcon from '@mui/icons-material/Save';

interface SaveTierListProps {
    tierList: TierList;
}

export const SaveTierList = (props: SaveTierListProps) => {
    const [patchTierList] = useEditTierListMutation();
    const [createTierList] = usePostTierListMutation();

    const onSubmit = async () => {
        try {
            if (props.tierList.name === '') {
                console.error('Name cannot be blank');
                return;
            }

            let partialTierList: Partial<TierList> = props.tierList;
            if (props.tierList.tierListId === 0) {
                createTierList(partialTierList);
                return;
            }
            patchTierList(partialTierList);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box
            sx={{
                margin: '10px',
                display: 'flex',
                justifyContent: 'right',
                gap: '20px'
            }}
        >
            <Fab variant="extended" onClick={onSubmit}>
                <SaveIcon sx={{ mr: 1 }} />
                Save
            </Fab>
        </Box>
    )
}