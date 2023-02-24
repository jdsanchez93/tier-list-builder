import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ConfigureTierListItems(props: any) {
    const [file, setFile] = useState<File | null>(null);

    const [preview, setPreview] = useState<any>(null)

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
        }
        console.log('event', event.target.files)
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        const apiGatewayUrl = '';

        const apiGatewayResponse = axios.post(apiGatewayUrl, { data: 'test' });

        apiGatewayResponse
            .then(x => {
                console.log('response', x);
            })
            .catch(x => console.error(x))


        // const formData = new FormData();
        // if (file == null) {
        //     console.error('cannot upload, file is null');
        //     return;
        // }
        // formData.append("image", file, file.name);
        // axios.put(url, file)
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