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
  const [drawerMode, setDrawerMode] = useState("view");

  const [isAddOpen, setIsAddOpen] = useState(false);

  const [imagesMap, setImagesMap] = useState({});

  useEffect(() => {
  fetch("/images/images.json")
    .then((res) => res.json())
    .then((data) => setImagesMap(data))
    .catch(console.error);
}, []);

const getProductImage = (product) => {
  const variant = product.variants?.[0];

  if (!variant || !product.folder_path) {
    return null;
  }

  const key = `${product.folder_path}/${variant.folder_name}`;

  const files = imagesMap[key];

  if (!files || files.length === 0) {
    return null;
  }

  return `/images/${key}/${files[0]}`;
};

const fetchProducts = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch products");
    }

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
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
      return;
    }

    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      const data = await res.json();
      alert(data.message || "Failed to delete product");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting product");
  }
};

const openView = async (id) => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_URL}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch product");
    }

    setSelectedProduct(data);
    setDrawerMode("view");
    setIsDrawerOpen(true);
  } catch (err) {
    console.error(err);
  }
};

const openEdit = async (id) => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_URL}/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch product");
    }

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
    return (
      <div className="py-12 text-center text-gray-500">Loading products...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Products</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your products and variants
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition w-full sm:w-auto"
        
          onClick={() => setIsAddOpen(true)}
        >
          <Plus size={18} 
          />
          Add Product
        </button>
      </div>

      <div className="mb-6">
        <div className="relative w-full sm:max-w-md">
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

      {filteredProducts.length === 0 ? (
        <div className="bg-white border rounded-xl text-center py-12 text-gray-500">
          No products found
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-xl p-4"
              >
                <div className="flex gap-3">
<div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
  {getProductImage(product) ? (
    <img
      src={getProductImage(product)}
      alt={product.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
      No img
    </div>
  )}
</div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {product.slug}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="font-semibold text-sm">
                        LE {Number(product.price).toFixed(0)}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          product.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.is_active ? "Active" : "Draft"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {product.colors_count || product.variants?.length || 0}{" "}
                      variants
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t">
                  <button
                    onClick={() => openView(product.id)}
                    className="p-2.5 hover:bg-gray-100 rounded-lg transition"
                    aria-label="View"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => openEdit(product.id)}
                    className="p-2.5 hover:bg-gray-100 rounded-lg transition"
                    aria-label="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2.5 hover:bg-red-50 text-red-600 rounded-lg transition"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block bg-white border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 lg:px-6 py-3 font-medium text-gray-500">
                      Product
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 font-medium text-gray-500">
                      Variants
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 font-medium text-gray-500">
                      Price
                    </th>
                    <th className="text-left px-4 lg:px-6 py-3 font-medium text-gray-500">
                      Status
                    </th>
                    <th className="text-right px-4 lg:px-6 py-3 font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center gap-3">
<div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
  {getProductImage(product) ? (
    <img
      src={getProductImage(product)}
      alt={product.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
      No img
    </div>
  )}
</div>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{product.name}</p>
                            <p className="text-xs text-gray-500 truncate">
                              {product.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 lg:px-6 py-4 text-gray-600">
                        {product.colors_count || product.variants?.length || 0}{" "}
                        variants
                      </td>

                      <td className="px-4 lg:px-6 py-4 font-medium">
                        LE {Number(product.price).toFixed(0)}
                      </td>

                      <td className="px-4 lg:px-6 py-4">
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

                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

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
