import * as React from 'react';
import { Box, Paper, Grid, styled } from '@mui/material';
import List from '../list/index';
import Filter from '../filter/index';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Content(props) {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Item>
            <Filter categories={props.categories} sorts={props.sorts} />
          </Item>
        </Grid>

        <Grid item xs={12}>
          <Item>
            <List stickers={props.stickers} hasNextPage={props.hasNextPage} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}