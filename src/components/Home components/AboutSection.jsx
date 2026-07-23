const AboutSection = () => {
  return (
    <div className="mx-auto">
      <div className="relative h-[520px] lg:h-auto grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0 lg:relative lg:col-span-1">
          <img
            src="/images/beach ocean.jpg"
            alt="Ocean waves"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Mobile Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#f8dfc5]/80 lg:hidden" />
        </div>

        {/* Content */}
        <div className="relative z-10 lg:col-span-1 bg-[#f8dfc5]/30 lg:bg-[#f8dfc5] p-12 md:p-16 lg:p-20 flex flex-col justify-center">

          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
    <img
      src="/images/logo/k logo secondary.png"
      alt="KAPATO Logo"
      className="w-16 h-16 object-contain"
    />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-none">
              About KAPATO
            </h2>
          </div>

          <p className="text-lg text-secondary lg:text-primary leading-relaxed">
            KAPATO is a tribute to sun, sea, and the freedom in between.
          </p>

          <p className="mt-4 text-lg text-secondary lg:text-primary leading-relaxed">
            We create timeless caps for those who chase the sun.
          </p>

          <a
            href="/our-story"
            className="mt-10 inline-flex items-center gap-3 text-primary hover:text-primary-dark font-medium group"
          >
            READ OUR STORY
            <span className="text-xl group-hover:translate-x-2 transition-transform">
              →
            </span>
          </a>

        </div>
      </div>
    </div>
  );
};

export default AboutSection;