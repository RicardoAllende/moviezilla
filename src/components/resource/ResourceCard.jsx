import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { resolveUri } from '@src/commons/routeUtils';

export const ResourceCard = ({ resource }) => {
  const imageBaseUrl = `https://image.tmdb.org/t/p/w500`;
  const navigate = useNavigate();

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
          onClick={() => {
            const url = resolveUri('media.show', { id: resource.id });
            console.log(`The new URI is: ${url}`);
            navigate(url);
          }}
        >
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
};
