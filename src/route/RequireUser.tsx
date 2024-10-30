import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';

import toast from 'react-hot-toast';

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  const location = useLocation();

  if (allowedRoles.includes('*')) {
    return <Outlet />;
  }

  if (isAuthenticated && allowedRoles.includes(user?.role as string)) {
    return <Outlet />;
  } else {
    toast.error('Login expired or authentication failed, please log in again!');

    return isAuthenticated && user ? (
      <Navigate to='/unauthorized' state={{ from: location }} replace />
    ) : (
      <Navigate to='/login' state={{ from: location }} replace />
    );
  }
};

export default RequireUser;
