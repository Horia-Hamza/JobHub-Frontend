import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    // If user is not logged in or has an invalid role, navigate to login
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
