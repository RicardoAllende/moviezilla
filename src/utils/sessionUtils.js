export const userIsVerified = (user) => {
  // Only firebase auth should be verified, not google nor Github ...
  return user?.authProviderId !== 'password' || user?.emailVerified;
};