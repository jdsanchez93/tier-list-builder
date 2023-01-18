import React from "react";
import { Box, Typography } from "@mui/material";
import { ConfigureTierList } from "../configure-tier-list/ConfigureTierList";
import { TierList } from "./TierList.models";

export function CreateTierList() {

    let newTierList: TierList = {
        tierListId: 0,
        name: '',
        tierListRows: []
    }

    return (
        <Box>
            <Typography variant="h6">
                Create Tier List
            </Typography>
            <ConfigureTierList tierList={newTierList} />
        </Box>
    )
}