import React from 'react';
import { Box, Fab } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface SaveTierListProps {
    onSave: () => void;
}

export const SaveTierList = (props: SaveTierListProps) => {
    return (
        <Box
            sx={{
                margin: '10px',
                display: 'flex',
                justifyContent: 'right',
                gap: '20px'
            }}
        >
            <Fab variant="extended" onClick={props.onSave}>
                <SaveIcon sx={{ mr: 1 }} />
                Save
            </Fab>
        </Box>
    )
}