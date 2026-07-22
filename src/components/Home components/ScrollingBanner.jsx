const ScrollingBanner = () => {
  const text = "SUN. SALT. FREEDOM.";

  return (
    <div className="bg-[#0a2540] text-white py-3 overflow-hidden border-y border-white/20">
      <div className="flex items-center whitespace-nowrap animate-marquee">
        {/* First copy */}
        <div className="flex items-center gap-8 md:gap-12 text-sm md:text-base font-medium tracking-[3px]">
          {Array(8).fill(text).map((item, i) => (
            <span key={i} className="flex items-center gap-8 md:gap-12">
              {item}
              <span className="text-white/60 text-xl">★</span>
            </span>
          ))}
        </div>

        {/* Second copy (for seamless loop) */}
        <div className="flex items-center gap-8 md:gap-12 text-sm md:text-base font-medium tracking-[3px]">
          {Array(8).fill(text).map((item, i) => (
            <span key={i} className="flex items-center gap-8 md:gap-12">
              {item}
              <span className="text-white/60 text-xl">★</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingBanner;