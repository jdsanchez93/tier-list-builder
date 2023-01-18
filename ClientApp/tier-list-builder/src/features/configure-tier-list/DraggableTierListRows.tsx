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
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    overflow: 'auto',
});


interface DraggableTierListProps {
    rows: TierListRow[];
    onChange: (r: TierListRow[]) => void;
}
export function DraggableTierListRows(props: DraggableTierListProps) {

    const sortedRows = ([...(props.rows)]).sort((a, b) => a.index - b.index)

    const onDragEnd = (result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            sortedRows,
            result.source.index,
            result.destination.index,
        );

        props.onChange(items);
    }

    return (
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
                                    <div
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                        style={getItemStyle(
                                            draggableSnapshot.isDragging,
                                            draggableProvided.draggableProps.style,
                                        )}
                                    >
                                        {item.name}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );

}