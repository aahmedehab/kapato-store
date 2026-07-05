const SummerMoments = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 pb-16 ">
      <h2 className="text-[#B71C1C] text-3xl font-semibold mb-10">Summer Moments</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add your images here - you can make it 2 columns or masonry */}
        <div className="space-y-6">
          <img src="/src/assets/summer1.jpg" className="w-full rounded-2xl" alt="" />
          <img src="/src/assets/summer2.jpg" className="w-full rounded-2xl" alt="" />
        </div>
        <div className="space-y-6">
          <img src="/src/assets/summer3.jpg" className="w-full rounded-2xl" alt="" />
          <img src="/src/assets/summer4.jpg" className="w-full rounded-2xl" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SummerMoments;