const InstagramFeed = () => {
  return (
    <div className="px-6 pb-16">
      <h2 className="text-[#B71C1C] text-3xl font-semibold mb-10">
        Instagram Feed Preview
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square overflow-hidden rounded-xl"
          >
            <img
              src={`/images/ig${i + 1}.jpg`}
              alt=""
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;


