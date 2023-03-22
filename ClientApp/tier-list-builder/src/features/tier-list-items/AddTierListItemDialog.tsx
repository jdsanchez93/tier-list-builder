import { Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { usePostItemMutation, usePostUploadMutation } from '../api/apiSlice';
import ImageIcon from '@mui/icons-material/Image';
import SimpleSnackBar from '../global/SimpleSnackBar';
import ReactCrop, { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from './image-crop/canvasPreview';

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 100,
            },
            ASEPECT,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

const ASEPECT = 1;

interface AddTierListItemDialogProps {
    tierListId: number;
    open: boolean;
    onClose: any;
}
export default function AddTierListItemDialog({ tierListId, open, onClose }: AddTierListItemDialogProps) {
    const [name, setName] = useState('');
    const [postUpload] = usePostUploadMutation();
    const [postItem] = usePostItemMutation();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [imgSrc, setImgSrc] = useState('');
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

    const [loading, setLoading] = useState(false);

    const onDialogClose = () => {
        setImgSrc('');
        setName('');
        setCrop(undefined);
        onClose();
    }

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null || event.target.files.length === 0) {
            return;
        };
        setName(event.target.files[0].name);

        setCrop(undefined); // Makes crop preview update between images.
        const reader = new FileReader();
        reader.onloadend = () => {
            setImgSrc(reader.result?.toString() || '');
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget
        setCrop(centerAspectCrop(width, height))
    }

    useEffect(() => {
        const t = setTimeout(async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    1,
                    0,
                )
            }
        }, 100)

        return () => {
            clearTimeout(t)
        }
    }, [completedCrop])

    const onFileUpload = async () => {
        if (!previewCanvasRef.current) {
            console.error('Crop canvas does not exist');
            return;
        }

        previewCanvasRef.current.toBlob(async (blob) => {
            if (!blob) {
                throw new Error('Failed to create blob')
            }
            await uploadBlob(blob);
        });
    }

    const uploadBlob = async (blob: Blob) => {
        if (!loading) {
            setLoading(true);
        }

        try {
            // TODO extension
            const { uploadUrl, s3ObjectName } = await postUpload({ tierListId: 1, extension: ".jpg" }).unwrap();
            await axios.put(uploadUrl, blob);
            await postItem({ tierListItemId: 0, tierListId, imageUrl: s3ObjectName, name }).unwrap();
            onDialogClose();
        } catch (err) {
            console.error('Failed to save item: ', err);
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onClose={onDialogClose}>
            <DialogTitle id="add-item-dialog-title">
                Add Item
            </DialogTitle>
            <DialogContent sx={{ display: 'grid', gap: '20px' }} >
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
                        variant="square"
                        sx={{ width: '150px', height: '150px' }}
                    >
                        {!!completedCrop && (
                            <>
                                <div
                                    style={{ width: '150px', height: '150px' }}
                                >
                                    <canvas
                                        ref={previewCanvasRef}
                                        style={{
                                            objectFit: 'contain',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </div>
                            </>
                        )}
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

                {!!imgSrc && (
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={ASEPECT}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            style={{ transform: `scale(${1}) rotate(${0}deg)`, maxHeight: '50vh' }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                )}

            </DialogContent>
            <DialogActions>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                        id="add-row-button"
                        variant="contained"
                        disabled={loading || imgSrc == ''}
                        onClick={onFileUpload}
                    >
                        Save
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>
            </DialogActions>

            <SimpleSnackBar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message="Failed to save item"
                severity={'error'}
            />
        </Dialog>
    );
}