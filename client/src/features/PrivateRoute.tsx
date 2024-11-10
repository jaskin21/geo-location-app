import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteType {
  isLoggedIn: boolean;
}

const PrivateRoute = ({ isLoggedIn }: PrivateRouteType) => {
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
