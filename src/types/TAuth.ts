/* eslint-disable @typescript-eslint/no-unused-vars */
type TUser = {
  id: string;
  name: string;
  email: string;
  // Add any other properties related to the user
};

type TAuthState = {
  user: TUser | null; // User can be null if not logged in
  token: string | null; // Token for authentication, if applicable
  isAuthenticated: boolean; // Whether the user is authenticated
  loading: boolean; // Loading state for authentication
  error: string | null; // Error message, if any
};
