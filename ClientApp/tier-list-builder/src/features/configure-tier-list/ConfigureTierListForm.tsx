import React from 'react';
import { TextField } from '@mui/material';

interface TierListProps {
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    tierListName: string | undefined;
};

export function ConfigureTierListForm(props: TierListProps) {

    return (
        <div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Tier List Name"
                    variant="outlined"
                    value={props.tierListName}
                    onChange={e => props.onChange(e)}
                    autoComplete="off"
                />
            </div>
        </div>
    );
}