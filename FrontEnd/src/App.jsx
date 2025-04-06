import React, { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loader from "./Pages/Loader.jsx"

const LandingPage = lazy(() => import('./Pages/LandingPage.jsx'));
const LoginPage = lazy(() => import('./Pages/Authentication/LoginPage.jsx'));
const SignUpPage = lazy(() => import('./Pages/Authentication/SignUpPage.jsx'));
const ForgotPasswordPage = lazy(() => import('./Pages/Authentication/ForgotPasswordPage.jsx'));

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      children: [
        {
          path: "login",
          element: <LoginPage />
        },
        {
          path: "signup",
          element: <SignUpPage />
        },
        {
          path: "forgotPassword",
          element: <ForgotPasswordPage />
        }
      ]
    },
  ]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}