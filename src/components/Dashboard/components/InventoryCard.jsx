import { Boxes } from "lucide-react";

const InventoryCard = ({ inventory }) => {
  return (
    <div className="bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Inventory</h2>

        <Boxes className="text-gray-400" />
      </div>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Variants
          </span>

          <span className="font-bold">
            {inventory.totalVariants}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Colors
          </span>

          <span className="font-bold">
            {inventory.totalColors}
          </span>
        </div>

      </div>
    </div>
  );
};

export default InventoryCard;