import React from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';
import { useGetTierListByIdQuery } from '../api/apiSlice';
import { ConfigureTierList } from './ConfigureTierList';

export default function EditTierList() {

    const { tierListId } = useParams();
    const { data: tierList, isSuccess, isLoading } = useGetTierListByIdQuery(tierListId);

    let content;

    // TODO consider handling other states
    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {
        content = (
            <ConfigureTierList tierList={tierList} />
        );
    }

    return (
        <div>
            <Typography variant="h5">
                Edit Tier List
            </Typography>

            {content}

        </div>
    )
}