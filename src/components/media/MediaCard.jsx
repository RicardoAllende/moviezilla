import React, { useCallback } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { resolveUri } from '@src/commons/routeUtils';
import { setCurrentTrendAction } from '@src/store/reducers/trends.reducer';

export const MediaCard = ({ resource }) => {
  const imageBaseUrl = `https://image.tmdb.org/t/p/w500`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToDetail = useCallback(() => {
    dispatch(setCurrentTrendAction(resource));
    const url = resolveUri('media.show', { id: resource.id });
    navigate(url);
  }, [resource, dispatch]);


  return (
    <Card sx={{ height: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={`${imageBaseUrl}${resource.backdrop_path}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            &lt;{resource.media_type}&gt; {resource.title || `${resource.original_name} [${resource.original_language}]`}
          </Typography>
          {
            resource.overview
            && (
              <Typography variant="body2" color="text.secondary">
                {resource.overview}
              </Typography>
            )
          }
          {
            resource.release_date
            && (
              <Typography variant="body2" color="text.secondary">
                Release date: {resource.release_date}
              </Typography>
            )
          }
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={goToDetail}
        >
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
};
