import * as React from 'react';
import { Container, CardActionArea, CardMedia, CardContent, Typography, CssBaseline, Box, styled, Grid, Card } from '@mui/material';
import Link from 'next/link';

const MainContainer = styled(Container)(({ }) => ({
  padding: 10,
  textAlign: 'center'
}));

export default function Home(props) {

  function renderCategories(categories) {
    return categories.map(category => (
      <Link href={`/category/${category.name.replace(' ', '-')}`} key={category.id}>
        <Grid item xs={2} sm={4} md={4}>
          <Card sx={{ maxWidth: 345 }} >
            <CardActionArea>
              <CardMedia
                component='img'
                height='100'
                image={category.imageUrl}
                alt='green iguana'
              />
              <CardContent>
                <Typography gutterBottom component='div'>
                  {category.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Link>
    ))
  }

  return (
    <>
      <CssBaseline />
      <MainContainer>
        <Box sx={{ flexGrow: 1 }}>
          <h4>select a category</h4>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {renderCategories(props.categories)}
          </Grid>
        </Box>
      </MainContainer>
    </>
  )
}

export async function getServerSideProps(context) {
  const response = await fetch('http://localhost:3000/post.json');
  const jsonData = await response.json()
  return {
    props: {
      categories: jsonData.result.category_list,
    },
  }
} 
