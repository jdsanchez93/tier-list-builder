import React from 'react';
import { Box, CircularProgress, ImageList, ImageListItem } from '@mui/material';
import { useGetItemsByTierListIdQuery } from '../api/apiSlice';

interface ItemImageListProps {
    tierListId: number;
}
export default function ItemImageList({ tierListId }: ItemImageListProps) {
    const { data: tierListItems, isSuccess, isLoading } = useGetItemsByTierListIdQuery(tierListId);

    let content;
    if (isLoading) {
        content = (
            <CircularProgress />
        );
    } else if (isSuccess) {
        content = (
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={100}>
                {tierListItems.map((item) => (
                    <ImageListItem key={item.tierListItemId}>
                        <img
                            src={item.presignedUrl}
                            alt={item.name}
                            loading="lazy"
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