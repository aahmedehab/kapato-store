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
      const res = await fetch(`${API_URL}/api/colors`);
      const data = await res.json();
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
    const res = await fetch(`${API_URL}/api/colors/${id}`, {
      method: "DELETE",
    });

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
      const res = await fetch(`${API_URL}/api/colors/${id}`);
      const data = await res.json();

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
    return <div className="p-8 text-center">Loading colors...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Colors</h1>
          <p className="text-gray-500 text-sm">
            Manage available colors
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl"
        >
          <Plus size={18} />
          Add Color
        </button>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            className="w-full border rounded-xl py-2.5 pl-10 pr-4"
            placeholder="Search colors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 border-b">

            <tr>
              <th className="px-6 py-3 text-left">Preview</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Hex Code</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredColors.length === 0 ? (

              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-500"
                >
                  No colors found
                </td>
              </tr>

            ) : (

              filteredColors.map((color) => (

                <tr
                  key={color.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">

                    <div
                      className="w-10 h-10 rounded-lg border"
                      style={{
                        backgroundColor: color.hex_code,
                      }}
                    />

                  </td>

                  <td className="px-6 py-4 font-medium">
                    {color.name}
                  </td>

                  <td className="px-6 py-4 font-mono">
                    {color.hex_code}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-2">

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

              ))

            )}

          </tbody>

        </table>

      </div>

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