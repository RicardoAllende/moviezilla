import React from 'react';
import dinosaur from '@src/assets/dinosaur.png';
import { Avatar } from '@mui/material';

const MovieZillaIconComponent = (props) => {
  const defaultStyles = {
    m: 1,
    width: 64,
    height: 64,
    background: 'white',
    border: 'solid 1px gray'
  };

  const { sx = defaultStyles } = props;

  return (
    <Avatar sx={sx}>
      <img
        src={dinosaur}
        style={{ width: '100%', height: '100%' }}
      />
    </Avatar>
  );
};

export const MovieZillaIcon = React.memo(MovieZillaIconComponent);
