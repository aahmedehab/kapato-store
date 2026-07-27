import { useEffect, useState } from "react";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";

import ProductDrawer from "../components/ProductDrawer";

const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const [drawerMode, setDrawerMode] = useState("view"); // "view" or "edit"

const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/products`);
    const data = await res.json();
    setProducts(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete product");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting product");
  }
};

const openView = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`);
    const data = await res.json();
    setSelectedProduct(data);
    setDrawerMode("view");
    setIsDrawerOpen(true);
  } catch (err) {
    console.error(err);
  }
};

const openEdit = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`);
    const data = await res.json();
    setSelectedProduct(data);
    setDrawerMode("edit");
    setIsDrawerOpen(true);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-8 text-center">Loading products...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your products and variants
          </p>
        </div>

        <button className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Product</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Variants</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Price</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
              <th className="text-right px-6 py-3 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.img ? (
                          <img
src={`/images/${product.img}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No img
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {product.colors_count || product.variants?.length || 0} variants
                  </td>

                  <td className="px-6 py-4 font-medium">
                    LE {Number(product.price).toFixed(0)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.is_active ? "Active" : "Draft"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
<button
  onClick={() => openView(product.id)}
  className="p-2 hover:bg-gray-100 rounded-lg transition"
>
  <Eye size={16} />
</button>

<button
  onClick={() => openEdit(product.id)}
  className="p-2 hover:bg-gray-100 rounded-lg transition"
>
  <Edit size={16} />
</button>
<button
  onClick={() => handleDelete(product.id)}
  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
>
  <Trash2 size={16} />
</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
<ProductDrawer
  product={selectedProduct}
  isOpen={isDrawerOpen}
  onClose={() => setIsDrawerOpen(false)}
  mode={drawerMode}
  onUpdated={fetchProducts}
/>
    </div>
  );
};

export default Products;