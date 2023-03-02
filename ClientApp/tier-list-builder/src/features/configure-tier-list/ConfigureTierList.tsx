import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { DraggableTierListRows } from './DraggableTierListRows';
import { ConfigureTierListForm } from './ConfigureTierListForm';
import { SaveTierList } from './SaveTierList';
import { TierList, TierListRow } from '../tier-list/TierList.models';
import { usePostTierListMutation, usePutTierListMutation } from '../api/apiSlice';
import ConfigureTierListItems from '../tier-list-items/ConfigureTierListItems';

interface ConfigureTierListProps {
    tierList: TierList;
}

export function ConfigureTierList(props: ConfigureTierListProps) {

    const [tierListState, setTierListState] = useState<TierList>(props.tierList);

    const handleNameChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =
        (e: React.ChangeEvent<HTMLInputElement>) => setTierListState(t => ({ ...t, name: e.target.value }))

    const handleRowsChange =
        (r: TierListRow[]) => setTierListState(t => ({ ...t, tierListRows: r }));

    const configName = useMemo(
        () => (
            <ConfigureTierListForm
                onChange={handleNameChange}
                tierListName={tierListState.name}
            />
        ),
        [tierListState.name]
    );

    const draggableRows = useMemo(
        () => (
            <DraggableTierListRows
                onChange={handleRowsChange}
                rows={tierListState.tierListRows || []}
                tierListId={tierListState.tierListId}
            />
        ),
        [tierListState.tierListRows, tierListState.tierListId]
    );

    const items = useMemo(
        () => (
            <ConfigureTierListItems tierListId={tierListState.tierListId} />
        ),
        [tierListState.tierListId]
    )

    const [createTierList] = usePostTierListMutation();
    const [putTierList] = usePutTierListMutation();

    const onSave = async () => {
        try {
            if (tierListState.name === '') {
                console.error('Name cannot be blank');
                return;
            }

            let partialTierList: Partial<TierList> = tierListState;
            if (tierListState.tierListId === 0) {
                createTierList(partialTierList);
                return;
            }
            putTierList(tierListState);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box
            sx={{ margin: '10px' }}
        >
            {configName}
            {draggableRows}
            {items}
            <SaveTierList onSave={onSave} />
        </Box>
    );
}