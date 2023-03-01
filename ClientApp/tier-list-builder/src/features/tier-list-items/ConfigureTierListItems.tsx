import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import AddTierListItem from './AddTierListItem';
import ItemImageList from './ItemImageList';

interface ConfigureTierListItemsProps {
    tierListId: number
}
export default function ConfigureTierListItems({ tierListId }: ConfigureTierListItemsProps) {
    const [dialogOpen, setDialogOpen] = useState(false);


    const onClose = () => {
        setDialogOpen(false);
    }

    return (
        <Box>
            <Button
                id="add-item-button"
                onClick={() => setDialogOpen(true)}
            >
                Add Item
            </Button>
            <AddTierListItem tierListId={tierListId} open={dialogOpen} onClose={onClose} />
            <ItemImageList tierListId={tierListId} />
        </Box>
    );
}