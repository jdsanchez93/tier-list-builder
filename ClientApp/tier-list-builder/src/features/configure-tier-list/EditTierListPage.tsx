import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTierListByIdQuery } from '../api/apiSlice';
import { DraggableTierListRows } from './DraggableTierListRows';
import { AddRowForm } from './AddRowForm';
import { ConfigureTierListForm } from './ConfigureTierListForm';
import { SaveTierList } from './SaveTierList';
import { TierList, TierListRow } from '../tier-list/TierList.models';

export function EditTierListPage() {

    const { tierListId } = useParams();
    const { data: tierList, isSuccess, isLoading } = useGetTierListByIdQuery(tierListId);

    const [tierListState, setTierListState] = useState<TierList>(tierList || { tierListId: 0, name: '', tierListRows: [] });

    const handleNameChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =
        (e: React.ChangeEvent<HTMLInputElement>) => setTierListState(t => ({ ...t, name: e.target.value }))

    const handleRowsChange =
        (r: TierListRow[]) => setTierListState(t => ({ ...t, tierListRows: r }));

    useEffect(() => {
        if (tierList !== undefined) {
            setTierListState(tierList);
        }
    }, [tierList])

    const tierListForm = useMemo(() => <ConfigureTierListForm onChange={handleNameChange} tierListName={tierListState.name} />, [tierListState.name]);
    const draggableRows = useMemo(() => <DraggableTierListRows onChange={handleRowsChange} rows={tierListState.tierListRows || []} />, [tierListState.tierListRows]);
    const addRowForm = useMemo(() => <AddRowForm onChange={handleRowsChange} tierListId={tierListState.tierListId} rows={tierListState.tierListRows || []} />, [tierListState.tierListRows, tierListState.tierListId]);

    let content;

    // TODO consider handling other states
    if (isLoading) {
        content = <CircularProgress />
    } else if (isSuccess) {

        content = (
            <Box>
                {tierListForm}
                {draggableRows}
                {addRowForm}
                <SaveTierList tierList={tierListState} />
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