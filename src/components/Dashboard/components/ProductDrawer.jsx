import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const ProductDrawer = ({ product, isOpen, onClose, mode = "view", onUpdated }) => {
const [formData, setFormData] = useState({
  name: "",
  slug: "",
  price: "",
  description: "",
  folder_path: "",
  is_active: true,
});

  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  // New variant form
const [newVariant, setNewVariant] = useState({
  color_id: "",
  sku: "",
  folder_name: "",
  stock: 0,
});

  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        price: product.price || "",
        description: product.description || "",
        folder_path: product.folder_path || "",
        is_active: product.is_active ?? true,
      });
      setVariants(product.variants || []);
    }
  }, [product, isOpen]);

  // Fetch colors when drawer opens in edit mode
  useEffect(() => {
    if (isOpen && mode === "edit") {
      fetch(`${API_URL}/api/colors`)
        .then((res) => res.json())
        .then((data) => setColors(data))
        .catch(console.error);
    }
  }, [isOpen, mode]);

  if (!isOpen || !product) return null;

  const isEdit = mode === "edit";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onUpdated?.();
        onClose();
      } else {
        alert("Failed to update product");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddVariant = async () => {
if (
  !newVariant.color_id ||
  !newVariant.sku ||
  !newVariant.folder_name
) {
  alert("Color, SKU and Folder Name are required");
  return;
}

    try {
      const res = await fetch(`${API_URL}/api/products/variants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          ...newVariant,
          stock: Number(newVariant.stock) || 0,
        }),
      });

      if (res.ok) {
        const created = await res.json();
        // نضيف اللون مع الـ variant عشان يظهر الاسم
        const color = colors.find((c) => c.id === Number(newVariant.color_id));
        setVariants((prev) => [...prev, { ...created, color }]);
        setNewVariant({
  color_id: "",
  sku: "",
  folder_name: "",
  stock: 0,
});
      } else {
        alert("Failed to add variant");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding variant");
    }
  };

  const handleDeleteVariant = async (variantId) => {
    if (!window.confirm("Delete this variant?")) return;

    try {
      const res = await fetch(`${API_URL}/api/products/variants/${variantId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setVariants((prev) => prev.filter((v) => v.id !== variantId));
      } else {
        alert("Failed to delete variant");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveVariant = async (variant) => {
  try {
    const res = await fetch(
      `${API_URL}/api/products/variants/${variant.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku: variant.sku,
          folder_name: variant.folder_name,
          stock: variant.stock,
          color_id: variant.color_id,
        }),
      }
    );

    if (!res.ok) {
      alert("Failed to update variant");
      return;
    }

    onUpdated?.();
    alert("Variant updated successfully");
  } catch (err) {
    console.error(err);
    alert("Error updating variant");
  }
};

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-full sm:max-w-lg bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              {isEdit ? "Edit Product" : "Product Details"}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          {/* Image Preview */}
          <div className="mb-6">
            <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden">
              {variants[0]?.images?.length > 0 ? (
                <img
src={`/images/${variants[0]?.images?.[0]?.image}`}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              {isEdit ? (
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-2.5 mt-1 text-sm"
                />
              ) : (
                <p className="font-medium text-lg mt-1">{product.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Slug</label>
              {isEdit ? (
                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-2.5 mt-1 text-sm"
                />
              ) : (
                <p className="text-sm mt-1 text-gray-700">{product.slug}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Price</label>
              {isEdit ? (
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-2.5 mt-1 text-sm"
                />
              ) : (
                <p className="font-medium mt-1">LE {product.price}</p>
              )}
            </div>

<div>
  <label className="text-sm text-gray-500">
    Folder Path
  </label>

  <input
    name="folder_path"
    value={formData.folder_path}
    onChange={handleChange}
    placeholder="caps/sunny"
    className="w-full border rounded-xl px-4 py-2.5 mt-1 text-sm"
  />
</div>

            <div>
              <label className="text-sm text-gray-500">Description</label>
              {isEdit ? (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-xl px-4 py-2.5 mt-1 text-sm"
                />
              ) : (
                <p className="text-sm mt-1 text-gray-700">{product.description || "-"}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Status</label>
              {isEdit ? (
                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                  />
                  <span className="text-sm">Active</span>
                </label>
              ) : (
                <p className="mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product.is_active ? "Active" : "Draft"}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Variants Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">
              Variants ({variants.length})
            </h3>

            <div className="space-y-3 mb-4">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="border rounded-xl p-4 space-y-4"
                >
<div>
  <p className="font-medium mb-3">
    {variant.color?.name}
  </p>
  <label className="block text-xs text-gray-500 mb-2">
    Images
  </label>

  <div className="flex gap-2 overflow-x-auto">
    {variant.images?.length ? (
      variant.images.map((img) => (
        <img
          key={img.id}
          src={`/images/${img.image}`}
          alt=""
          className="w-16 h-16 rounded-lg border object-cover"
        />
      ))
    ) : (
      <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">
        No Images
      </div>
    )}
  </div>
</div>


<div className="flex-1">


  {isEdit ? (
    <div className="space-y-3">

      <div>
        <label className="block text-xs text-gray-500 mb-1">
          SKU
        </label>

        <input
          value={variant.sku}
          onChange={(e) =>
            setVariants((prev) =>
              prev.map((v) =>
                v.id === variant.id
                  ? { ...v, sku: e.target.value }
                  : v
              )
            )
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Folder Name
        </label>

        <input
          value={variant.folder_name}
          onChange={(e) =>
            setVariants((prev) =>
              prev.map((v) =>
                v.id === variant.id
                  ? { ...v, folder_name: e.target.value }
                  : v
              )
            )
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-500 mb-1">
          Stock
        </label>

        <input
          type="number"
          value={variant.stock}
          onChange={(e) =>
            setVariants((prev) =>
              prev.map((v) =>
                v.id === variant.id
                  ? {
                      ...v,
                      stock: Number(e.target.value),
                    }
                  : v
              )
            )
          }
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

    </div>
  ) : (
    <>
      <p className="text-xs text-gray-500">
        SKU: {variant.sku}
      </p>

      <p className="text-xs text-gray-500">
        Folder: {variant.folder_name}
      </p>

      <p className="text-xs text-gray-500">
        Stock: {variant.stock}
      </p>
    </>
  )}

</div>

{isEdit && (
  <div className="flex items-end gap-2 mt-3">

    <button
      onClick={() => handleSaveVariant(variant)}
      className="flex-1 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
    >
      Save
    </button>

    <button
      onClick={() => handleDeleteVariant(variant.id)}
      className="w-10 h-10 flex items-center justify-center rounded-lg border border-red-300 text-red-500 hover:bg-red-50"
    >
      <Trash2 size={16} />
    </button>

  </div>
)}
                </div>
              ))}
            </div>

            {/* Add new variant (Edit mode only) */}
            {isEdit && (
              <div className="border rounded-xl p-4 bg-gray-50 space-y-3">
                <p className="text-sm font-medium">Add New Variant</p>

                <select
                  value={newVariant.color_id}
                  onChange={(e) =>
                    setNewVariant({ ...newVariant, color_id: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select Color</option>
                  {colors.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.name}
                    </option>
                  ))}
                </select>

                <input
                  placeholder="SKU (e.g. CACTUS-ORANGE)"
                  value={newVariant.sku}
                  onChange={(e) =>
                    setNewVariant({ ...newVariant, sku: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />

<input
  placeholder="Folder Name (e.g. blue)"
  value={newVariant.folder_name}
  onChange={(e) =>
    setNewVariant({
      ...newVariant,
      folder_name: e.target.value,
    })
  }
  className="w-full border rounded-lg px-3 py-2 text-sm"
/>

                <input
                  type="number"
                  placeholder="Stock"
                  value={newVariant.stock}
                  onChange={(e) =>
                    setNewVariant({ ...newVariant, stock: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />

                <button
                  onClick={handleAddVariant}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  <Plus size={16} />
                  Add Variant
                </button>
              </div>
            )}
          </div>

          {/* Save Button */}
          {isEdit && (
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 border py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                disabled={loading}
                className="flex-1 bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 disabled:bg-gray-400"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDrawer;