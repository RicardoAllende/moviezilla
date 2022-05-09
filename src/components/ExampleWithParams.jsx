import React from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const params = useParams();

  return (
    <div>The given params are: {JSON.stringify(params)}</div>
  );
};
