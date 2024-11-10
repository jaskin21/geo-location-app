// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Layout from './features/layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Suspense, lazy, useEffect, useState } from 'react';
import Loading from './pages/Loading';
import { Provider } from 'react-redux';
import { store } from './stores/store';

// Funtion test to intentionaly delay lazy load
const delayImport = <T,>(
  importFunc: () => Promise<T>,
  delay: number = 1000
): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(importFunc());
    }, delay);
  });
};

// Lazy-loaded components
const RegisterPage = lazy(() =>
  delayImport(() => import('./pages/RegisterPage'))
);
const LoginPage = lazy(() => delayImport(() => import('./pages/LoginPage')));
const HomePage = lazy(() => delayImport(() => import('./pages/HomePage')));
const FindPage = lazy(() => delayImport(() => import('./pages/FindPage')));
const HistoryPage = lazy(() =>
  delayImport(() => import('./pages/HistoryPage'))
);
const ContactPage = lazy(() =>
  delayImport(() => import('./pages/ContactPage'))
);
const PrivateRoute = lazy(() =>
  delayImport(() => import('./features/PrivateRoute'))
);
const NotFoundPage = lazy(() =>
  delayImport(() => import('./pages/NotFoundPage'))
);
// const RegisterPage = lazy(() => import('./pages/RegisterPage'));
// const LoginPage = lazy(() => import('./pages/LoginPage'));
// const HomePage = lazy(() => import('./pages/HomePage'));
// const ContactPage = lazy(() => import('./pages/ContactPage'));
// const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Cookies.get('token') !== undefined
  );

  useEffect(() => {
    if (!isLoggedIn) {
      Cookies.remove('token'); // Remove token if user logs out
    }
  }, [isLoggedIn]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <Provider store={store}>
      {/* Wrap your app with Redux Provider */}
      <BrowserRouter>
        <ToastContainer />

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path='/signup'
              element={
                isLoggedIn ? <Navigate to='/' replace /> : <RegisterPage />
              }
            />
            <Route
              path='/login'
              element={
                isLoggedIn ? (
                  <Navigate to='/' replace />
                ) : (
                  <LoginPage login={login} />
                )
              }
            />
            <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
              <Route path='/' element={<Layout logout={logout} />}>
                <Route index element={<HomePage />} />
                <Route path='/find' element={<FindPage />} />
                <Route path='/history' element={<HistoryPage />} />
                <Route path='/contact' element={<ContactPage />} />
              </Route>
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
