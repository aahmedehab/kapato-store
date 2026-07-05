const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white py-20 border-b">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold tracking-widest text-[#B71C1C] mb-4">
            GOOD DAY CLUB
          </h1>
          <p className="text-2xl text-[#4A4A4A] font-light">Live Easy, Wear Happy</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none text-[#3F3F3F] leading-relaxed">
            <p className="text-xl mb-8">
              Caps Club was founded in July 2026 by a 21-year-old graphic design student with a passion for fashion wear and bold self-expression.
            </p>
            
            <p className="mb-8">
              The idea came from a simple, frustrating problem: Despite being a fashion-forward country, Egypt lacked high-quality caps. 
              Whether shopping in-store or scrolling through local websites, I couldn’t find a single cap that matched my expectations in terms of fabric, fit, or finish.
            </p>

            <p className="mb-8">
              There were either overpriced imports or cheap caps that didn’t last more than a few wears. Even the few decent ones available online were inconsistent in quality. 
              That’s when I decided to create something better — something I’d be proud to wear, and proud to share.
            </p>
          </div>
        </div>
      </div>

      {/* Built from Scratch */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-[#B71C1C] mb-8">Built from Scratch, Worn with Purpose</h2>
          <p className="text-lg text-gray-600">
            What started as a personal passion project quickly turned into a movement. I began working with local fabric suppliers, testing materials, and refining designs until each cap checked every box: 
            Comfortable, durable, stylish, and locally made.
          </p>
        </div>
      </div>

      {/* Why People Choose Us */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-[#B71C1C] mb-10 text-center">Why People Choose Caps Club</h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-600">
            <ul className="space-y-4 text-lg">
              <li>• Crafted with premium stitching and breathable materials</li>
              <li>• Designed for versatility — from casual wear to statement pieces</li>
              <li>• Trusted by a growing community across Egypt</li>
            </ul>
            <ul className="space-y-4 text-lg">
              <li>• Available nationwide with fast delivery</li>
              <li>• Built to match international quality, while staying true to local roots</li>
              <li>• Perfect for everyday wear and special occasions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Closing Section */}
      <div className="bg-white py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-3xl italic text-[#4A4A4A] mb-6">
            "Wear the good days."
          </p>
          <p className="text-[#B71C1C] font-medium text-xl">— KAPATO</p>
        </div>
      </div>
    </div>
  );
};

export default About;