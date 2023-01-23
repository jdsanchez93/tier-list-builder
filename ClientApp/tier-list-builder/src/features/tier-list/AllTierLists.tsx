import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetTierListsQuery } from '../api/apiSlice';

export function AllTierLists() {

  const {
    data: tierLists,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTierListsQuery(undefined);

  let content;
  if (isLoading) {
    content = <div>loading</div>
  } else if (isSuccess) {
    content = tierLists.map(t => (
      <ListItem disablePadding key={t.tierListId}>
        <ListItemButton
          component={Link}
          to={`/tier-list/edit/${t.tierListId}`}
        >
          <ListItemText primary={t.name} />
        </ListItemButton>
      </ListItem>
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <List>
      {content}
    </List>
  )
}