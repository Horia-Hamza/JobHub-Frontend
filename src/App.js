import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './Components/layout/layout';
import { LandingPage } from './Components/landing-page/landingPage';
import { Authentication } from './Components/authentication/authentication';
import { JobListing } from './Components/Job-listing/JobListing';
import {LogIn } from './Components/login/login';
import { Applications } from './Components/applications/applications';
import { ProtectedRoute } from './Components/protectedRoute/protectedRoute';
import JobDetails from './Components/Job-details/JobDetails';
import Dashboard from './Components/dashboard/dashboard';
import UserContextProvider from './Components/context/userContext';
import NotFound from './Components/not-found/notfound';
import ApplicationForm from './Components/application-form/application-form.jsx';

let routers = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index:true, element: <LandingPage /> },
      { path: 'signup', element: <Authentication /> },
      { path: 'login', element: <LogIn /> },
      { path: 'login/:jobId', element: <LogIn /> },
      { path: 'jobs', element: <JobListing /> },    
      { path: 'job/:jobId', element: <JobDetails /> },
      { path: 'job/:jobId/apply', element: <ApplicationForm /> },
      { path: 'admin-dashboard', element: <ProtectedRoute allowedRoles={['Admin']}> <Dashboard /> </ProtectedRoute> },
{ path: 'user-applications', element: <ProtectedRoute allowedRoles={['User']}> <Applications /> </ProtectedRoute> },

      { path: '*', element: <NotFound /> },

    ],
  },
]);

export default function App() {
  return  <UserContextProvider>
    <RouterProvider router={routers}></RouterProvider>
    </UserContextProvider>

}
