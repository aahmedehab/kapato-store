const caps = [
  { color: 'red', name: 'Classic Red', img: '/src/assets/caps/red.png' },
  { color: 'beige', name: 'Natural', img: '/src/assets/caps/beige.png' },
  { color: 'blue', name: 'Ocean Blue', img: '/src/assets/caps/blue.png' },
  { color: 'green', name: 'Forest Green', img: '/src/assets/caps/green.png' },
];

const FeaturedCollection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-[#B71C1C] text-3xl font-semibold mb-10">Featured Collection</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {caps.map((cap) => (
          <div key={cap.color} className="group">
            <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden">
              <img 
                src={cap.img} 
                alt={cap.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p className="text-center mt-4 font-medium">{cap.name}</p>
            {/* <p className="text-center text-[#B71C1C] font-bold">KAPATO</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollection;