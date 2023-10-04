import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchLoggedInUser } from '../features/user/userAPI';
import { signOutAsync } from '../features/auth/authSlice';

const LogoutPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(fetchLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  }, [dispatch]);

  return <>{user && <Navigate to="/" replace={true}></Navigate>}</>;
};

export default LogoutPage;
