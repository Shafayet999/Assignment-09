import React, { use } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);

    const location = useLocation();

    if(loading) return <Loading></Loading>;    
    if(user) return children; 
    return <Navigate state={location?.pathname} to='/auth/login'></Navigate>
};

export default PrivateRoute;