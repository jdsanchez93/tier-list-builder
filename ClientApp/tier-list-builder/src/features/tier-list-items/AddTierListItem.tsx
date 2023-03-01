import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { usePostItemMutation, usePostUploadMutation } from '../api/apiSlice';
import ImageIcon from '@mui/icons-material/Image';
import SimpleSnackBar from '../global/SimpleSnackBar';
import { green } from '@mui/material/colors';

interface AddTierListItemProps {
    tierListId: number;
}
export default function AddTierListItem({ tierListId }: AddTierListItemProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<any>(null);
    const [name, setName] = useState('');
    const [postUpload] = usePostUploadMutation();
    const [postItem] = usePostItemMutation();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null || event.target.files.length === 0) {
            setFile(null);
            setName('');
            setPreview(null);
            return;
        };
        setFile(event.target.files[0]);
        setName(event.target.files[0].name);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(event.target.files[0]);

    };

    const onFileUpload = async () => {
        if (file == null) {
            console.error('cannot upload, file is null');
            return;
        }

        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }

        try {
            const { uploadUrl, s3ObjectName } = await postUpload({ tierListId: 1, extension: ".jpg" }).unwrap();
            await axios.put(uploadUrl, file);
            await postItem({ tierListItemId: 0, tierListId, imageUrl: s3ObjectName, name }).unwrap();
        } catch (err) {
            console.error('Failed to save item: ', err);
            setSnackbarOpen(true);
        } finally {
            setSuccess(true);
            setLoading(false);
        }
    }

    return (
        <Card sx={{ width: 'fit-content' }}>
            <CardHeader
                title="Add Item"
            />
            <CardContent sx={{ display: 'grid', gap: '20px' }}>

                <TextField
                    id="tier-list-item-name"
                    label="Name"
                    variant="outlined"
                    autoComplete="off"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar
                        src={preview}
                        variant="square"
                        sx={{ width: 100, height: 100 }}
                    >
                        <ImageIcon />
                    </Avatar>

                    <Button
                        id="add-row-button"
                        component="label"
                    >
                        Select File
                        <input
                            type="file"
                            hidden
                            onChange={onFileChange}
                        />
                    </Button>
                </Box>

            </CardContent>
            <CardActions>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                        id="add-row-button"
                        variant="contained"
                        disabled={loading || preview == null || success}
                        onClick={onFileUpload}
                    >
                        Save
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>
            </CardActions>

            <SimpleSnackBar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message="Failed to save item"
                severity={'error'}
            />

        </Card>
    );
}