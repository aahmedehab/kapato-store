const MadeToGoAnywhere = () => {
  return (
    <div className=" mx-auto">
      {/* Main Section - Mobile Mix */}
      <div className="relative h-[560px] lg:h-[460px] grid grid-cols-1 lg:grid-cols-5 overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 lg:relative lg:col-span-2">
          <img 
            src="/images/palm tree.jpg" 
            alt="Palm trees" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Strong Overlay for Mobile Mix */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#1230c6]/80 lg:hidden" />
        </div>

        {/* Blue Content - Overlay on Mobile */}
        <div className="relative z-10 lg:col-span-3 bg-[#1230c6]/30 lg:bg-[#1230c6] text-white p-10 md:p-14 lg:p-16 flex flex-col justify-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Made To<br />Go Anywhere.
            </h2>

            <p className="mt-5 text-base md:text-lg text-white/90 max-w-md">
              From the beach to the streets.<br />
              Always with you.
            </p>

            <button className="mt-10 bg-white text-[#1230c6] hover:bg-gray-100 transition-colors px-9 py-3.5 rounded-md font-medium text-sm tracking-wider w-fit">
              SHOP NOW
            </button>
          </div>

          {/* Logo - Hidden on very small screens, visible from md */}
          <div className="hidden md:flex items-center justify-center mt-12 lg:mt-auto">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
              <span className="text-[#1230c6] text-5xl font-black">K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 bg-[#f8f4ed] divide-y md:divide-y-0 md:divide-x divide-gray-300 text-sm">
        <div className="p-8 text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-[#1230c6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1230c6]">Designed For Sunny Days</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Light, breathable &amp; made for the heat.
          </p>
        </div>

        <div className="p-8 text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-[#1230c6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 01-2 2H7a2 2 0 01-2 2v16m14 0h-4m-6 0H5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1230c6]">Built For Every Wave</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Durable, timeless &amp; made to last.
          </p>
        </div>

        <div className="p-8 text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-[#1230c6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.502 5.502 0 00-10.78 2.22A4.5 4.5 0 003 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-[#1230c6]">Inspired By The Coast</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Colors and details from the places we love.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MadeToGoAnywhere;