import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTierListByIdQuery } from '../api/apiSlice';
import { ConfigureTierListForm } from './ConfigureTierListForm';

export function EditTierListPage() {

    const { tierListId } = useParams();
    const { data: tierList, isSuccess, isLoading } = useGetTierListByIdQuery(tierListId)

    let content;

    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {
        content = (
            <Box>
                <ConfigureTierListForm tierList={tierList} />
            </Box>
        );
    }

    return (
        <div>
            <Typography variant="h6">
                Configure Tier List
            </Typography>

            <br />

            {content}
            
        </div>
    )
}