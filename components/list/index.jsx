import * as React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, styled } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';
import { buildQueryString } from '../loadPage/index';

const CardComponent = styled(Card)(({ }) => ({
  height: 195
}));

export default function List(props) {
  const router = useRouter();
  const [listHeight, setListHeight] = React.useState(600);

  React.useLayoutEffect(() => {
    setListHeight(document.documentElement.clientHeight - 137)
  }, []);

  const createCard = () => {
    return props.stickers?.map(cardData => {
      const imageUrl = !!cardData.images && `https://geektori.ir/${cardData.images[0].url}`
      return <Grid item xs={2} sm={4} md={4} key={cardData.id}>
        <CardComponent sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component='img'
              height='130'
              image={imageUrl}
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom component='div'>
                {cardData.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </CardComponent>
      </Grid>
    })
  }

  const loadNextPage = () => {
    const { category, page, sort } = router.query;
    let pageNumber = !page ? 1 : Number(page);
    let queryString = buildQueryString(category, sort, pageNumber + 1);
    router.push(queryString, undefined, { shallow: true });
  }

  return (
    <InfiniteScroll
      dataLength={props.stickers?.length}
      next={loadNextPage}
      hasMore={props.hasNextPage}
      height={listHeight}
    >
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {createCard()}
      </Grid>
    </InfiniteScroll>
  );
}