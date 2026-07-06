const Hero = () => {
  return (
    <div className="relative h-[580px] flex items-center justify-center overflow-hidden ">
      <img 
        src="/images/hero.jpg" 
        alt="Beach lifestyle" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 text-center text-white px-6">
        <p className="text-lg tracking-widest mb-2">GOOD DAY CLUB</p>
        <h2 className="text-5xl md:text-6xl font-light tracking-wider">LIVE EASY</h2>
      </div>
    </div>
  );
};

export default Hero;