import { useEffect } from 'react';
import { CssBaseline, Container, Grid } from '@mui/material';
import Content from '../../components/content/index';
import { Provider as AppStateProvider } from '../../context/appStateContext';
import { Provider as DispatchProvider } from '../../context/dispatcherContext';
import { INIT_STATE, reducer } from '../../stateManager/reducer';
import useThunkReducer from 'react-hook-thunk-reducer';
import { initializeState, setListData } from '../../stateManager/actionCreator';
import { filterData } from '../../components/loadPage/index';
import { useRouter } from 'next/router';
import { getData } from '../../components/loadPage';

export default function Home(props) {
  const router = useRouter();
  const [state, dispatch] = useThunkReducer(reducer, INIT_STATE);

  useEffect(() => {
    dispatch(initializeState({
      stickers: props.stickers,
      hasNextPage: props.hasNextPage,
      categories: props.categories,
      sorts: props.sorts,
    }));
  }, [])

  useEffect(() => {
    if (!!state.initialized) {
      getData().then(data => {
        const stickers = filterData(data.result.products, router.query.category, router.query.sort, router.query.page)
        dispatch(setListData({
          stickers: stickers.data,
          hasNextPage: stickers.totalCount > stickers.data.length,
        }));
      });
    }
  }, [router.query.page, router.query.sort, router.query.category]);

  const initData = !!state.stickers ? { ...state } : { ...props }
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Grid item>
          <DispatchProvider dispatch={dispatch}>
            <AppStateProvider state={state}>
              <Content {...initData} />
            </AppStateProvider>
          </DispatchProvider>
        </Grid>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const { page, category, sort } = context.query;
  const response = await fetch('http://localhost:3000/post.json');
  const jsonData = await response.json();
  const data = jsonData.result.products;
  const pageNumber = (!page) ? 1 : page;
  const stickers = filterData(data, category, sort, pageNumber);

  return {
    props: {
      stickers: stickers.data,
      hasNextPage: stickers.totalCount > stickers.data.length,
      categories: jsonData.result.category_list,
      sorts: jsonData.result.sorts
    },
  }
} 
