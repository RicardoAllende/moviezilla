import React from 'react';

import { TempPage } from './TempPage';

export const MediaDetail = () => {
  const { id } = useParams();
  return <TempPage text={`Media detail: ${id}`} />;
};
