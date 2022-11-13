import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import styles from './TierList.module.css';
import { getAllTierListsAsync, selectAllTierLists } from './tierListSlice';

export function AllTierLists() {

  const loadStatus = useSelector((state: RootState) => state.tierList.status);

  const dispatch = useAppDispatch();

  const tierLists = useSelector(selectAllTierLists)

  useEffect(() => {
    if (loadStatus === 'idle') {
      dispatch(getAllTierListsAsync())
    }
  }, [loadStatus, dispatch]);

  let content;
  if (loadStatus === 'loading') {
    content = <div>loading</div>
  } else if (loadStatus === 'succeeded') {
    content = tierLists.map(t => (
      <ListItem disablePadding key={t.tierListId}>
        <ListItemButton>
          <ListItemText primary={t.name} />
        </ListItemButton>
      </ListItem>
    ))
  } else if (loadStatus === 'failed') {
    content = <div>error</div>
  }

  return (
    <List>
      {content}
    </List>
  )
}