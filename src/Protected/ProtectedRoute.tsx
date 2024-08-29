import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
  TUser,
} from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hook";
import { isTokenExpired } from "../utils/token";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathname = location.pathname.split("/")[1];
  const user = useAppSelector(selectCurrentUser) as TUser;
  const token = useAppSelector(selectCurrentToken);
  const [isRedirect, setIsRedirect] = useState(false);

  const isUserValid = pathname === user?.role;
  const isExpired = token ? isTokenExpired(token) : true;

  useEffect(() => {
    if (!token || isExpired || !isUserValid) {
      toast.error("Please sign in", { duration: 2000 });
      dispatch(logout());
      setIsRedirect(true);
    }
  }, [token, isExpired, isUserValid, dispatch]);

  if (isRedirect) {
    return <Navigate to="/sign-in" replace={true} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
