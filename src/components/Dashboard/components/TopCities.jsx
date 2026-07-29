import { MapPin } from "lucide-react";

const TopCities = ({ cities }) => {
  return (
    <div className="bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Top Cities</h2>
          <p className="text-xs sm:text-sm text-gray-500">Orders by city</p>
        </div>

        <MapPin className="text-gray-400" size={24} />
      </div>

      {cities.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No cities found
        </div>
      ) : (
        <div className="space-y-4">
          {cities.map((city, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b last:border-0 pb-3"
            >
              <div>
                <p className="font-medium">
                  {city.city}
                </p>

                <p className="text-xs text-gray-500">
                  Rank #{index + 1}
                </p>
              </div>

              <span className="bg-black text-white rounded-full px-3 py-1 text-sm">
                {city.orders} Orders
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCities;