import React from "react";
import { Navigate, Route, RouteProps, useLocation } from "react-router-dom";
import useStateSelector from "src/utils/useStateSelector";

const RestrictedRoute: React.FC<RouteProps> = (props) => {
  const { isAuthenticated } = useStateSelector((state) => state.auth);

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Route {...props} />;
};

export default RestrictedRoute;
