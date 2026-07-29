import { useEffect, useState } from "react";
import { X } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const ColorDrawer = ({
  color,
  isOpen,
  onClose,
  mode,
  onUpdated,
}) => {
  const [name, setName] = useState("");
  const [hexCode, setHexCode] = useState("#000000");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (color) {
      setName(color.name);
      setHexCode(color.hex_code);
    } else {
      setName("");
      setHexCode("#000000");
    }
  }, [color]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter color name.");
      return;
    }

    setSaving(true);

    try {
      let res;

      if (mode === "edit") {
        res = await fetch(`${API_URL}/api/colors/${color.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            hex_code: hexCode,
          }),
        });
      } else {
        res = await fetch(`${API_URL}/api/colors`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            hex_code: hexCode,
          }),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Something went wrong");
        return;
      }

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-xl font-bold">
              {mode === "edit"
                ? "Edit Color"
                : "Add Color"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage color details
            </p>

          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-auto p-6 space-y-6"
        >

          {/* Color Picker */}

          <div>

            <label className="block mb-2 font-medium">
              Pick Color
            </label>

            <input
              type="color"
              value={hexCode}
              onChange={(e) =>
                setHexCode(e.target.value)
              }
              className="w-24 h-14 cursor-pointer"
            />

          </div>

          {/* Hex */}

          <div>

            <label className="block mb-2 font-medium">
              Hex Code
            </label>

            <input
              value={hexCode}
              onChange={(e) =>
                setHexCode(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          {/* Name */}

          <div>

            <label className="block mb-2 font-medium">
              Color Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Example: Royal Blue"
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          {/* Preview */}

          <div>

            <label className="block mb-2 font-medium">
              Preview
            </label>

            <div
              className="h-20 rounded-xl border"
              style={{
                background: hexCode,
              }}
            />

          </div>

        </form>

        {/* Footer */}

        <div className="border-t p-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            disabled={saving}
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-black text-white"
          >
            {saving
              ? "Saving..."
              : mode === "edit"
              ? "Update"
              : "Save"}
          </button>

        </div>

      </div>
    </>
  );
};

export default ColorDrawer;