const HomePage = () => {
  return (
    <div className='flex items-center justify-center h-screen flex-col md:flex-row md:items-start p-4 md:p-8 bg-transparent dark:bg-gray-900 space-y-4 md:space-y-0 md:space-x-8'>
      {/* Left Section: Description */}
      <div
        className='text-center md:text-left text-gray-700 dark:text-gray-300 md:max-w-sm mr-10'
      >
        <h1 className='text-2xl font-semibold mb-2'>
          Discover the power of information at your fingertips!
        </h1>
        <p className='text-sm'>
          Our website lets you effortlessly search any IP address and unlock
          essential details, from location and network provider to advanced
          analytics. Whether you're verifying security, optimizing business
          insights, or simply curious, our fast and user-friendly tool provides
          accurate, real-time data in seconds. Start your IP search now and
          uncover a world of insights!
        </p>
      </div>

      {/* Right Section: Image Container */}
      <div className='relative border-gray-800 dark:border-gray-700 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px] shadow-lg'>
        {/* Left Accent Lines */}
        <div className='h-[32px] w-[3px] bg-gray-800 dark:bg-gray-700 absolute -start-[17px] top-[72px] rounded-s-lg'></div>
        <div className='h-[46px] w-[3px] bg-gray-800 dark:bg-gray-700 absolute -start-[17px] top-[124px] rounded-s-lg'></div>
        <div className='h-[46px] w-[3px] bg-gray-800 dark:bg-gray-700 absolute -start-[17px] top-[178px] rounded-s-lg'></div>

        {/* Right Accent Line */}
        <div className='h-[64px] w-[3px] bg-gray-800 dark:bg-gray-700 absolute -end-[17px] top-[142px] rounded-e-lg'></div>

        {/* Inner Content */}
        <div className='rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800'>
          {/* Light Mode Image */}
          <img
            src='https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image.png'
            className='dark:hidden h-full w-full object-cover'
            alt='Tablet mockup in light mode'
          />

          {/* Dark Mode Image */}
          <img
            src='https://flowbite.s3.amazonaws.com/docs/device-mockups/tablet-mockup-image-dark.png'
            className='hidden dark:block h-full w-full object-cover'
            alt='Tablet mockup in dark mode'
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
