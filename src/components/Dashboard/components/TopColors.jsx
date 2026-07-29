import { Palette } from "lucide-react";

const TopColors = ({ colors }) => {
  return (
    <div className="bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Top Colors</h2>
          <p className="text-xs sm:text-sm text-gray-500">Most ordered colors</p>
        </div>

        <Palette className="text-gray-400" />
      </div>

      <div className="space-y-4">
        {colors.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No colors yet
          </p>
        ) : (
          colors.map((color, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full border"
                  style={{
                    background: color.color,
                  }}
                />

                <div>
                  <p className="font-medium">
                    {color.color}
                  </p>

                  <p className="text-xs text-gray-500">
                    #{index + 1}
                  </p>
                </div>
              </div>

              <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                {color.sold}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopColors;