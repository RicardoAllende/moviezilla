import React from 'react';
import { useParams } from 'react-router-dom';

import { TempPage } from './TempPage';

export const MediaDetail = () => {
  const { id } = useParams();
  return <TempPage text={`Media detail: ${id}`} />;
};
