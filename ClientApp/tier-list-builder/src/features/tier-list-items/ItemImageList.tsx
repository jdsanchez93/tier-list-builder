import React from 'react';
import { Avatar, Box, CircularProgress, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { useDeleteItemMutation, useGetItemsByTierListIdQuery } from '../api/apiSlice';
import DeleteIcon from '@mui/icons-material/Delete';

interface ItemImageListProps {
    tierListId: number;
}
export default function ItemImageList({ tierListId }: ItemImageListProps) {
    const { data: tierListItems, isSuccess, isLoading } = useGetItemsByTierListIdQuery(tierListId);
    const [deleteItem] = useDeleteItemMutation();

    let content;
    if (isLoading) {
        content = (
            <CircularProgress />
        );
    } else if (isSuccess) {
        content = (
            <ImageList sx={{ width: 300 }} cols={2} rowHeight={150}>
                {tierListItems.map((item) => (
                    <ImageListItem key={item.tierListItemId}>
                        <img
                            src={item.presignedUrl}
                            alt={item.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.name}
                            position={'bottom'}
                            actionIcon={
                                <IconButton
                                    onClick={() => deleteItem(item.tierListItemId)}
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.name}`}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        );
    }

    return (
        <Box>
            {content}
        </Box>
    );
}