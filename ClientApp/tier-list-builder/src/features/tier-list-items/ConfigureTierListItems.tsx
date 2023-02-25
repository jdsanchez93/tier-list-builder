import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePostUploadMutation, usePutTierListMutation } from '../api/apiSlice';

export default function ConfigureTierListItems(props: any) {
    const [file, setFile] = useState<File | null>(null);

    const [preview, setPreview] = useState<any>(null);
    const [postUpload] = usePostUploadMutation();
    const [s3ObjectName, setS3ObjectName] = useState('');

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
        if (event.target.files === null) {
            console.error('No files')
            return;
        };
        setFile(event.target.files[0]);
    };

    const onFileUpload = async () => {
        if (file == null) {
            console.error('cannot upload, file is null');
            return;
        }

        await postUpload({ tierListId: 1, extension: ".jpg" }).unwrap()
            .then(({uploadUrl, s3ObjectName}) => {
                setS3ObjectName(s3ObjectName);
                return axios.put(uploadUrl, file)
            })
            .then(x => console.log('upload response', x))
            .catch(x => console.error(x))
    }

    let content;
    if (preview) {
        content = (
            <Box sx={{ width: '100px', height: '100px' }}>
                <img
                    src={preview}
                    alt={"preview"}
                    style={{ width: '100px', height: '100px' }}
                />
            </Box>
        )
    }

    return (
        <Box>
            <Typography variant="h5">Tier List Items</Typography>

            <Typography variant="body1">{s3ObjectName}</Typography>

            {content}

            <Box>
                <Button
                    component="label"
                >
                    Select File
                    <input
                        type="file"
                        hidden
                        onChange={onFileChange}
                    />
                </Button>

                <Button
                    id="add-row-button"
                    variant="outlined"
                    onClick={onFileUpload}
                >
                    Upload
                </Button>
            </Box>
        </Box>
    );
}