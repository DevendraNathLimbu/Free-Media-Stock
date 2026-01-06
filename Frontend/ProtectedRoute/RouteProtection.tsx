import type {ReactElement, ReactNode} from 'react'
import {Navigate} from 'react-router-dom';

const RouteProtection = ({children}: {children: ReactNode}) : ReactElement => {
    const token = localStorage.getItem('token');
   if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

export default RouteProtection;