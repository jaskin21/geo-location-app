import { MapPinArea } from '@phosphor-icons/react';
import useToast from '../hook/useToast';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterRequest } from '../types/apiSlice';
import { useState } from 'react';
import { useRegisterApiEndpointMutation } from '../stores/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { handleFetchBaseQueryError } from '../utils/errorFactory';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { showSuccessToast, showErrorToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>();

  // Use the login mutation hook from RTK Query
  const [registerApiEndpoint, { isLoading: isRegistering }] =
    useRegisterApiEndpointMutation();
  // State to hold error message
  const [registerErrorMessage, setRegisterErrorMessage] = useState<string>('');

  const onSubmit = async (dataCreds: RegisterRequest) => {
    try {
      const response = await registerApiEndpoint({
        username: dataCreds.username,
        email: dataCreds.email,
        password: dataCreds.password,
      }).unwrap();

      showSuccessToast(response.message);
      navigate('/login');
    } catch (error) {
      const errorMessage = handleFetchBaseQueryError(
        error as FetchBaseQueryError,
        'Register failed. Please try again.'
      );
      setRegisterErrorMessage(errorMessage);
      showErrorToast(`${errorMessage}`);
    }
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='flex items-center justify-center p-5'>
          <MapPinArea size={50} color='#e61d65' weight='fill' />
          <h1 className='ml-2 text-4xl font-bold'>Geocoding</h1>{' '}
        </div>

        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Create an account
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              action='#'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor='username'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Username
                </label>
                <input
                  type='username'
                  id='username'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Username'
                  {...register('username', {
                    required: 'Username is required',
                  })}
                  required
                />
                {errors.username && <p>{errors.username.message}</p>}
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Email'
                  {...register('email', { required: 'Email is required' })}
                  required
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  {...register('password', {
                    required: 'Password is required',
                  })} // Correctly register password
                  required
                />
              </div>
              {/* <div>
                <label
                  htmlFor='confirm-password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Confirm password
                </label>
                <input
                  type='confirm-password'
                  name='confirm-password'
                  id='confirm-password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                />
              </div> */}
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='terms'
                    aria-describedby='terms'
                    type='checkbox'
                    className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                    required
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label
                    htmlFor='terms'
                    className='font-light text-gray-500 dark:text-gray-300'
                  >
                    I accept the{' '}
                    <a
                      className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                      href='#'
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type='submit'
                className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                {isRegistering ? 'Creating account...' : 'Create an account'}
              </button>
              {registerErrorMessage && <p>{registerErrorMessage}</p>}

              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
