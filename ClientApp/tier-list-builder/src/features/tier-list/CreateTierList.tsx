import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { usePostTierListMutation } from "../api/apiSlice";

export function CreateTierList() {

    const [name, updateName] = useState('');
    const [addNewTierList] = usePostTierListMutation();

    const onSubmit = async () => {
        try {
            await addNewTierList({ name: name }).unwrap();
            updateName('');
        } catch (err) {
            console.error('Failed to post Tier List: ', err);
        }
    };

    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={e => updateName(e.target.value)}
            />
            <Button variant="contained" onClick={onSubmit}>Create</Button>
        </div>
    );
}