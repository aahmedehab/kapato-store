import { Package } from "lucide-react";

const TopProducts = ({ products }) => {
  return (
    <div className="bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">
            Top Selling Products
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">Best sellers</p>
        </div>

        <Package className="text-gray-400" />
      </div>

      <div className="space-y-4">
        {products.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No products yet
          </p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3 last:border-0"
            >
              <div>
                <p className="font-medium">
                  {product.product_name}
                </p>

                <p className="text-xs text-gray-500">
                  #{index + 1}
                </p>
              </div>

              <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                {product.sold}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopProducts;