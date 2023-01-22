import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { DraggableTierListRows } from './DraggableTierListRows';
import { ConfigureTierListForm } from './ConfigureTierListForm';
import { SaveTierList } from './SaveTierList';
import { TierList, TierListRow } from '../tier-list/TierList.models';
import { useEditTierListMutation, usePostTierListMutation } from '../api/apiSlice';

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

    const [patchTierList] = useEditTierListMutation();
    const [createTierList] = usePostTierListMutation();

    const onSave = async () => {
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
            sx={{ margin: '10px' }}
        >
            {configName}
            {draggableRows}
            <SaveTierList onSave={onSave} />
        </Box>
    );
}