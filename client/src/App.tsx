// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './features/layout/Layout';

import { Suspense, lazy } from 'react';

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
const RegisterPage = lazy(() => delayImport(() => import('./pages/RegisterPage')));
const LoginPage = lazy(() => delayImport(() => import('./pages/LoginPage')));
const HomePage = lazy(() => delayImport(() => import('./pages/HomePage')));
const NotFoundPage = lazy(() =>
  delayImport(() => import('./pages/NotFoundPage'))
);

// const HomePage = lazy(() => import('./pages/HomePage'));
// const ContactPage = lazy(() => import('./pages/ContactPage'));
// const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/geo-app' element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
