import { useEffect, useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

import ColorDrawer from "../components/ColorDrawer";

const API_URL = import.meta.env.VITE_API_URL;

const Colors = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedColor, setSelectedColor] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState("add");

const fetchColors = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_URL}/api/colors`, {
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
      throw new Error(data.message || "Failed to fetch colors");
    }

    setColors(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this color?")) return;

  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_URL}/api/colors/${id}`, {
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

    const data = await res.json();

    if (!res.ok) {
      if (data.products) {
        const names = data.products
          .map((p) => `• ${p.name}`)
          .join("\n");

        alert(
          `${data.error}\n\nUsed by:\n${names}\n\nYou can edit the color instead.`
        );
      } else {
        alert(data.error || "Failed to delete color.");
      }

      return;
    }

    setColors((prev) => prev.filter((c) => c.id !== id));

    alert("Color deleted successfully.");
  } catch (err) {
    console.error(err);
    alert("Error deleting color.");
  }
};

  const openAdd = () => {
    setSelectedColor(null);
    setDrawerMode("add");
    setIsDrawerOpen(true);
  };

const openEdit = async (id) => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_URL}/api/colors/${id}`, {
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
      throw new Error(data.message || "Failed to fetch color");
    }

    setSelectedColor(data);
    setDrawerMode("edit");
    setIsDrawerOpen(true);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    fetchColors();
  }, []);

  const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">Loading colors...</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Colors</h1>
          <p className="text-gray-500 text-sm">Manage available colors</p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl w-full sm:w-auto"
        >
          <Plus size={18} />
          Add Color
        </button>
      </div>

      <div className="mb-6 w-full sm:max-w-md">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            className="w-full border rounded-xl py-2.5 pl-10 pr-4 text-sm"
            placeholder="Search colors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredColors.length === 0 ? (
        <div className="bg-white border rounded-xl text-center py-12 text-gray-500">
          No colors found
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {filteredColors.map((color) => (
              <div
                key={color.id}
                className="bg-white border rounded-xl p-4 flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-lg border shrink-0"
                  style={{ backgroundColor: color.hex_code }}
                />

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{color.name}</p>
                  <p className="text-sm font-mono text-gray-500">
                    {color.hex_code}
                  </p>
                </div>

                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(color.id)}
                    className="p-2.5 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(color.id)}
                    className="p-2.5 hover:bg-red-50 text-red-600 rounded-lg"
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
              <table className="w-full text-sm min-w-[480px]">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left">Preview</th>
                    <th className="px-4 lg:px-6 py-3 text-left">Name</th>
                    <th className="px-4 lg:px-6 py-3 text-left">Hex Code</th>
                    <th className="px-4 lg:px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredColors.map((color) => (
                    <tr
                      key={color.id}
                      className="border-b hover:bg-gray-50 last:border-0"
                    >
                      <td className="px-4 lg:px-6 py-4">
                        <div
                          className="w-10 h-10 rounded-lg border"
                          style={{ backgroundColor: color.hex_code }}
                        />
                      </td>

                      <td className="px-4 lg:px-6 py-4 font-medium">
                        {color.name}
                      </td>

                      <td className="px-4 lg:px-6 py-4 font-mono">
                        {color.hex_code}
                      </td>

                      <td className="px-4 lg:px-6 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => openEdit(color.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(color.id)}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
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

      <ColorDrawer
        color={selectedColor}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        mode={drawerMode}
        onUpdated={fetchColors}
      />
    </div>
  );
};

export default Colors;
