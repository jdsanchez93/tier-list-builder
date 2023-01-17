import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTierListByIdQuery } from '../api/apiSlice';
import { DraggableTierListRows } from './DraggableTierListRows';
import { AddRowForm } from './AddRowForm';
import { ConfigureTierListForm } from './ConfigureTierListForm';
import { SaveTierList } from './SaveTierList';

export function EditTierListPage() {

    const { tierListId } = useParams();
    const { data: tierList, isSuccess, isLoading } = useGetTierListByIdQuery(tierListId);

    const [tierListName, setTierListName] = useState(tierList === undefined ? '' : tierList.name);

    const handleNameChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =
        (e: React.ChangeEvent<HTMLInputElement>) => setTierListName(e.target.value);

    useEffect(() => {
        if (tierList !== undefined) {
            setTierListName(tierList.name);
        }
    }, [tierList])


    let content;

    // TODO consider handling other states
    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {

        content = (
            <Box>
                <ConfigureTierListForm onChange={handleNameChange} tierListName={tierListName} />
                <DraggableTierListRows tierList={tierList} />
                <AddRowForm tierListId={tierList.tierListId} />
                <SaveTierList tierList={tierList} />
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