import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePostItemMutation, usePostUploadMutation } from '../api/apiSlice';
import ImageIcon from '@mui/icons-material/Image';

interface AddTierListItemProps {
    tierListId: number;
}
export default function AddTierListItem({ tierListId }: AddTierListItemProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<any>(null);
    const [name, setName] = useState('');
    const [postUpload] = usePostUploadMutation();
    const [postItem] = usePostItemMutation();

    // TODO review if useEffect is necessary
    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null)
        }
    }, [file]);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null || event.target.files.length === 0) {
            console.error('No file selected')
            return;
        };
        setFile(event.target.files[0]);
        setName(event.target.files[0].name);
    };

    const onFileUpload = async () => {
        if (file == null) {
            console.error('cannot upload, file is null');
            return;
        }

        try {
            const { uploadUrl, s3ObjectName } = await postUpload({ tierListId: 1, extension: ".jpg" }).unwrap();
            await axios.put(uploadUrl, file);
            await postItem({ tierListItemId: 0, tierListId, imageUrl: s3ObjectName, name }).unwrap();
        } catch (err) {
            console.error('Failed to save item: ', err);
            // TODO snackbar
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
                <Button
                    id="add-row-button"
                    variant="outlined"
                    onClick={onFileUpload}
                    disabled={preview == null}
                >
                    Upload
                </Button>
            </CardActions>

        </Card>
    );
}