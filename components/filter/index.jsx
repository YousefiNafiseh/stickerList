import * as React from 'react';
import { InputLabel, MenuItem, FormControl, Select, styled } from '@mui/material';
import { buildQueryString } from '../loadPage/index';
import { useAppState } from '../../context/appStateContext';
import { useRouter } from 'next/router';

const SelectComponent = styled(Select)(() => ({
  zIndex: 200
}));

export default function Filter() {
  const state = useAppState();
  const router = useRouter();

  const setCategory = (event) => {
    const { sort, category, page } = router.query;

    let pageNumber = event.target.value !== category ? 1 : page
    let queryString = buildQueryString(event.target.value, sort, pageNumber);
    router.push(queryString, undefined, { shallow: true });
  }

  const setSort = (event) => {
    const { category, page } = router.query;
    let queryString = buildQueryString(category, event.target.value, page);
    router.push(queryString, undefined, { shallow: true });
  }

  const createCategoriesItem = () => {
    return state.categories.map((item) => (
      <MenuItem value={item.name.replaceAll(' ', '-')}>{item.name}</MenuItem>
    ))
  }

  const createSortItem = () => {
    return state.sorts.map((item) => (
      <MenuItem value={item.name.replaceAll(' ', '-')}>{item.name}</MenuItem>
    ))
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 250 }}>
        <InputLabel id='category-select-label'>Category</InputLabel>
        <SelectComponent
          labelId='category-select-label'
          id='category-select'
          value={router.query.category}
          label='Category'
          onChange={setCategory}
        >
          {createCategoriesItem()}
        </SelectComponent>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 250 }}>
        <InputLabel id='sort-select-label'>Sort</InputLabel>
        <Select
          labelId='sort-select-label'
          id='sort-select-label'
          value={router.query.sort}
          label='sort'
          onChange={setSort}
        >
          {createSortItem()}
        </Select>
      </FormControl>
    </div >
  );
}