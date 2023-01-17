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
import { TierList, TierListRow } from '../tier-list/tierListSlice';


// a little function to help us with reordering the result
function reorder<TItem>(
    list: TItem[],
    startIndex: number,
    endIndex: number,
): TItem[] {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
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
    tierList: TierList;
}
export function DraggableTierListRows(props: DraggableTierListProps) {

    const tierListRows: TierListRow[] = props.tierList.tierListRows === undefined ? [] : props.tierList.tierListRows

    const [state, setState] = useState(tierListRows);

    const onDragEnd = (result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            state,
            result.source.index,
            result.destination.index,
        );

        setState(items);
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
                        {state.map((item, index) => (
                            <Draggable
                                key={item.tierListRowId}
                                draggableId={String(item.tierListRowId)}
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