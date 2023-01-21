import React, { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { DraggableTierListRows } from './DraggableTierListRows';
import { AddRowForm } from './AddRowForm';
import { ConfigureTierListForm } from './ConfigureTierListForm';
import { SaveTierList } from './SaveTierList';
import { TierList, TierListRow } from '../tier-list/TierList.models';

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
            />
        ),
        [tierListState.tierListRows]
    );

    return (
        <Box
            sx={{ margin: '10px' }}
        >
            {configName}
            {draggableRows}
            {/* TODO perhaps pass a callback so this doesn't unnecessarily re-render */}
            <SaveTierList tierList={tierListState} />
        </Box>
    );
}