import React, { useState } from 'react';

import {
    DragDropContext,
    Droppable,
    Draggable,
    DraggingStyle,
    NotDraggingStyle,
} from '@hello-pangea/dnd';

import type {
    DropResult,
    DraggableProvided,
    DraggableStateSnapshot,
    DroppableProvided,
    DroppableStateSnapshot,
} from '@hello-pangea/dnd';
import { TierListRow } from '../tier-list/TierList.models';
import { Box, Button, Card, CardActions, CardContent, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfigureRowDialog from './ConfigureRowDialog';

// a little function to help us with reordering the result
function reorder<TItem>(
    list: TItem[],
    startIndex: number,
    endIndex: number,
): TItem[] {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((x, index) => ({ ...x, index: index }));
}

const grid = 8;

const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none' as const,
    // padding: grid * 2,
    // margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    // background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
    // background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    overflow: 'auto',
});


interface DraggableTierListProps {
    rows: TierListRow[];
    onChange: (r: TierListRow[]) => void;
    tierListId: number;
}
export function DraggableTierListRows(props: DraggableTierListProps) {

    const [dialogOpen, setDialogOpen] = useState(false);

    const addRowClicked = () => {
        setDialogOpen(true);
    }

    const handleDialogClosed = () => {
        setDialogOpen(false);
    }

    const sortedRows = ([...(props.rows)]).sort((a, b) => a.index - b.index)

    const deleteRow = (index: number) => {
        props.onChange(sortedRows.filter((_, i) => i !== index));
    }

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.index === destination.index)
            return;

        const items = reorder(
            sortedRows,
            source.index,
            destination.index,
        );

        props.onChange(items);
    }

    return (

        <Card sx={{ width: 'fit-content', margin: '10px' }}>

            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    Tier List Rows
                </Typography>

                <DragDropContext
                    onDragEnd={onDragEnd}
                >
                    <Droppable
                        droppableId="droppable"
                    >
                        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {sortedRows.map((item, index) => (
                                    // can't use tierListRowId as key because multiple ids can be zero when staging rows
                                    <Draggable
                                        key={item.tierListRowId + item.name}
                                        draggableId={String(item.tierListRowId) + item.name}
                                        index={index}
                                    >
                                        {(
                                            draggableProvided: DraggableProvided,
                                            draggableSnapshot: DraggableStateSnapshot,
                                        ) => (
                                            <Box
                                                sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                                                ref={draggableProvided.innerRef}
                                                {...draggableProvided.draggableProps}
                                                style={getItemStyle(
                                                    draggableSnapshot.isDragging,
                                                    draggableProvided.draggableProps.style,
                                                )}
                                            >
                                                <Paper
                                                    square
                                                    elevation={3}
                                                    sx={{
                                                        width: '100px',
                                                        height: '100px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        margin: '2px'
                                                    }}
                                                    {...draggableProvided.dragHandleProps}
                                                >
                                                    {item.name}
                                                </Paper>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => deleteRow(index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </CardContent>

            <CardActions>
                <Button
                    id="add-row-button"
                    size="small"
                    onClick={addRowClicked}
                >
                    Add Row
                </Button>
            </CardActions>
            <ConfigureRowDialog open={dialogOpen} onClose={handleDialogClosed} onChange={props.onChange} rows={props.rows} tierListId={props.tierListId} />
        </Card>
    );

}