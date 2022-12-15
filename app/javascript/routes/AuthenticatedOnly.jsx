import React from 'react';
import {
  Navigate, Outlet, useLocation, useMatch,
} from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/auth/AuthProvider';
import VerifyAccount from '../components/users/account_activation/VerifyAccount';

export default function AuthenticatedOnly() {
  const { t } = useTranslation();
  const currentUser = useAuth();
  const location = useLocation();
  const match = useMatch('/rooms/:friendlyId');

  if (currentUser.signed_in && !currentUser?.verified) {
    return <VerifyAccount currentUser={currentUser} />;
  }

  // Custom logic to redirect from Rooms page to join page if the user isn't signed in
  if (!currentUser.signed_in && match) {
    return <Navigate to={`${location.pathname}/join`} />;
  }

  if (!currentUser.signed_in) {
    toast.error(t('toast.error.signin_required'));
    return <Navigate to="/" />;
  }

  return <Outlet />;
}