// const Hero = () => {
//   return (
//     <div className="relative h-[580px] flex items-center justify-center overflow-hidden ">
//       <img 
//         src="/images/hero.jpg" 
//         alt="Beach lifestyle" 
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black/30" />
      
//       <div className="relative z-10 text-center text-white px-6">
//         <p className="text-lg tracking-widest mb-2">GOOD DAY CLUB</p>
//         <h2 className="text-5xl md:text-6xl font-light tracking-wider">LIVE EASY</h2>
//       </div>
//     </div>
//   );
// };

// export default Hero;





const Hero = () => {
  return (
    <div className="relative min-h-[580px] md:min-h-[650px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#f8f4ed]">
      {/* Background Image */}
      <img 
        src="/images/hero2.jpg"   // ← Replace with your actual image path
        alt="Woman wearing blue cap" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8f4ed]/90 via-[#f8f4ed]/70 to-transparent lg:from-transparent lg:via-transparent lg:to-transparent" />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="text-2xl font-bold tracking-wider text-[#0a2540]">KAPATO</div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#0a2540]">
          <a href="#" className="hover:underline">SHOP</a>
          <a href="#" className="hover:underline">COLLECTIONS</a>
          <a href="#" className="hover:underline">ABOUT</a>
          <a href="#" className="hover:underline">CONTACT</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-[#0a2540]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-[#0a2540] relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-6 md:px-12 lg:pl-20">
        <h1 className="text-[#0a2540] text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
          Made For<br />Sun Days.
        </h1>
        
        <p className="mt-4 text-[#0a2540] text-lg md:text-xl max-w-md">
          Beach days, city ways,<br />
          always on your head.
        </p>

        <button 
          className="mt-8 bg-[#0a2540] hover:bg-[#1a3550] transition-colors text-white px-8 py-3.5 rounded-md font-medium text-sm tracking-wider"
          onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
        >
          SHOP NOW
        </button>
      </div>

      {/* Mobile Navigation Toggle (optional) */}
      <div className="md:hidden absolute top-5 right-6 z-30">
        {/* You can add a hamburger menu here if needed */}
      </div>
    </div>
  );
};

export default Hero;