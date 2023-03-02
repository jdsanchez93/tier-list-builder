import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import AddTierListItemDialog from './AddTierListItemDialog';
import ItemImageList from './ItemImageList';

interface ConfigureTierListItemsProps {
    tierListId: number
}
export default function ConfigureTierListItems({ tierListId }: ConfigureTierListItemsProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Card sx={{ width: 'fit-content', margin: '10px' }}>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    Tier List Items
                </Typography>
                <ItemImageList tierListId={tierListId} />
            </CardContent>

            <CardActions>
                <Button
                    id="add-item-button"
                    onClick={() => setDialogOpen(true)}
                    size="small"
                >
                    Add Item
                </Button>
            </CardActions>

            <AddTierListItemDialog tierListId={tierListId} open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </Card>

    );
}