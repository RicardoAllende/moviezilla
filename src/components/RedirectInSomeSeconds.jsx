import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RedirectInSomeSeconds = ({ children, seconds = 3, to }) => {
  const navigate = useNavigate();

  setTimeout(() => {
    // console.log('Navigating to ', to);
    navigate(to);
  }, seconds * 1000);

  return (children);
};
