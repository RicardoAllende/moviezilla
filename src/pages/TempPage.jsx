import React from 'react'
import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom';

export const TempPage = () => {
  const location = useLocation();
  return (
    <div>A dummy temp page in: {location.href}</div>
  )
}
