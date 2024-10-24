// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './features/layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Suspense, lazy } from 'react';
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
const ContactPage = lazy(() =>
  delayImport(() => import('./pages/ContactPage'))
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
  return (
    <Provider store={store}>
      {' '}
      {/* Wrap your app with Redux Provider */}
      <BrowserRouter>
        <ToastContainer />

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/signup' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='/contact' element={<ContactPage />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
