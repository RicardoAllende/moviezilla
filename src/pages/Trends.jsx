import React, { useCallback, useEffect } from 'react';
import { Grid } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import { Trending } from '@services/TheMovieDatabase/models/Trending';
import { MediaCard } from '@src/components/media/MediaCard';
import { appendTrendsAction } from '@src/store/reducers/trends.reducer';

export const Trends = (props) => {
  const { medias, currentPage } = useSelector(state => state.trendsReducer);
  const dispatch = useDispatch();
  const lastPage = 2;
  const hasMorePages = currentPage < lastPage;

  const fetchNextPage = useCallback(() => {
    const newPage = currentPage + 1;
    console.log('Fetching pages: ', { newPage, currentPage });
    const trending = new Trending();
    trending.getAllDailyTrending({ page: newPage })
      .then(response => {
        const results = response.data.results;
        dispatch(appendTrendsAction({ medias: results }));
      });
  }, [currentPage, dispatch, medias]);

  useEffect(() => {
    fetchNextPage();
  }, []);

  return (
    <div>
      <h1>Tendencias</h1>
      <InfiniteScroll
        scrollThreshold='100px'
        dataLength={medias.length}
        next={fetchNextPage}
        hasMore={hasMorePages}
        endMessage={<h1 style={{ textAlign: 'center' }}>There are no more pages!</h1>}
        loader={<h4>Loading...</h4>}
      >
        <Grid container spacing={2}>
          {medias.map((i, index) => (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <MediaCard resource={i} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};
